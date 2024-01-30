const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
// const resourceRoute = new Route(
//   ({ request }) => ["style", "script", "worker"].includes(request.destination),
//   new StaleWhileRevalidate({
//     cacheName: "asset-cache",
//     plugin: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// );

// Register routes
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset/resources",
    plugin: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// // TODO: Implement asset caching
// const resourceRoute = new Route(
//   ({ request }) => {
//     return request.destination === "asset/resource";
//   },
//   new StaleWhileRevalidate({
//     cacheName: "asset/resource",
//   })
// );

// // Register routes
// registerRoute(resourceRoute);
