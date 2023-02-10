/// <reference types="vite/client" />
/// <reference types="@vue/runtime-dom" />

interface ImportMetaEnv {
  STARBEAM_REGISTRY_URL: string | undefined;
}

declare module "@shimyshack/uid" {
  export const Uid: import("vue").Directive;
  export const UidPlugin: import("vue").Plugin;
}
