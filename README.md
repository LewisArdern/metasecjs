Please note:
======

*This is an unstable PoC, and is work in progress!*

This was written over a few evenings for AppSec Amsterdam, so feel free to use it but issues will exist, and it is not currently OS agnostic or robus *yet*. 

We have to start somewhere, and well, this is somewhere!

-Lewis 


metasecjs
=========

Security Meta Analysis For JavaScript Applications.
<!-- 
[![Version](https://img.shields.io/npm/v/metasecjs.svg)](https://npmjs.org/package/metasecjs)
[![Downloads/week](https://img.shields.io/npm/dw/metasecjs.svg)](https://npmjs.org/package/metasecjs)
[![License](https://img.shields.io/npm/l/metasecjs.svg)](https://github.com/LewisArdern/metasecjs/blob/master/package.json) -->

Current functionality:

* Reviews the package.json and provides guidance on potential issues or misconfigurations when using a particular dependency from a repository
* Performs third-party dependency scanning using npm or yarn audit
* Identifies secrets with [ripgrep](https://github.com/BurntSushi/ripgrep)
* Lints for security issues using [eslint](https://eslint.org)
* Finds ReDoS issues with [vuln-regex-detector](https://github.com/davisjam/vuln-regex-detector#readme)


# Set-up
1. Clone project and run ```npm install```
2. Set up ripgrep by following the instructions
    - https://github.com/BurntSushi/ripgrep
3. Set up vuln-regex-detector following the instructions
    - https://github.com/davisjam/vuln-regex-detector/    

# Usage

In the future this will be a npm module, but as it has too many third-party components, publishing does not make sense.
<!-- usage -->
```sh-session
$ git clone https://github.com/lewisardern/metasecjs
$ cd metasecjs && npm install
$ cd bin
$ ./run audit -p Amsterdam -d /path/to/scan -o /path/to/save 
auditing project...
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`metasec audit`](#metasec-aduit)
* [`metasec help [COMMAND]`](#metasec-help-command)

## `metasec audit`

Describe the command here

```
USAGE
  $ ./run audit -p Amsterdam -d /path/to/scan -o /path/to/save

OPTIONS
  -p, --project=project  Project definition
  -d, --dir=directoy Directory to scan
  -o, --output=output Directory to save results

```

## `metasec help [COMMAND]`

display help for metasec

```
USAGE
  $ metasec help [COMMAND] 123

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

<!-- commandsstop -->
