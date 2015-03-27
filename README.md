# deling

Simple app-wide configuration. Based on a simply and pre-defined pattern files are read and merged into the configuration object, which is exposed directly from the module.

No need to configure `deling` before it works - simple `import` your `deling` (the Danish word for 'sharing' and for the military unit 'platoon').

## Install

`npm install --save deling`

## Configuration

You don't need to configure `deling`, but you have to configure your app - and that's what we are going to do.

## Usage

### Create configuration

`deling` will look in the root of your project (by traverse module.parent) for config files, either in a directory named `config` or directly in the root.  If the directory `config` exists `deling` will NOT be looking in the root for config files.

The content of each file will be merged into the config object, overwriting existing values for everything other than nested objects which will be deep merged.


```
# order of files in ./config
./config/default.{js,json}
./config/{NODE_ENV}.{js,json}
./config/local.{js,json}

# order of files ./
./config.{js,json}
./config.{NODE_ENV}.{js,json}
./config.local.{js,json}
```

### Default configuration

`deling` automatically adds some data about your project before merging in content from you config files.

```
{
  root: '/absolute/path/to/your/application',
  env: process.env.NODE_ENV || 'development',
  name: pkgJson.name || '',
  version: pkgJson.version || ''
}
```

### Access configuration

`var config = require('deling');` or the ES6 way `import config from 'deling';`

`config` is a reference to your combined config based on your current environment.

That's it... sorry if you hoped for more work - but `deling` is all about making configuration consitent and easy through out your application.

