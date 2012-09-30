What you need to build your own ajaxHooks
-----------------------------------------

In order to build ajaxHooks, you need to have Node.js/npm latest, and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

Windows users have two options:

1. Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git) and a [binary version of Node.js](http://node-js.prcn.co.cc/). Make sure both packages are installed to the same location (by default, this is C:\Program Files\Git).
2. Install [Cygwin](http://cygwin.com/) (make sure you install git), then either follow the [Node.js build instructions](https://github.com/ry/node/wiki/Building-node.js-on-Cygwin-%28Windows%29) or install the [binary version of Node.js](http://node-js.prcn.co.cc/).

Mac OS users should install [Homebrew](http://mxcl.github.com/homebrew/), then run `brew install git` to install git, and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install git, and node, or build from source if you swing that way. Easy-peasy.


How to build your own ajaxHooks
-------------------------------

First, clone a copy of the main ajaxHooks git repo by running:

```bash
git clone git://github.com/jaubourg/ajaxHooks.git
```

Enter the directory and install the Node dependencies:

```bash
cd ajaxHooks && npm install
```

Make sure you have `grunt` installed by testing:

```bash
grunt -version
```

Then, to get a complete, minified (w/ Uglify.js), linted (w/ JSHint) version of ajaxHooks, type the following:

```bash
grunt
```

The built version of ajaxHooks will be put in the `dist/` subdirectory.
