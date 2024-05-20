if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
      }, err => {
          console.log('Service Worker registration failed:', err);
      });
  });
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
          }
          deferredPrompt = null;
      });
  });
});

document.getElementById('pushBtn').addEventListener('click', () => {
  Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
          console.log('Push notification permission granted');
          // Logic to Subscribe to push
      }
  });
});
