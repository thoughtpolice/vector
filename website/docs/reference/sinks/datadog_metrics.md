---
delivery_guarantee: "best_effort"
event_types: ["metric"]
issues_url: https://github.com/timberio/vector/issues?q=is%3Aopen+is%3Aissue+label%3A%22sink%3A+datadog_metrics%22
sidebar_label: "datadog_metrics|[\"metric\"]"
source_url: https://github.com/timberio/vector/tree/master/src/sinks/datadog_metrics.rs
status: "beta"
title: "datadog_metrics sink" 
---

The `datadog_metrics` sink [batches](#buffers-and-batches) [`metric`][docs.data-model#metric] events to [Datadog][urls.datadog] metrics service using [HTTP API](https://docs.datadoghq.com/api/?lang=bash#metrics).

## Configuration

import Tabs from '@theme/Tabs';

<Tabs
  block={true}
  defaultValue="common"
  values={[
    { label: 'Common', value: 'common', },
    { label: 'Advanced', value: 'advanced', },
  ]
}>

import TabItem from '@theme/TabItem';

<TabItem value="common">

import CodeHeader from '@site/src/components/CodeHeader';

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration"/ >

```toml
[sinks.my_sink_id]
  # REQUIRED
  type = "datadog_metrics" # example, must be: "datadog_metrics"
  inputs = ["my-source-id"] # example
  api_key = "3111111111111111aaaaaaaaaaaaaaaa" # example
  namespace = "service" # example
  
  # OPTIONAL
  host = "https://api.datadoghq.com" # default
```

</TabItem>
<TabItem value="advanced">

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration" />

```toml
[sinks.my_sink_id]
  # REQUIRED - General
  type = "datadog_metrics" # example, must be: "datadog_metrics"
  inputs = ["my-source-id"] # example
  api_key = "3111111111111111aaaaaaaaaaaaaaaa" # example
  namespace = "service" # example
  
  # OPTIONAL - General
  healthcheck = true # default
  host = "https://api.datadoghq.com" # default
  
  # OPTIONAL - Batching
  batch_size = 20 # default, bytes
  batch_timeout = 1 # default, seconds
  
  # OPTIONAL - Requests
  rate_limit_duration = 1 # default, seconds
  rate_limit_num = 5 # default
  request_in_flight_limit = 5 # default
  request_timeout_secs = 60 # default, seconds
  retry_attempts = 5 # default
  retry_backoff_secs = 5 # default, seconds
```

</TabItem>

</Tabs>

## Options

import Fields from '@site/src/components/Fields';

import Field from '@site/src/components/Field';

<Fields filters={true}>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={["3111111111111111aaaaaaaaaaaaaaaa"]}
  name={"api_key"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  >

### api_key

Datadog [API key](https://docs.datadoghq.com/api/?lang=bash#authentication)


</Field>


<Field
  common={false}
  defaultValue={20}
  enumValues={null}
  examples={[20]}
  name={"batch_size"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={"bytes"}
  >

### batch_size

The maximum size of a batch before it is flushed.


</Field>


<Field
  common={false}
  defaultValue={1}
  enumValues={null}
  examples={[1]}
  name={"batch_timeout"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={"seconds"}
  >

### batch_timeout

The maximum age of a batch before it is flushed.


</Field>


<Field
  common={false}
  defaultValue={true}
  enumValues={null}
  examples={[true,false]}
  name={"healthcheck"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"bool"}
  unit={null}
  >

### healthcheck

Enables/disables the sink healthcheck upon start. See [Health Checks](#health-checks) for more info.


</Field>


<Field
  common={true}
  defaultValue={"https://api.datadoghq.com"}
  enumValues={null}
  examples={["https://api.datadoghq.com","https://api.datadoghq.eu"]}
  name={"host"}
  nullable={true}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"string"}
  unit={null}
  >

### host

Datadog endpoint to send metrics to.


</Field>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={["service"]}
  name={"namespace"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  >

### namespace

A prefix that will be added to all metric names.


</Field>


<Field
  common={false}
  defaultValue={1}
  enumValues={null}
  examples={[1]}
  name={"rate_limit_duration"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={"seconds"}
  >

### rate_limit_duration

The window used for the `request_rate_limit_num` option See [Rate Limits](#rate-limits) for more info.


</Field>


<Field
  common={false}
  defaultValue={5}
  enumValues={null}
  examples={[5]}
  name={"rate_limit_num"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={null}
  >

### rate_limit_num

The maximum number of requests allowed within the[`rate_limit_duration`](#rate_limit_duration) window. See [Rate Limits](#rate-limits) for more info.


</Field>


<Field
  common={false}
  defaultValue={5}
  enumValues={null}
  examples={[5]}
  name={"request_in_flight_limit"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={null}
  >

### request_in_flight_limit

The maximum number of in-flight requests allowed at any given time. See [Rate Limits](#rate-limits) for more info.


</Field>


<Field
  common={false}
  defaultValue={60}
  enumValues={null}
  examples={[60]}
  name={"request_timeout_secs"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={"seconds"}
  >

### request_timeout_secs

The maximum time a request can take before being aborted. It is highly recommended that you do not lower value below the service's internal timeout, as this could create orphaned requests, pile on retries, and result in deuplicate data downstream.


</Field>


<Field
  common={false}
  defaultValue={5}
  enumValues={null}
  examples={[5]}
  name={"retry_attempts"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={null}
  >

### retry_attempts

The maximum number of retries to make for failed requests. See [Retry Policy](#retry-policy) for more info.


</Field>


<Field
  common={false}
  defaultValue={5}
  enumValues={null}
  examples={[5]}
  name={"retry_backoff_secs"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={"seconds"}
  >

### retry_backoff_secs

The amount of time to wait before attempting a failed request again. See [Retry Policy](#retry-policy) for more info.


</Field>


</Fields>

## Output

The `datadog_metrics` sink [batches](#buffers-and-batches) [`metric`][docs.data-model#metric] events to [Datadog][urls.datadog] metrics service using [HTTP API](https://docs.datadoghq.com/api/?lang=bash#metrics).
Batches are flushed via the [`batch_size`](#batch_size) or
[`batch_timeout`](#batch_timeout) options. You can learn more in the [buffers &
batches](#buffers--batches) section.

## How It Works

### Environment Variables

Environment variables are supported through all of Vector's configuration.
Simply add `${MY_ENV_VAR}` in your Vector configuration file and the variable
will be replaced before being evaluated.

You can learn more in the [Environment Variables][docs.configuration#environment-variables]
section.

### Health Checks

Health checks ensure that the downstream service is accessible and ready to
accept data. This check is performed upon sink initialization.
If the health check fails an error will be logged and Vector will proceed to
start.

#### Require Health Checks

If you'd like to exit immediately upon a health check failure, you can
pass the `--require-healthy` flag:

```bash
vector --config /etc/vector/vector.toml --require-healthy
```

#### Disable Health Checks

If you'd like to disable health checks for this sink you can set the[`healthcheck`](#healthcheck) option to `false`.

### Metric Types

Datadog accepts the following types for [submission via API](https://docs.datadoghq.com/developers/metrics/#submission-types-and-datadog-in-app-types):
- Count
- Gauge
- Rate

The following matrix outlines how Vector metric types are mapped into Datadog metrics types.

| Vector Metrics | Datadog Metrics |
|----------------|-----------------|
| Counter        | Count           |
| Gauge          | Gauge           |
| Gauge Delta    | N/A             |
| Histogram      | Count [1]       |
| Set            | N/A             |

1. Aggregation of Histogram values is not supported at the moment. Histogram values will be sent as is, as raw Count values.

### Rate Limits

Vector offers a few levers to control the rate and volume of requests to the
downstream service. Start with the[`rate_limit_duration`](#rate_limit_duration) and[`rate_limit_num`](#rate_limit_num)
options to ensure Vector does not exceed the specified number of requests in
the specified window. You can further control the pace at which this window is
saturated with the[`request_in_flight_limit`](#request_in_flight_limit) option, which will guarantee no
more than the specified number of requests are in-flight at any given time.

Please note, Vector's defaults are carefully chosen and it should be rare that
you need to adjust these. If you found a good reason to do so please share it
with the Vector team by [opening an issie][urls.new_datadog_metrics_sink_issue].

### Retry Policy

Vector will retry failed requests (status == `429`, >= `500`, and != `501`).
Other responses will _not_ be retried. You can control the number of retry
attempts and backoff rate with the[`retry_attempts`](#retry_attempts) and[`retry_backoff_secs`](#retry_backoff_secs) options.


[docs.configuration#environment-variables]: /docs/setup/configuration#environment-variables
[docs.data-model#metric]: /docs/about/data-model#metric
[urls.datadog]: https://www.datadoghq.com
[urls.new_datadog_metrics_sink_issue]: https://github.com/timberio/vector/issues/new?labels=sink%3A+datadog_metrics
