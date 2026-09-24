import assert from 'node:assert/strict';
import test from 'node:test';
import {CronInputError, nextOccurrences, parseCron} from './cron.mjs';

const next = (expression, reference, count = 1) => nextOccurrences(expression, new Date(reference), count).map(date => date.toISOString());

test('all documented examples produce the next five runs', () => {
  const reference = '2026-09-24T12:34:56Z';
  const cases = [
    ['*/15 * * * * *', '2026-09-24T12:35:00.000Z', 15],
    ['0 * * * * *', '2026-09-24T12:35:00.000Z', 60],
    ['0 */15 * * * *', '2026-09-24T12:45:00.000Z', 900],
    ['0 0 * * * *', '2026-09-24T13:00:00.000Z', 3600],
    ['0 0 13 * * 5', '2026-09-25T13:00:00.000Z', 7 * 86400],
  ];
  for (const [expression, first, interval] of cases) {
    assert.deepEqual(next(expression, reference, 5), Array.from({length: 5}, (_, index) => new Date(Date.parse(first) + index * interval * 1000).toISOString()));
  }
  assert.deepEqual(next('0 0 9 * * 1-5', reference, 5), [25, 28, 29, 30].map(day => `2026-09-${day}T09:00:00.000Z`).concat('2026-10-01T09:00:00.000Z'));
  assert.deepEqual(next('0 0 0 1 * *', reference, 5), ['2026-10', '2026-11', '2026-12', '2027-01', '2027-02'].map(month => `${month}-01T00:00:00.000Z`));
});

test('five fields default seconds to zero and match equivalent six-field schedules', () => {
  for (const expression of ['* * * * *', '*/15 * * * *', '0 9 * * 1-5', '0 0 13 * 5', '0 0 29 2 *']) {
    assert.deepEqual(parseCron(expression), parseCron(`0 ${expression}`));
    assert.deepEqual(next(expression, '2026-09-24T12:34:56Z', 5), next(`0 ${expression}`, '2026-09-24T12:34:56Z', 5));
  }
  assert.deepEqual(next('* * * * *', '2026-09-24T12:00:00Z'), ['2026-09-24T12:01:00.000Z']);
  assert.deepEqual(next('*/15 * * * *', '2026-09-24T12:00:00.999Z'), ['2026-09-24T12:15:00.000Z']);
  assert.deepEqual(parseCron('  */15\t* * * *  '), parseCron('0 */15 * * * *'));
  assert.throws(() => parseCron('60 * * * *'), error => error.kind === 'invalid' && error.message.startsWith('Minute:'));
  assert.throws(() => parseCron('0 24 * * *'), error => error.kind === 'invalid' && error.message.startsWith('Hour:'));
});

test('Sunday aliases and AND semantics for the two day fields', () => {
  assert.deepEqual(next('0 0 0 * * 0', '2026-09-24T00:00:00Z', 5), next('0 0 0 * * 7', '2026-09-24T00:00:00Z', 5));
  assert.deepEqual(next('0 0 0 13 * 5', '2026-09-24T00:00:00Z', 2), ['2026-11-13T00:00:00.000Z', '2027-08-13T00:00:00.000Z']);
});

test('lists, steps, and wrapping ranges use Cronos field rules', () => {
  assert.deepEqual(parseCron('1,5-9/2 10/20 23-1 * 12-2 5-1/2'), [
    [1, 5, 7, 9], [10, 30, 50], [0, 1, 23], Array.from({length: 31}, (_, i) => i + 1), [1, 2, 12], [0, 5],
  ]);
  assert.deepEqual(parseCron('50-10/7 * * * * *')[0], [4, 50, 57]);
  assert.deepEqual(parseCron('0 0 0 * * 6-1')[5], [0, 1, 6]);
  assert.deepEqual(parseCron('0 0 0 * * 0-7/2')[5], [0, 2, 4, 6]);
  assert.deepEqual(parseCron('0 0 0 * * 7-1')[5], [0, 1]);
  assert.deepEqual(parseCron('0 0 0 * * 7-1/2')[5], []);
  assert.deepEqual(next('0 0 23-1 * * *', '2026-12-31T23:00:00Z', 3), ['2027-01-01T00:00:00.000Z', '2027-01-01T01:00:00.000Z', '2027-01-01T23:00:00.000Z']);
});

