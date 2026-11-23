import { pageRoutes } from "virtual:file-routes";
import { createRouter } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";
import { basePath } from "./utils/base";

// The router only matches the prerendered page; navigation is full page
// loads (see client-setup.ts), so its link handling is switched off.
export const Router = createRouter({
  routes: fileRoutes(pageRoutes),
  base: basePath,
  explicitLinks: true,
});
