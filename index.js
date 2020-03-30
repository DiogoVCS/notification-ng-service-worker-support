import angularServiceWorker, {
  Driver
} from '@angular/service-worker/ngsw-worker.js';

Driver.handleClick = function(notification, action) {
  return __awaiter$5(this, void 0, void 0, function*() {
    notification.close();
    const options = {};
    // The filter uses name in notification because the properties are on the prototype so
    // hasOwnProperty does not work here
    NOTIFICATION_OPTION_NAMES.filter(name => name in notification).forEach(
      name => (options[name] = notification[name])
    );
    yield clients.matchAll().then(matchedClients => {
      const url = new URL('/', location).href;
      for (let matchClient of matchedClients) {
        if (matchClient.url.startsWith(url)) {
          return matchClient.focus();
        }
      }
      console.log(url);
      return clients.openWindow(url);
    });
    yield this.broadcast({
      type: 'NOTIFICATION_CLICK',
      data: { action, notification: options }
    });
  });
};

module.export = angularServiceWorker;
