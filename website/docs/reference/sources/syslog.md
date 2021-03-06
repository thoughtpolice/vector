---
delivery_guarantee: "best_effort"
event_types: ["log"]
issues_url: https://github.com/timberio/vector/issues?q=is%3Aopen+is%3Aissue+label%3A%22source%3A+syslog%22
sidebar_label: "syslog|[\"log\"]"
source_url: https://github.com/timberio/vector/tree/master/src/sources/syslog.rs
status: "prod-ready"
title: "syslog source" 
---

The `syslog` source ingests data through the Syslog 5424 protocol and outputs [`log`][docs.data-model#log] events.

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
[sources.my_source_id]
  # REQUIRED
  type = "syslog" # example, must be: "syslog"
  mode = "tcp" # example, enum
  
  # OPTIONAL
  address = "0.0.0.0:9000" # example, no default, relevant when mode = "tcp" or mode = "udp"
  path = "/path/to/socket" # example, no default, relevant when mode = "unix"
```

</TabItem>
<TabItem value="advanced">

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration" />

```toml
[sources.my_source_id]
  # REQUIRED - General
  type = "syslog" # example, must be: "syslog"
  mode = "tcp" # example, enum
  
  # OPTIONAL - General
  address = "0.0.0.0:9000" # example, no default, relevant when mode = "tcp" or mode = "udp"
  max_length = 102400 # default, bytes
  path = "/path/to/socket" # example, no default, relevant when mode = "unix"
  
  # OPTIONAL - Context
  host_key = "host" # default
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
  examples={["0.0.0.0:9000","systemd","systemd#2"]}
  name={"address"}
  nullable={true}
  path={null}
  relevantWhen={{"mode":["tcp","udp"]}}
  required={false}
  templateable={false}
  type={"string"}
  unit={null}
  >

### address

The TCP or UDP address to listen for connections on, or "systemd#N" to use the Nth socket passed by systemd socket activation. 


</Field>


<Field
  common={false}
  defaultValue={"host"}
  enumValues={null}
  examples={["host"]}
  name={"host_key"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"string"}
  unit={null}
  >

### host_key

The key name added to each event representing the current host. See [Context](#context) for more info.


</Field>


<Field
  common={false}
  defaultValue={102400}
  enumValues={null}
  examples={[102400]}
  name={"max_length"}
  nullable={true}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"int"}
  unit={"bytes"}
  >

### max_length

The maximum bytes size of incoming messages before they are discarded.


</Field>


<Field
  common={true}
  defaultValue={null}
  enumValues={{"tcp":"Read incoming Syslog data over the TCP protocol.","udp":"Read incoming Syslog data over the UDP protocol.","unix":"Read uncoming Syslog data through a Unix socker."}}
  examples={["tcp","udp","unix"]}
  name={"mode"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  >

### mode

The input mode.


</Field>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={["/path/to/socket"]}
  name={"path"}
  nullable={true}
  path={null}
  relevantWhen={{"mode":"unix"}}
  required={false}
  templateable={false}
  type={"string"}
  unit={null}
  >

### path

The unix socket path. *This should be absolute path.*



</Field>


</Fields>

## Output

This component outputs [`log` events][docs.data-model.log].
For example:

```javascript
{
  "appname": "app-name",
  "facility": "1",
  "host": "my.host.com",
  "message": "<13>Feb 13 20:07:26 74794bfb6795 root[8539]: i am foobar",
  "msgid": "ID47",
  "procid": 8710,
  "severity": "notice",
  "timestamp": "2019-11-01T21:15:47+00:00",
  "version": 1
}
```
More detail on the output schema is below.

<Fields filters={true}>


<Field
  enumValues={null}
  examples={["app-name"]}
  name={"appname"}
  path={null}
  required={false}
  type={"string"}
  >

### appname

The appname extracted from the [Syslog 5424][urls.syslog_5424] line. If a appname is not found, then the key will not be added.


</Field>


<Field
  enumValues={null}
  examples={["1"]}
  name={"facility"}
  path={null}
  required={false}
  type={"string"}
  >

### facility

The facility extracted from the [Syslog 5424][urls.syslog_5424] line. If a facility is not found, then the key will not be added.


</Field>


<Field
  enumValues={null}
  examples={["my.host.com"]}
  name={"host"}
  path={null}
  required={true}
  type={"string"}
  >

### host

The hostname extracted from the [Syslog 5424][urls.syslog_5424] line. If a hostname is not found, then Vector will use the upstream hostname. In the case where[`mode`](#mode) = `"unix"` the socket path will be used.


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

The raw message, unaltered.



</Field>


<Field
  enumValues={null}
  examples={["ID47"]}
  name={"msgid"}
  path={null}
  required={false}
  type={"string"}
  >

### msgid

The msgid extracted from the [Syslog 5424][urls.syslog_5424] line. If a msgid is not found, then the key will not be added.


</Field>


<Field
  enumValues={null}
  examples={[8710]}
  name={"procid"}
  path={null}
  required={false}
  type={"int"}
  >

### procid

The procid extracted from the [Syslog 5424][urls.syslog_5424] line. If a procid is not found, then the key will not be added.


</Field>


<Field
  enumValues={null}
  examples={["notice"]}
  name={"severity"}
  path={null}
  required={false}
  type={"string"}
  >

### severity

The severity extracted from the [Syslog 5424][urls.syslog_5424] line. If a severity is not found, then the key will not be added.


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

The timestamp extracted from the incoming line. If a timestamp is not found, then Vector will use the current time.


</Field>


<Field
  enumValues={null}
  examples={[1]}
  name={"version"}
  path={null}
  required={false}
  type={"int"}
  >

### version

The version extracted from the [Syslog 5424][urls.syslog_5424] line. If a version is not found, then the key will not be added.



</Field>


</Fields>

## How It Works

### Context

By default, the `syslog` source will add context
keys to your events via the[`host_key`](#host_key)
options.

### Environment Variables

Environment variables are supported through all of Vector's configuration.
Simply add `${MY_ENV_VAR}` in your Vector configuration file and the variable
will be replaced before being evaluated.

You can learn more in the [Environment Variables][docs.configuration#environment-variables]
section.

### Line Delimiters

Each line is read until a new line delimiter (the `0xA` byte) is found.

### Parsing

Vector will _only_ parse messages in the [Syslog 5424][urls.syslog_5424] format.
Vector makes a best effort to parse this format. If parsing fails, the message
will be dropped and `warning` log line will be emitted. If this is the case, we
recommend using the [`tcp` source][docs.sources.tcp] combined with the
[`regex_parser` transform][docs.transforms.regex_parser] to implement your own
ingestion and parsing scheme.


[docs.configuration#environment-variables]: /docs/setup/configuration#environment-variables
[docs.data-model#log]: /docs/about/data-model#log
[docs.data-model.log]: /docs/about/data-model/log
[docs.sources.tcp]: /docs/reference/sources/tcp
[docs.transforms.regex_parser]: /docs/reference/transforms/regex_parser
[urls.syslog_5424]: https://tools.ietf.org/html/rfc5424
