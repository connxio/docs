---
sidebar_position: 3
---

import CronTester from '@site/src/components/CronTester';

# Triggering Interval

The triggering interval defines when an integration retrieves data or processes a batch. Connxio supports five-field and six-field cron expressions, with an optional leading seconds field.

Use the **Triggering Interval** setting on inbound adapters that support scheduled data retrieval, or when configuring a batch schedule.

## Cron expressions

A five-field cron expression consists of the following fields separated by spaces:

```text
minute hour day-of-month month day-of-week
```

To include seconds, use six fields:

```text
second minute hour day-of-month month day-of-week
```

When seconds are omitted, they default to `0`. For example, `*/15 * * * *` and `0 */15 * * * *` both run every 15 minutes.

| Field            | Values | Description                                                   |
| ---------------- | ------ | ------------------------------------------------------------- |
| Second           | `0–59` | Second of the minute                                          |
| Minute           | `0–59` | Minute of the hour                                            |
| Hour             | `0–23` | Hour of the day                                               |
| Day of the month | `1–31` | Day of the month                                              |
| Month            | `1–12` | Month of the year                                             |
| Day of the week  | `0–7`  | Sunday to Saturday, with both `0` and `7` representing Sunday |

Use these characters to define the schedule:

| Character | Meaning                  | Example                                                                |
| --------- | ------------------------ | ---------------------------------------------------------------------- |
| `*`       | Every value in the field | `*` in the hour field means every hour.                                |
| `,`       | A list of values         | `1,15` in the day-of-month field means the 1st and 15th of each month. |
| `-`       | A range of values        | `1-5` in the day-of-week field means Monday through Friday.            |
| `/`       | Step values              | `*/15` in the minute field means every 15 minutes.                     |

## Test a cron expression

Preview the next five scheduled runs in UTC. When both day-of-month and day-of-week are restricted, a date must match both fields.

<CronTester />

## Schedule examples

| Cron expression  | Schedule                             |
| ---------------- | ------------------------------------ |
| `*/15 * * * * *` | Every 15 seconds                     |
| `* * * * *`      | Every minute (five fields)           |
| `*/15 * * * *`   | Every 15 minutes (five fields)       |
| `0 * * * * *`    | Every minute                         |
| `0 */15 * * * *` | Every 15 minutes                     |
| `0 0 * * * *`    | Every hour, on the hour              |
| `0 0 9 * * 1-5`  | At 9 AM, Monday through Friday       |
| `0 0 13 * * 5`   | At 1 PM every Friday                 |
| `0 0 0 1 * *`    | At midnight on the 1st of each month |

When you enter a cron expression, Connxio indicates whether it is invalid or shows when the scheduled data retrieval will occur.
