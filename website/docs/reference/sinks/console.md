---
delivery_guarantee: "best_effort"
event_types: ["log","metric"]
issues_url: https://github.com/timberio/vector/issues?q=is%3Aopen+is%3Aissue+label%3A%22sink%3A+console%22
sidebar_label: "console|[\"log\",\"metric\"]"
source_url: https://github.com/timberio/vector/tree/master/src/sinks/console.rs
status: "prod-ready"
title: "console sink" 
---

The `console` sink [streams](#streaming) [`log`][docs.data-model#log] and [`metric`][docs.data-model#metric] events to [standard output streams][urls.standard_streams], such as `STDOUT` and `STDERR`.

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
  # REQUIRED - General
  type = "console" # example, must be: "console"
  inputs = ["my-source-id"] # example
  
  # REQUIRED - requests
  encoding = "json" # example, enum
  
  # OPTIONAL - General
  target = "stdout" # default, enum
```

</TabItem>
<TabItem value="advanced">

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration" />

```toml
[sinks.my_sink_id]
  # REQUIRED - General
  type = "console" # example, must be: "console"
  inputs = ["my-source-id"] # example
  
  # REQUIRED - requests
  encoding = "json" # example, enum
  
  # OPTIONAL - General
  healthcheck = true # default
  target = "stdout" # default, enum
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
  enumValues={{"json":"Each event is encoded into JSON and the payload is represented as a JSON array.","text":"Each event is encoded into text via the `message` key and the payload is new line delimited."}}
  examples={["json","text"]}
  name={"encoding"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  >

### encoding

The encoding format used to serialize the events before outputting.


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
  defaultValue={"stdout"}
  enumValues={{"stdout":"Output will be written to [STDOUT][urls.stdout]","stderr":"Output will be written to [STDERR][urls.stderr]"}}
  examples={["stdout","stderr"]}
  name={"target"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"string"}
  unit={null}
  >

### target

The [standard stream][urls.standard_streams] to write to.


</Field>


</Fields>

## Output

The `console` sink [streams](#streaming) [`log`][docs.data-model#log] and [`metric`][docs.data-model#metric] events to [standard output streams][urls.standard_streams], such as `STDOUT` and `STDERR`.

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

### Streaming

The `console` sink streams data on a real-time
event-by-event basis. It does not batch data.


[docs.configuration#environment-variables]: /docs/setup/configuration#environment-variables
[docs.data-model#log]: /docs/about/data-model#log
[docs.data-model#metric]: /docs/about/data-model#metric
[urls.standard_streams]: https://en.wikipedia.org/wiki/Standard_streams
[urls.stderr]: https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)
[urls.stdout]: https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)
