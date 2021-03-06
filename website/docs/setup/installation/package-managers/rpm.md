---
title: Install Vector via RPM
sidebar_label: RPM
description: Install Vector through the RPM package manager
---

Vector can be installed through the [RPM package manager][urls.rpm] which is
generally used on CentOS.

## Install

1. Download the [Vector `.rpm file`][urls.vector_downloads.latest/vector-x86_64.rpm]

   ```bash
   curl -O https://packages.timber.io/vector/latest/vector-x86_64.rpm
   ```

2. Install the Vector `.rpm` package directly:

   ```bash
   sudo rpm -i vector-x86_64.rpm
   ```

3. Start Vector:

   ```bash
   sudo systemctl start vector
   ```

   That's it! Proceed to [configure](#configuring) Vector for your use case.

### Previous Versions

Historical Vector versions can be found in the [releases][urls.vector_releases].
Once you've found the version you'd like to install you can re-follow the
[install](#install) steps with the URL to the Vector `.rpm` file.

## Configuring

The Vector configuration file is placed in:

```
etc/vector/vector.toml
```

A full spec is located at `/etc/vector/vector.spec.toml` and examples are
located in `/etc/vector/examples/*`. You can learn more about configuring
Vector in the [Configuration][docs.configuration] section.

## Administering

Vector can be managed through the [Systemd][urls.systemd] service manager:

import Jump from '@site/src/components/Jump';

<Jump to="/docs/administration">Administration</Jump>

## Uninstalling

```bash
sudo rpm -e vector
```

## Updating

Follow the [install](#install) steps again, downloading the latest version of
Vector.


[docs.configuration]: /docs/setup/configuration
[urls.rpm]: https://rpm.org/
[urls.systemd]: https://www.freedesktop.org/wiki/Software/systemd/
[urls.vector_downloads.latest/vector-x86_64.rpm]: https://packages.timber.io/vector/latest/vector-x86_64.rpm
[urls.vector_releases]: https://github.com/timberio/vector/releases
