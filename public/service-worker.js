// Service Worker para notificações push
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Novo pensamento no diário! ✨',
    icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Memo/3D/memo_3d.png',
    badge: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Memo/3D/memo_3d.png',
    tag: 'diary-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Abrir diário'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Nosso Cantinho Especial', options)
  );
});

// Lidar com cliques nas notificações
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(clientList) {
        // Verificar se existe uma janela aberta
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].url.includes('/diary')) {
            return clientList[i].focus();
          }
        }
        // Se não existir, abrir uma nova
        if (clients.openWindow) {
          return clients.openWindow('/diary');
        }
      })
    );
  }
});
