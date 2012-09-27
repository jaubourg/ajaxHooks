What you need to build your own ajaxHooks
-----------------------------------------

In order to build ajaxHooks, you need to have GNU make 3.8 or later, Node.js/npm latest, and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

Windows users have two options:

1. Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git),
   [GNU make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm), and a
   [binary version of Node.js](http://node-js.prcn.co.cc/). Make sure all three packages are installed to the same
   location (by default, this is C:\Program Files\Git).
2. Install [Cygwin](http://cygwin.com/) (make sure you install the git, make, and which packages), then either follow
   the [Node.js build instructions](https://github.com/ry/node/wiki/Building-node.js-on-Cygwin-%28Windows%29) or install
   the [binary version of Node.js](http://node-js.prcn.co.cc/).

Mac OS users should install Xcode (comes on your Mac OS install DVD, or downloadable from
[Apple's Xcode site](http://developer.apple.com/technologies/xcode.html)) and
[Homebrew](http://mxcl.github.com/homebrew/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.

Linux/BSD users should use their appropriate package managers to install make, git, and node, or build from source
if you swing that way. Easy-peasy.


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
