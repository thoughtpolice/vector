---
title: Metric Event
description: A deep dive into Vector's metric event
---

import SVG from 'react-inlinesvg';

<SVG src="/img/data-model-metric.svg" />

## Description

A `metric` event represents a numeric value. The types are heavily inspired by
the Statsd and Prometheus models.

## Schema

import Tabs from '@theme/Tabs';

<Tabs
  block={true}
  defaultValue="counter"
  values={[{"label":"counter","value":"counter"},{"label":"gauge","value":"gauge"},{"label":"histogram","value":"histogram"},{"label":"set","value":"set"}]}>

import TabItem from '@theme/TabItem';

<TabItem value="counter">

```javascript
{
  "name": "login.count",
  "tags": {
    "host": "my.host.com"
  },
  "timestamp": "2019-11-01T21:15:47+00:00",
  "val": 10.2
}
```

</TabItem>
<TabItem value="gauge">

```javascript
{
  "direction": "plus",
  "name": "memory_rss",
  "tags": {
    "host": "my.host.com"
  },
  "timestamp": "2019-11-01T21:15:47+00:00",
  "val": 554222.0
}
```

</TabItem>
<TabItem value="histogram">

```javascript
{
  "name": "duration_ms",
  "sample_rate": 1,
  "tags": {
    "host": "my.host.com"
  },
  "timestamp": "2019-11-01T21:15:47+00:00",
  "val": 2.6
}
```

</TabItem>
<TabItem value="set">

```javascript
{
  "name": "unique_users",
  "tags": {
    "host": "my.host.com"
  },
  "timestamp": "2019-11-01T21:15:47+00:00",
  "val": 12
}
```

</TabItem>

</Tabs>

import Fields from '@site/src/components/Fields';

import Field from '@site/src/components/Field';

<Fields filters={true}>


<Field
  enumValues={null}
  examples={null}
  name={"counter"}
  path={null}
  required={false}
  type={"struct"}
  >

### counter

A single value that can _only_ be incremented, it cannot be incremented.

<Fields filters={false}>


<Field
  enumValues={null}
  examples={["login.count"]}
  name={"name"}
  path={"counter"}
  required={true}
  type={"string"}
  >

#### name

The metric name.


</Field>


<Field
  enumValues={null}
  examples={[{"host":"my.host.com"}]}
  name={"tags"}
  path={"counter"}
  required={true}
  type={"map"}
  >

#### tags

The metric name.


</Field>


<Field
  enumValues={null}
  examples={["2019-11-01T21:15:47+00:00"]}
  name={"timestamp"}
  path={"counter"}
  required={true}
  type={"timestamp"}
  >

#### timestamp

Time metric was created/ingested.


</Field>


<Field
  enumValues={null}
  examples={[10.2]}
  name={"val"}
  path={"counter"}
  required={true}
  type={"double"}
  >

#### val

Amount to increment.


</Field>


</Fields>

</Field>


<Field
  enumValues={null}
  examples={null}
  name={"gauge"}
  path={null}
  required={false}
  type={"struct"}
  >

### gauge

A gauge represents a point-in-time value that can increase and decrease. Vector's internal gauge type represents changes to that value. Gauges should be used to track fluctuations in values, like current memory or CPU usage.

<Fields filters={false}>


<Field
  enumValues={["plus","minus"]}
  examples={["plus","minus"]}
  name={"direction"}
  path={"gauge"}
  required={true}
  type={"string"}
  >

#### direction

The direction to increase or decrease the gauge value.


</Field>


<Field
  enumValues={null}
  examples={["memory_rss"]}
  name={"name"}
  path={"gauge"}
  required={true}
  type={"string"}
  >

#### name

The metric name.


</Field>


<Field
  enumValues={null}
  examples={[{"host":"my.host.com"}]}
  name={"tags"}
  path={"gauge"}
  required={true}
  type={"map"}
  >

#### tags

The metric name.


</Field>


<Field
  enumValues={null}
  examples={["2019-11-01T21:15:47+00:00"]}
  name={"timestamp"}
  path={"gauge"}
  required={true}
  type={"timestamp"}
  >

#### timestamp

Time metric was created/ingested.


</Field>


<Field
  enumValues={null}
  examples={[554222.0]}
  name={"val"}
  path={"gauge"}
  required={true}
  type={"double"}
  >

#### val

Specific value.


</Field>


</Fields>

</Field>


<Field
  enumValues={null}
  examples={null}
  name={"histogram"}
  path={null}
  required={false}
  type={"struct"}
  >

### histogram

Also called a "timer". A[`histogram`](#histogram) represents the frequency distribution of a value. This is commonly used for timings, helping to understand quantiles, max, min, and other aggregations.

<Fields filters={false}>


<Field
  enumValues={null}
  examples={["duration_ms"]}
  name={"name"}
  path={"histogram"}
  required={true}
  type={"string"}
  >

#### name

The metric name.


</Field>


<Field
  enumValues={null}
  examples={[1]}
  name={"sample_rate"}
  path={"histogram"}
  required={false}
  type={"double"}
  >

#### sample_rate

The bucket/distribution the metric is a part of.


</Field>


<Field
  enumValues={null}
  examples={[{"host":"my.host.com"}]}
  name={"tags"}
  path={"histogram"}
  required={true}
  type={"map"}
  >

#### tags

The metric name.


</Field>


<Field
  enumValues={null}
  examples={["2019-11-01T21:15:47+00:00"]}
  name={"timestamp"}
  path={"histogram"}
  required={true}
  type={"timestamp"}
  >

#### timestamp

Time metric was created/ingested.


</Field>


<Field
  enumValues={null}
  examples={[2.6]}
  name={"val"}
  path={"histogram"}
  required={true}
  type={"double"}
  >

#### val

Specific value.


</Field>


</Fields>

</Field>


<Field
  enumValues={null}
  examples={null}
  name={"set"}
  path={null}
  required={false}
  type={"struct"}
  >

### set

A set represents a count of unique values, AKA the cardinality.

<Fields filters={false}>


<Field
  enumValues={null}
  examples={["unique_users"]}
  name={"name"}
  path={"set"}
  required={true}
  type={"string"}
  >

#### name

The metric name.


</Field>


<Field
  enumValues={null}
  examples={[{"host":"my.host.com"}]}
  name={"tags"}
  path={"set"}
  required={true}
  type={"map"}
  >

#### tags

The metric name.


</Field>


<Field
  enumValues={null}
  examples={["2019-11-01T21:15:47+00:00"]}
  name={"timestamp"}
  path={"set"}
  required={true}
  type={"timestamp"}
  >

#### timestamp

Time metric was created/ingested.


</Field>


<Field
  enumValues={null}
  examples={[12]}
  name={"val"}
  path={"set"}
  required={true}
  type={"double"}
  >

#### val

Specific value.


</Field>


</Fields>

</Field>


</Fields>

## Components

import Jump from '@site/src/components/Jump';

<Jump to="/components?metric=true">View all metric compatible components</Jump>



