const assert = require("assert");

const plugin = require("./index");

console.log("Testing deno_ls_plugin...");

const { create } = plugin();

const languageService = {};
const loggerInfoStack = [];
const moduleNamesStack = [];
const info = {
  languageService: languageService,
  languageServiceHost: {
    resolveModuleNames(moduleNames) {
      moduleNamesStack.push(moduleNames);
      return [];
    }
  },
  project: {
    projectService: {
      logger: {
        info(text) {
          loggerInfoStack.push(text);
        }
      }
    }
  }
};

const proxy = create(info);

assert.strictEqual(proxy, languageService);
assert.deepEqual(loggerInfoStack, ["deno_ls_plugin: setup"]);

info.languageServiceHost.resolveModuleNames(["./foo", "./bar.ts"]);

assert.deepEqual(moduleNamesStack, [["./foo", "./bar"]]);
assert.deepEqual(loggerInfoStack, [
  "deno_ls_plugin: setup",
  'deno_ls_plugin: transform "./bar.ts" to "./bar"'
]);

console.log("Tests passed.");
