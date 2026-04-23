// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="pl-PL">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {import.meta.env.SERVER_BASE_URL && <meta name="robots" content="noindex, nofollow" />}
          <base href={`${import.meta.env.SERVER_BASE_URL}/`} />
          <link rel="icon" href="favicon.ico" sizes="any" />
          <link rel="icon" href="images/mtynk-ludzik-gladziolit-300x300-1-150x150.png" sizes="32x32" />
          <link rel="icon" href="images/mtynk-ludzik-gladziolit-300x300-1.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="images/mtynk-ludzik-gladziolit-300x300-1.png" />
          <link rel="preload" as="image" href="images/hero-768w.jpg" imagesrcset="images/hero-480w.jpg 480w, images/hero-768w.jpg 768w, images/hero-1125w.jpg 1125w" imagesizes="100vw" fetchpriority="high" />
          <script>{`(function(){try{var t=localStorage.getItem("mtynk_theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`}</script>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
