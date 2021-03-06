---

event_types: ["log"]
issues_url: https://github.com/timberio/vector/issues?q=is%3Aopen+is%3Aissue+label%3A%22transform%3A+remove_fields%22
sidebar_label: "remove_fields|[\"log\"]"
source_url: https://github.com/timberio/vector/tree/master/src/transforms/remove_fields.rs
status: "prod-ready"
title: "remove_fields transform" 
---

The `remove_fields` transform accepts [`log`][docs.data-model#log] events and allows you to remove one or more log fields.

## Configuration

import CodeHeader from '@site/src/components/CodeHeader';

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration"/ >

```toml
[transforms.my_transform_id]
  type = "remove_fields" # example, must be: "remove_fields"
  inputs = ["my-source-id"] # example
  fields = ["field1", "field2"] # example
```

## Options

import Fields from '@site/src/components/Fields';

import Field from '@site/src/components/Field';

<Fields filters={true}>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={[["field1","field2"]]}
  name={"fields"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"[string]"}
  unit={null}
  >

### fields

The log field names to drop.


</Field>


</Fields>

## How It Works

### Environment Variables

Environment variables are supported through all of Vector's configuration.
Simply add `${MY_ENV_VAR}` in your Vector configuration file and the variable
will be replaced before being evaluated.

You can learn more in the [Environment Variables][docs.configuration#environment-variables]
section.


[docs.configuration#environment-variables]: /docs/setup/configuration#environment-variables
[docs.data-model#log]: /docs/about/data-model#log
