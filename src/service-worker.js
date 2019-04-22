// importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

// workbox.setConfig({
//     debug: true,
//   });
  
//   workbox.precaching.precacheAndRoute([]);
    
//   workbox.routing.registerRoute(
//     new RegExp('https://firestore.googleapis.com/(.*)'),
//     workbox.strategies.networkFirst({
//       cacheName: 'api',
//     }),
//   );
  
//   workbox.routing.registerRoute(
//     new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//     workbox.strategies.cacheFirst({
//       cacheName: 'googleapis',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 30,
//         }),
//       ],
//     }),
//   );