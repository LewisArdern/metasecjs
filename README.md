metasec.js
=========

Security Meta Analysis For JavaScript Applications.
<!-- 
[![Version](https://img.shields.io/npm/v/metasecjs.svg)](https://npmjs.org/package/metasecjs)
[![Downloads/week](https://img.shields.io/npm/dw/metasecjs.svg)](https://npmjs.org/package/metasecjs)
[![License](https://img.shields.io/npm/l/metasecjs.svg)](https://github.com/LewisArdern/metasecjs/blob/master/package.json) -->

Experimental functionality:

* Reviews the package.json and provides guidance on potential issues or misconfigurations when using a particular dependency from a repository
* Performs third-party dependency scanning using npm or yarn audit
* Identifies secrets using [semgrep](https://github.com/returntocorp/semgrep)
* Identifies security issues using [semgrep](https://github.com/returntocorp/semgrep)
* Finds ReDoS issues with [recheck](https://github.com/MakeNowJust-Labo/recheck)
* Finds Electron issues with [electronegativity](https://github.com/doyensec/electronegativity)


# Set-up
1. Clone project and run ```npm install```
2. Set up Semgrep CLI https://semgrep.dev

# Usage

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
  $ metasec help audit
```

<!-- commandsstop -->
