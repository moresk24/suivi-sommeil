self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    scheduleNotification();
  }
});

function scheduleNotification() {
  const now = new Date();
  const target = new Date();
  target.setHours(10, 0, 0, 0);
  
  // Si 10h est déjà passé aujourd'hui, on programme pour demain
  if (now > target) target.setDate(target.getDate() + 1);
  
  const delay = target.getTime() - now.getTime();
  
  setTimeout(() => {
    self.registration.showNotification('🌙 Suivi Sommeil', {
      body: 'N\'oublie pas de saisir ta nuit !',
      icon: '/suivi-sommeil/android-chrome-192x192.png',
      badge: '/suivi-sommeil/favicon-32x32.png',
      tag: 'rappel-sommeil',
      renotify: true
    });
    // Reprogramme pour le lendemain
    scheduleNotification();
  }, delay);
}