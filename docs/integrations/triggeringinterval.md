---
sidebar_position: 8
---

# Triggering Interval

The triggering interval is a crucial setting that determines the frequency and method by which your integration retrieves data.

Triggering interval is used in inbound adapters, with the exclusion of Servicebus. It's also to be used in _Batching_, where you can choose between Cron and Batching Trigger.

There are two options for setting the Triggering Interval:

- Polling Interval/Batching Trigger
- Cron Expressions.

Each method offers distinct advantages and flexibility, allowing you to tailor data retrieval to your specific requirements.

## Polling Interval

The Polling Interval feature provides users with a straightforward method for configuring data retrieval frequency. By inputting a numerical value of 5 or greater, users can determine the time interval, measured in seconds.

- Pros

    - Enables rapid data retrieval intervals, surpassing the minimum limit of 60 seconds in Cron.
    - Offers simplicity in configuration, requiring only a numerical input

- Cons

    - Limited to basic retrieval operations, lacking the capability for complex scheduling.
    - May not be suitable for scenarios requiring precise timing or intricate scheduling patterns.

## Cron

The Cron feature offers advanced scheduling capabilities for precise and flexible data retrieval. Using Cron expressions, users can define intricate time-based schedules to orchestrate data pickup operations according to their specific requirements.

- Pros

    - Facilitates precise timing and intricate scheduling patterns, allowing for highly customized retrieval operations.
    - Offers flexibility to define complex schedules tailored to unique integration workflows.

- Cons

    - Requires familiarity with Cron syntax, which may present a learning curve for some users.
    - Complexity in configuration compared to the straightforward numerical input of Polling Interval.
    - Minimum interval of data pickup is one minute.

While the Cron feature may initially seem more complex than the Polling Interval, its advanced scheduling capabilities make it invaluable for scenarios demanding precise timing and sophisticated scheduling patterns.

### Cron Expressions

Cron expressions are powerful scheduling strings used to define specific time intervals for automated tasks. Comprised of five fields representing different time components, Cron expressions offer a versatile and precise method for scheduling tasks.

The five fields in a Cron expression represent the following:

1. Minute (0 - 59): Specifies the minute of the hour when the task should run.
2. Hour (0 - 23): Indicates the hour of the day when the task should execute.
3. Day of the Month (1 - 31): Determines the day of the month when the task is scheduled.
4. Month (1 - 12): Specifies the month of the year when the task should be performed.
5. Day of the Week (0 - 6): Represents the day of the week (Sunday to Saturday) when the task is scheduled to run, with 0 and 7 both representing Sunday.

Using these fields, users can create intricate schedules by specifying values or ranges for each component. Additionally, Cron expressions support special characters to further enhance scheduling flexibility:

- Asterisk (_): Represents all possible values for the respective field. For example, using _ in the Hour field would mean the task runs every hour.
- Comma (,): Enables the specification of multiple individual values within a field. For instance, using 1,15 in the Day of the Month field would schedule the task to run on the 1st and 15th of the month.
- Hyphen (-): Indicates a range of values. For example, 1-5 in the Day of the Week field would schedule the task to run from Monday to Friday.
- Forward slash (/): Allows for the definition of step values. For instance, \*/15 in the Minute field would schedule the task to run every 15 minutes.

By combining these elements, users can craft complex and precise schedules tailored to their specific needs, making Cron expressions a versatile tool for automating tasks according to precise time criteria.

In Connxio the user will get information based on the input of the Cron Expression, whether it's invalid or when the data pickup will happen.

Below is a sample cron expression set to activate at 1 PM, exclusively on Fridays within Connxio:

![Cron Example](
/img/docs/cron-example-light.webp#light-only
)![Cron Example](
/img/docs/cron-example-dark.webp#dark-only
)
