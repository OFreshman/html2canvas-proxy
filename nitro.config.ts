// https://nitro.unjs.io/config
export default defineNitroConfig({
  compatibilityDate: "2025-02-21",
  srcDir: "server",
  routeRules: {
    "/**": {
      cors: true
    }
  }
});