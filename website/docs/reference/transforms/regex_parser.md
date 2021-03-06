---

event_types: ["log"]
issues_url: https://github.com/timberio/vector/issues?q=is%3Aopen+is%3Aissue+label%3A%22transform%3A+regex_parser%22
sidebar_label: "regex_parser|[\"log\"]"
source_url: https://github.com/timberio/vector/tree/master/src/transforms/regex_parser.rs
status: "prod-ready"
title: "regex_parser transform" 
---

The `regex_parser` transform accepts [`log`][docs.data-model#log] events and allows you to parse a log field's value with a [Regular Expression][urls.regex].

## Configuration

import CodeHeader from '@site/src/components/CodeHeader';

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration"/ >

```toml
[transforms.my_transform_id]
  # REQUIRED - General
  type = "regex_parser" # example, must be: "regex_parser"
  inputs = ["my-source-id"] # example
  regex = "^(?P<timestamp>.*) (?P<level>\\w*) (?P<message>.*)$" # example
  
  # OPTIONAL - General
  drop_field = true # default
  field = "message" # default
  
  # OPTIONAL - Types
  [transforms.my_transform_id.types]
    status = "int" # example
    duration = "float" # example
    success = "bool" # example
    timestamp = "timestamp|%s" # example
    timestamp = "timestamp|%+" # example
    timestamp = "timestamp|%F" # example
    timestamp = "timestamp|%a %b %e %T %Y" # example
```

## Options

import Fields from '@site/src/components/Fields';

import Field from '@site/src/components/Field';

<Fields filters={true}>


<Field
  common={true}
  defaultValue={true}
  enumValues={null}
  examples={[true,false]}
  name={"drop_field"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"bool"}
  unit={null}
  >

### drop_field

If the specified[`field`](#field) should be dropped (removed) after parsing.


</Field>


<Field
  common={true}
  defaultValue={"message"}
  enumValues={null}
  examples={["message"]}
  name={"field"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"string"}
  unit={null}
  >

### field

The log field to parse. See [Failed Parsing](#failed-parsing) for more info.


</Field>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={["^(?P<timestamp>.*) (?P<level>\\w*) (?P<message>.*)$"]}
  name={"regex"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  >

### regex

The Regular Expression to apply. Do not inlcude the leading or trailing `/`. See [Failed Parsing](#failed-parsing) and [Regex Debugger](#regex-debugger) for more info.


</Field>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={[]}
  name={"types"}
  nullable={true}
  path={null}
  relevantWhen={null}
  required={false}
  templateable={false}
  type={"table"}
  unit={null}
  >

### types

Key/Value pairs representing mapped log field types. See [Regex Syntax](#regex-syntax) for more info.

<Fields filters={false}>


<Field
  common={true}
  defaultValue={null}
  enumValues={{"bool":"Coerces `\"true\"`/`/\"false\"`, `\"1\"`/`\"0\"`, and `\"t\"`/`\"f\"` values into boolean.","float":"Coerce to a 64 bit float.","int":"Coerce to a 64 bit integer.","string":"Coerce to a string.","timestamp":"Coerces to a Vector timestamp. [`strptime` specificiers][urls.strptime_specifiers] must be used to parse the string."}}
  examples={[{"name":"status","value":"int"},{"name":"duration","value":"float"},{"name":"success","value":"bool"},{"name":"timestamp","value":"timestamp|%s","comment":"unix"},{"name":"timestamp","value":"timestamp|%+","comment":"iso8601 (date and time)"},{"name":"timestamp","value":"timestamp|%F","comment":"iso8601 (date)"},{"name":"timestamp","value":"timestamp|%a %b %e %T %Y","comment":"custom strptime format"}]}
  name={"*"}
  nullable={false}
  path={"types"}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  >

#### *

A definition of log field type conversions. They key is the log field name and the value is the type. [`strptime` specifiers][urls.strptime_specifiers] are supported for the `timestamp` type.


</Field>


</Fields>

</Field>


</Fields>

## Output

Given the following log line:

```json
{
  "message": "5.86.210.12 - zieme4647 5667 [19/06/2019:17:20:49 -0400] \"GET /embrace/supply-chains/dynamic/vertical\" 201 20574"
}
```

And the following configuration:

```toml
[transforms.<transform-id>]
  type = "regex_parser"
  field = "message"
  regex = '^(?P<host>[\w\.]+) - (?P<user>[\w]+) (?P<bytes_in>[\d]+) \[(?P<timestamp>.*)\] "(?P<method>[\w]+) (?P<path>.*)" (?P<status>[\d]+) (?P<bytes_out>[\d]+)$'

[transforms.<transform-id>.types]
  bytes_int = "int"
  timestamp = "timestamp|%d/%m/%Y:%H:%M:%S %z"
  status = "int"
  bytes_out = "int"
```

A [`log` event][docs.data-model.log] will be output with the following structure:

```javascript
{
  // ... existing fields
  "bytes_in": 5667,
  "host": "5.86.210.12",
  "user_id": "zieme4647",
  "timestamp": <19/06/2019:17:20:49 -0400>,
  "message": "GET /embrace/supply-chains/dynamic/vertical",
  "status": 201,
  "bytes": 20574
}
```

Things to note about the output:

1. The `message` field was overwritten.
2. The `bytes_in`, `timestamp`, `status`, and `bytes_out` fields were coerced.


## How It Works

### Environment Variables

Environment variables are supported through all of Vector's configuration.
Simply add `${MY_ENV_VAR}` in your Vector configuration file and the variable
will be replaced before being evaluated.

You can learn more in the [Environment Variables][docs.configuration#environment-variables]
section.

### Failed Parsing

If the[`field`](#field) value fails to parse against the provided[`regex`](#regex) then an error
will be [logged][docs.monitoring#logs] and the event will be kept or discarded
depending on the `drop_failed` value.

A failure includes any event that does not successfully parse against the
provided[`regex`](#regex). This includes bad values as well as events missing the
specified[`field`](#field).

### Performance

The `regex_parser` source has been involved in the following performance tests:

* [`regex_parsing_performance`][urls.regex_parsing_performance_test]

Learn more in the [Performance][docs.performance] sections.

### Regex Debugger

To test the validity of the[`regex`](#regex) option, we recommend the [Golang Regex
Tester][urls.regex_tester] as it's Regex syntax closely 
follows Rust's.

### Regex Syntax

Vector follows the [documented Rust Regex syntax][urls.rust_regex_syntax] since
Vector is written in Rust. This syntax follows a Perl-style regular expression
syntax, but lacks a few features like look around and backreferences.

#### Named Captures

You can name Regex captures with the `<name>` syntax. For example:

```
^(?P<timestamp>.*) (?P<level>\w*) (?P<message>.*)$
```

Will capture `timestamp`, `level`, and `message`. All values are extracted as
`string` values and must be coerced with the[`types`](#types) table.

More info can be found in the [Regex grouping and flags
documentation][urls.regex_grouping_and_flags].

#### Flags

Regex flags can be toggled with the `(?flags)` syntax. The available flags are:

| Flag | Descriuption |
| :--- | :----------- |
| `i`  | case-insensitive: letters match both upper and lower case |
| `m`  | multi-line mode: ^ and $ match begin/end of line |
| `s`  | allow . to match `\n` |
| `U`  | swap the meaning of `x*` and `x*?` |
| `u`  | Unicode support (enabled by default) |
| `x`  | ignore whitespace and allow line comments (starting with `#`)

For example, to enable the case-insensitive flag you can write:

```
(?i)Hello world
```

More info can be found in the [Regex grouping and flags
documentation][urls.regex_grouping_and_flags].


[docs.configuration#environment-variables]: /docs/setup/configuration#environment-variables
[docs.data-model#log]: /docs/about/data-model#log
[docs.data-model.log]: /docs/about/data-model/log
[docs.monitoring#logs]: /docs/administration/monitoring#logs
[docs.performance]: /docs/about/performance
[urls.regex]: https://en.wikipedia.org/wiki/Regular_expression
[urls.regex_grouping_and_flags]: https://docs.rs/regex/1.1.7/regex/#grouping-and-flags
[urls.regex_parsing_performance_test]: https://github.com/timberio/vector-test-harness/tree/master/cases/regex_parsing_performance
[urls.regex_tester]: https://regex-golang.appspot.com/assets/html/index.html
[urls.rust_regex_syntax]: https://docs.rs/regex/1.1.7/regex/#syntax
[urls.strptime_specifiers]: https://docs.rs/chrono/0.3.1/chrono/format/strftime/index.html
