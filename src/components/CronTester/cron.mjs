const fields = [
  ['Second', 0, 59], ['Minute', 0, 59], ['Hour', 0, 23],
  ['Day of month', 1, 31], ['Month', 1, 12], ['Day of week', 0, 7],
];

export class CronInputError extends Error {
  constructor(kind, message) {
    super(message);
    this.kind = kind;
  }
}

function parseField(source, [name, min, max]) {
  const invalid = (message) => { throw new CronInputError('invalid', `${name}: ${message}`); };
  const values = new Set();
  const parts = source.split(',');
  for (const part of parts) {
    const match = /^(\*|\d{1,2})(?:-(\d{1,2}))?(?:\/(\d{1,2}))?$/.exec(part);
    if (!match || (match[1] === '*' && (match[2] || parts.length > 1))) {
      invalid('use a number, *, a range, or a step; separate numeric values and ranges with commas.');
    }
    const [, base, end, increment] = match;
    const start = base === '*' ? min : Number(base);
    const stop = end !== undefined ? Number(end) : base === '*' || increment !== undefined ? max : start;
    const step = increment === undefined ? 1 : Number(increment);
    if (start < min || start > max || stop < min || stop > max) invalid(`values must be between ${min} and ${max}.`);
    if (step < 1 || step > max) invalid(`the step must be between 1 and ${max}.`);
    const addRange = (low, high) => {
      for (let value = low; value <= high; value += step) values.add(max === 7 && value === 7 ? 0 : value);
    };
    if (start <= stop) {
      addRange(start, stop);
    } else {
      // Cronos skips the duplicate Sunday when stepping through a wrapping range.
      const last = max === 7 ? 6 : max;
      addRange(start, last);
      addRange(min + step - (last - start) % step - 1, stop);
    }
  }
  return [...values].sort((a, b) => a - b);
}

/** Parse the documented numeric subset of Cronos, with optional leading seconds. */
export function parseCron(expression) {
  if (/[a-zA-Z?@#]/.test(expression)) {
    throw new CronInputError('unsupported', 'Named values, macros, and advanced operators are not supported by this tester. Use five or six numeric fields with *, commas, ranges, and steps.');
  }
  const parts = expression.trim().split(/[ \t]+/);
  if (parts.length !== 5 && parts.length !== 6) {
    throw new CronInputError('invalid', 'Enter five fields: minute, hour, day of month, month, day of week. Optionally add seconds as the first field.');
  }
  if (parts.length === 5) parts.unshift('0');
  return parts.map((part, index) => parseField(part, fields[index]));
}

/** Return up to count occurrences strictly after reference, within 400 years. */
export function nextOccurrences(expression, reference, count = 5) {
  const [seconds, minutes, hours, days, months, weekdays] = parseCron(expression);
  if (!Number.isFinite(reference.getTime()) || !Number.isInteger(count) || count < 1 || count > 100) {
    throw new RangeError('Provide a valid reference date and a count between 1 and 100.');
  }
  const date = new Date(Math.floor(reference.getTime() / 1000) * 1000 + 1000);
  const limit = new Date(date);
  limit.setUTCFullYear(limit.getUTCFullYear() + 400);
  const results = [];
  while (date < limit && results.length < count) {
    if (!months.includes(date.getUTCMonth() + 1)) {
      date.setUTCMonth(date.getUTCMonth() + 1, 1);
      date.setUTCHours(0, 0, 0, 0);
      continue;
    }
    // Both day fields must match, as in Cronos (not Unix cron's OR rule).
    if (!days.includes(date.getUTCDate()) || !weekdays.includes(date.getUTCDay())) {
      date.setUTCDate(date.getUTCDate() + 1);
      date.setUTCHours(0, 0, 0, 0);
      continue;
    }
    const hour = hours.find(value => value >= date.getUTCHours());
    if (hour === undefined) {
      date.setUTCDate(date.getUTCDate() + 1);
      date.setUTCHours(0, 0, 0, 0);
      continue;
    }
    if (hour !== date.getUTCHours()) date.setUTCHours(hour, 0, 0, 0);
    const minute = minutes.find(value => value >= date.getUTCMinutes());
    if (minute === undefined) {
      date.setUTCHours(date.getUTCHours() + 1, 0, 0, 0);
      continue;
    }
    if (minute !== date.getUTCMinutes()) date.setUTCMinutes(minute, 0, 0);
    const second = seconds.find(value => value >= date.getUTCSeconds());
    if (second === undefined) {
      date.setUTCMinutes(date.getUTCMinutes() + 1, 0, 0);
      continue;
    }
    date.setUTCSeconds(second);
    results.push(new Date(date));
    date.setUTCSeconds(date.getUTCSeconds() + 1);
  }
  return results;
}
