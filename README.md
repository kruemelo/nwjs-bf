nwjs-bf forked from [egoist/nwjs](https://github.com/egoist/nwjs)

additional build-flavoured option to install SDK or NaCl versions of [nwjs](http://nwjs.io/downloads/)

# Install

```bash
npm i -g nwjs-bf
```

# Usage

```bash

# Install a normal version
$ nw install 0.13.0-rc2

# -or- install SDK flavoured build

$ nw install 0.13.0-rc2 sdk

# -or- install NaCl flavoured build

$ nw i 0.13.0-rc2 nacl

# Run nw in cwd or specific any directory
$ nw .

# Use another cached version
$ nw use 0.13.0-rc2
$ nw use 0.13.0-rc2 sdk

# List all local cached versions
$ nw ls

# Use a proxy
$ http_proxy=http://127.0.0.1:8787 nw install 0.13.0-rc2

# For fish shell users
$ env http_proxy=http://127.0.0.1:8787 nw install 0.13.0-rc2
```

For all available versions to install please use `nw ls-remote`

## Help

```bash
$ nw -h

  Usage: nw [options] [command]


  Commands:

    *                                   Run nwjs in a directory
    install|i <version> [<flavour>]     Install an nwjs version with optional build flavour sdk or nacl
    use|u <version> [<flavour>]         Set an active nwjs version and optional build flavour
    list|ls                             List local cached nwjs versions
    list-remote|ls-remote               List all available nwjs versions from remote
    remove|r <version> [<flavour>]      Remove a specific version of nwjs

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Programmatic usage

```js
const spawn = require('child_process').spawn
// this returns the path to nwjs excutable
const nw = require('nwjs')

const child = spawn(nw)
```

## License
MIT &copy; [EGOIST](https://github.com/egoist)
MIT &copy; [kruemelo](https://github.com/kruemelo)
