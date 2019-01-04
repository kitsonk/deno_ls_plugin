import "typescript/lib/tsserverlibrary";

function init() {
  function create(info: ts.server.PluginCreateInfo): ts.LanguageService {
    info.project.projectService.logger.info("deno_ls_plugin: setup");

    // TypeScript only officially supports proxying the LanguageService, but
    // for Deno, we just want to adjust module names that end with `.ts` so
    // that they don't end with `.ts` in the editor, so that TypeScript then
    // actually resolves the right host name.  The plugin creator though gets
    // passed a reference to the LanguageServiceHost which is what we want to
    // modify, so we will cache the original function and proxy it ourselves.

    const origResolveModuleNames = info.languageServiceHost.resolveModuleNames;

    info.languageServiceHost.resolveModuleNames = (
      moduleNames,
      containingFile,
      reusedNames,
      redirectedReference
    ) => {
      moduleNames = moduleNames.map(moduleName => {
        // For any modules ending with `.ts` we will strip that off
        if (moduleName.endsWith(".ts")) {
          const newName = moduleName.slice(0, -3);
          info.project.projectService.logger.info(
            `deno_ls_plugin: transform "${moduleName}" to "${newName}"`
          );
          return newName;
        }
        return moduleName;
      });

      // We use the remapped module names to call the original method
      return origResolveModuleNames.call(
        info.languageServiceHost,
        moduleNames,
        containingFile,
        reusedNames,
        redirectedReference
      );
    };

    // We aren't actually proxying the language service, so we just return the
    // original
    return info.languageService;
  }

  return { create };
}

export = init;
