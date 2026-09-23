---
sidebar_position: 9
---

# Triggering Interval

The triggering interval defines when an integration retrieves data or processes a batch. Connxio supports six-field cron expressions, allowing schedules to include seconds.

Use the **Triggering Interval** setting on inbound adapters that support scheduled data retrieval, or when configuring a batch schedule.

## Cron expressions

A six-field cron expression consists of the following fields separated by spaces, starting with seconds:

```text
second minute hour day-of-month month day-of-week
```

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

## Schedule examples

| Cron expression | Schedule |
| --- | --- |
| `*/15 * * * * *` | Every 15 seconds |
| `0 * * * * *` | Every minute |
| `0 */15 * * * *` | Every 15 minutes |
| `0 0 * * * *` | Every hour, on the hour |
| `0 0 9 * * 1-5` | At 9 AM, Monday through Friday |
| `0 0 13 * * 5` | At 1 PM every Friday |
| `0 0 0 1 * *` | At midnight on the 1st of each month |

When you enter a cron expression, Connxio indicates whether it is invalid or shows when the scheduled data retrieval will occur.
