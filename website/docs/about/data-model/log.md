---
title: Log Event
description: A deep dive into Vector's log event
---

import SVG from 'react-inlinesvg';

<SVG src="/img/data-model-log.svg" />

## Description

A `log` event is a structured represention of a point-in-time event. It contains
an arbitrary set of fields (key/value pairs) that describe the event.

## Schema

```javascript
{
  "*": "my-value",
  "host": "my.host.com",
  "message": "<13>Feb 13 20:07:26 74794bfb6795 root[8539]: i am foobar",
  "timestamp": "2019-11-01T21:15:47+00:00"
}
```

import Fields from '@site/src/components/Fields';

import Field from '@site/src/components/Field';

<Fields filters={true}>


<Field
  enumValues={null}
  examples={["my-value"]}
  name={"*"}
  path={null}
  required={false}
  type={"*"}
  >

### *

In addition to the defined fields, you are welcome to add your own fields.


</Field>


<Field
  enumValues={null}
  examples={["my.host.com"]}
  name={"host"}
  path={null}
  required={false}
  type={"string"}
  >

### host

Represents the originating host of the log. This is commonly used in [sources][docs.sources] but can be overridden via the `host_field` option for relevant sources.


</Field>


<Field
  enumValues={null}
  examples={["<13>Feb 13 20:07:26 74794bfb6795 root[8539]: i am foobar"]}
  name={"message"}
  path={null}
  required={true}
  type={"string"}
  >

### message

Represents the log message. This is the key used when ingesting raw string data.


</Field>


<Field
  enumValues={null}
  examples={["2019-11-01T21:15:47+00:00"]}
  name={"timestamp"}
  path={null}
  required={true}
  type={"timestamp"}
  >

### timestamp

A normalized [Rust DateTime struct][urls.rust_date_time] in UTC. See [Timestamp Coercion](#timestamp-coercion) for more info.


</Field>


</Fields>

## Components

import Jump from '@site/src/components/Jump';

<Jump to="/components?log=true">View all log compatible components</Jump>

## How It Works

### Time Zones

If Vector receives a timestamp that does not contain timezone information
Vector assumes the timestamp is in local time, and will convert the timestamp
to UTC from the local time. It is important that the host system contain
time zone data files to properly determine the local time zone. This is
typically installed through the `tzdata` package. See [issue 551][urls.issue_551]
for more info.

### Timestamp Coercion

There are cases where Vector interacts with formats that do not have a formal
timestamp defintion, such as JSON. In these cases, Vector will ingest the
timestamp in it's primitive form (string or integer). You can then coerce the
field into a[`timestamp`](#timestamp) using the
[`coercer` transform][docs.transforms.coercer]. If you are parsing this data
out of a string, all Vector parser transforms include a `types` option,
allowing you to extract and coerce in one step.

### Types

#### Strings

Strings are UTF8 compatible and are only bounded by the available system
memory.

#### Ints

Integers are signed integers up to 64 bits.

#### Floats

Floats are signed floats up to 64 bits.

#### Booleans

Booleans represent binary true/false values.

#### Timestamps

Timestamps are represented as [`DateTime` Rust structs][urls.rust_date_time]
stored as UTC.


[docs.sources]: /docs/reference/sources
[docs.transforms.coercer]: /docs/reference/transforms/coercer
[urls.issue_551]: https://github.com/timberio/vector/issues/551
[urls.rust_date_time]: https://docs.rs/chrono/0.4.0/chrono/struct.DateTime.html
