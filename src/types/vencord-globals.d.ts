declare const IS_DEV: boolean;
declare const IS_REPORTER: boolean;
declare const IS_ANTI_CRASH_TEST: boolean;

declare namespace Vencord {
  namespace Api {
    namespace PluginManager {
      function subscribeAllPluginsFluxEvents(dispatcher: any): void;
    }
  }
}
