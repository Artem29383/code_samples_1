export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/firebase-messaging-sw')
        .then(function(registration) {
          // eslint-disable-next-line no-console
          console.log('[SW]: SCOPE: ', registration.scope);
          return registration.scope;
        })
        .catch(function(err) {
          console.info(err);
          return err;
        });
    });
  }
};