test('leap dates, century exceptions, and impossible calendars', () => {
  assert.deepEqual(next('0 0 0 29 2 *', '2096-02-29T00:00:00Z'), ['2104-02-29T00:00:00.000Z']);
  assert.deepEqual(next('0 0 0 29 2 *', '2396-02-29T00:00:00Z'), ['2400-02-29T00:00:00.000Z']);
  assert.deepEqual(next('0 0 0 31 2 *', '2026-01-01T00:00:00Z'), []);
  assert.deepEqual(next('0 0 0 31 4 *', '2026-01-01T00:00:00Z'), []);
});

test('results are strictly future, reference is not mutated, and whitespace is accepted', () => {
  const reference = new Date('2026-09-24T12:00:00.999Z');
  assert.deepEqual(nextOccurrences('* * * * * *', reference, 2).map(date => date.toISOString()), ['2026-09-24T12:00:01.000Z', '2026-09-24T12:00:02.000Z']);
  assert.equal(reference.toISOString(), '2026-09-24T12:00:00.999Z');
  assert.deepEqual(next('0 0 0 * * *', '2026-09-24T00:00:00Z'), ['2026-09-25T00:00:00.000Z']);
  assert.deepEqual(parseCron('  0\t*/15  * * * *  '), parseCron('0 */15 * * * *'));
});

test('invalid field counts, values, ranges, lists, and steps give input errors', () => {
  for (const expression of ['', '* * * *', '* * * * * * *', '60 * * * * *', '0 60 * * * *', '0 0 24 * * *', '0 0 0 0 * *', '0 0 0 * 13 *', '0 0 0 * * 8', '1- * * * * *', '-1 * * * * *', '1--5 * * * * *', '1,,2 * * * * *', '*,1 * * * * *', '1,* * * * * *', '*-5 * * * * *', '*/0 * * * * *', '*/60 * * * * *', '0 0 */24 * * *', '1/2/3 * * * * *', '000 * * * * *', '0.5 * * * * *']) {
    assert.throws(() => parseCron(expression), error => error instanceof CronInputError && error.kind === 'invalid', expression);
  }
});

test('advanced Cronos syntax is marked unsupported rather than invalid', () => {
  for (const expression of ['@daily', '0 0 0 L * *', '0 0 0 15W * *', '0 0 0 * JAN *', '0 0 0 * * MON', '0 0 0 * * 1#2', '0 0 0 ? * *', 'H * * * * *']) {
    assert.throws(() => parseCron(expression), error => error instanceof CronInputError && error.kind === 'unsupported', expression);
  }
});

test('calendar advancement agrees with an independent second-by-second matcher', () => {
  const reference = new Date('2026-12-31T23:59:49Z');
  for (const expression of ['*/7 * * * * *', '50-10/7 59-1 23-1 * * *', '0 0 0 1 1 5', '0,15,45 */3 * * * *']) {
    const fields = parseCron(expression);
    const expected = [];
    for (let time = reference.getTime() + 1000; expected.length < 5 && time < reference.getTime() + 3600000; time += 1000) {
      const date = new Date(time);
      const values = [date.getUTCSeconds(), date.getUTCMinutes(), date.getUTCHours(), date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCDay()];
      if (values.every((value, index) => fields[index].includes(value))) expected.push(date.toISOString());
    }
    const actual = nextOccurrences(expression, reference).filter(date => date.getTime() < reference.getTime() + 3600000).map(date => date.toISOString());
    assert.deepEqual(actual, expected, expression);
  }
});
