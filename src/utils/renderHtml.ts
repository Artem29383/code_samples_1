import serialize from 'serialize-javascript';
import renderHead from 'utils/renderHead';

import config from '@config';

export const renderHtmlStart = (head: ReturnType<typeof renderHead>) =>
  `<!doctype html>
    <html ${head.htmlAttributes}>
      <head>
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
        <script>
        if (typeof window !== 'undefined') {
            window.OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
              OneSignal.init({
                appId: '${config.oneSignal.appId}',
                safari_web_id: '${config.oneSignal.safari_web_id}',
                notifyButton: {
                  enable: false,
                },
                autoPrompt: true,
                allowLocalhostAsSecureOrigin: true,
              });
            });
          }
        </script>
        <noscript>Javascript is disabled!</noscript>
        <meta charset="utf-8">
        <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#317EFB"/>

        ${head.meta}

        ${head.ogMeta}

        ${head.link}

        ${head.title}

        <script type="text/javascript">
          window.initMap = () => {
            window.__MAP_LOADED__ = true;
          }
        </script>

        <script defer
          src="https://maps.googleapis.com/maps/api/js?key=${config.maps.apiKey}&v=beta&map_ids=${config.maps.mapKey}&callback=initMap&libraries=places&language=en">
        </script>
      </head>
      <body>
  `;

export const renderHtmlEnd = (
  assets: Record<string, string>,
  initialState: Record<string, object>
) => `
    <!-- Store the initial state into window -->
    <script>
      // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
      // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
      window.__INITIAL_STATE__=${serialize(initialState)};
    </script>

    <!-- Insert bundled scripts into <script> tag -->
    ${Object.keys(assets)
      .map(key =>
        key.substr(key.length - 2) === 'js'
          ? `<script src="${assets[key]}"></script>`
          : ''
      )
      .join('')}
  </body>
</html>`;

export default (
  head: ReturnType<typeof renderHead>,
  assets: Record<string, string>,
  htmlContent: string,
  initialState: Record<string, object>
) => {
  return `${renderHtmlStart(head)}${htmlContent}${renderHtmlEnd(
    assets,
    initialState
  )}`;
};
