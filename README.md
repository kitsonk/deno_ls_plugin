# deno_ls_plugin

[![Build Status](https://travis-ci.com/kitsonk/deno_ls_plugin.svg?branch=master)](https://travis-ci.com/kitsonk/deno_ls_plugin)

This is a TypeScript plugin which will allow TypeScript outside of Deno to
resolve modules in a similar way to the way they are resolved inside of Deno.

## Usage

You will need this package installed alongside TypeScript in `node_modules`.
For example:

```
$ npm install typescript deno_ls_plugin --save-dev
```

You will then need to modify your `tsconfig.json` for your project to include
the plugin. For example:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": ".",
    "checkJs": true,
    "module": "amd",
    "moduleResolution": "node",
    "noEmit": true,
    "noLib": true,
    "pretty": true,
    "sourceMap": true,
    "strict": true,
    "target": "esnext",
    "paths": {
      "http://*": ["../../.deno/deps/http/*"],
      "https://*": ["../../.deno/deps/https/*"]
    },
    "plugins": [{ "name": "deno_ls_plugin" }]
  },
  "include": ["./**/*.ts"]
}
```

**NOTE** If you are using Visual Studio Code, you will have to select the
workspace version of TypeScript instead of the one bundled with VSCode.

---

Copyright 2019 Kitson P. Kelly. All right reserved.
MIT License
