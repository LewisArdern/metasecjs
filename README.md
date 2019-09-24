--------------------Please Note:-------------------
============
*This is an unstable PoC, and is work in progress*

This was written as a Proof-Of-Concept for AppSec Amsterdam, I should have most of the kinks worked out in a few weeks, so feel free to use it but issues will exist, and it is not currently OS agnostic. 

We have to start somewhere, and well, this is somewhere!

-Lewis 


metasecjs
=========

Security Meta Analysis For JavaScript Applications

[![Version](https://img.shields.io/npm/v/metasecjs.svg)](https://npmjs.org/package/metasecjs)
[![Downloads/week](https://img.shields.io/npm/dw/metasecjs.svg)](https://npmjs.org/package/metasecjs)
[![License](https://img.shields.io/npm/l/metasecjs.svg)](https://github.com/LewisArdern/metasecjs/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g metasecjs
$ metasec COMMAND
running command...
$ metasec (-v|--version|version)
metasecjs/0.0.0 win32-x64 node-v10.16.2
$ metasec --help [COMMAND]
USAGE
  $ metasec COMMAND
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
  $ metasec hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src\commands\hello.js](https://github.com/LewisArdern/metasecjs/blob/v0.0.0/src\commands\hello.js)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src\commands\help.ts)_
<!-- commandsstop -->
