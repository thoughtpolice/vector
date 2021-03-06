---

event_types: ["metric"]
issues_url: https://github.com/timberio/vector/issues?q=is%3Aopen+is%3Aissue+label%3A%22transform%3A+add_tags%22
sidebar_label: "add_tags|[\"metric\"]"
source_url: https://github.com/timberio/vector/tree/master/src/transforms/add_tags.rs
status: "prod-ready"
title: "add_tags transform" 
---

The `add_tags` transform accepts [`metric`][docs.data-model#metric] events and allows you to add one or more metric tags.

## Configuration

import CodeHeader from '@site/src/components/CodeHeader';

<CodeHeader fileName="vector.toml" learnMoreUrl="/docs/setup/configuration"/ >

```toml
[transforms.my_transform_id]
  # REQUIRED - General
  type = "add_tags" # example, must be: "add_tags"
  inputs = ["my-source-id"] # example
  
  # REQUIRED - Tags
  [transforms.my_transform_id.tags]
    my_tag = "my value" # example
    my_env_tag = "${ENV_VAR}" # example
```

## Options

import Fields from '@site/src/components/Fields';

import Field from '@site/src/components/Field';

<Fields filters={true}>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={[]}
  name={"tags"}
  nullable={false}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"table"}
  unit={null}
  >

### tags

A table of key/value pairs representing the tags to be added to the metric.

<Fields filters={false}>


<Field
  common={true}
  defaultValue={null}
  enumValues={null}
  examples={[{"name":"my_tag","value":"my value"},{"name":"my_env_tag","value":"${ENV_VAR}"}]}
  name={"*"}
  nullable={false}
  path={"tags"}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"*"}
  unit={null}
  >

#### *

A key/value pair representing the new tag to be added.


</Field>


</Fields>

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
[docs.data-model#metric]: /docs/about/data-model#metric
