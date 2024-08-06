importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const cache_first_permanent = [
    "/API/data/race/localized",
    "/API/data/hero_class/localized",
    "/API/data/difficulty/localized",
    "/API/data/map/localized",
    "/API/data/npc/localized/",
    "/API/data/npc/localized/bosses",
    "/API/data/item/localized/basic_item/",
    "/API/data/spell/localized/basic_spell/",
    "/API/armory/character_viewer_model/"
];

const cache_first_shortly = [
    "/API/data/server",
    "/API/armory/character/",
    "/API/armory/character_viewer/by_date/",
];

const stale_while_revalidate = [
    "/assets/",
    "/API/data/encounter/localized"
];

const stale_while_revalidate_destinations = [
    "style",
    "script",
    "document",
    "manifest",
    "image",
    "font"
];

const network_first = [
    "/API/instance",
    "/API/account",
    "/API/armory/character_viewer/",
];

workbox.routing.registerRoute(
    ({url}) => network_first.some(route => url.pathname.startsWith(route)),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    ({url}) => cache_first_permanent.some(route => url.pathname.startsWith(route)),
    new workbox.strategies.CacheFirst({
        cacheName: 'cache-first-permanent',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 31 * 7 * 24 * 60 * 60
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);

workbox.routing.registerRoute(
    ({url}) => cache_first_shortly.some(route => url.pathname.startsWith(route)),
    new workbox.strategies.CacheFirst({
        cacheName: 'cache-first-shortly',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);

workbox.routing.registerRoute(
    ({url}) => {
        if (url.origin.includes("localhost"))
            return false;
        return stale_while_revalidate.some(route => url.pathname.startsWith(route));
    },
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
    ({request, url}) => {
        if (url.origin.includes("localhost"))
            return false;
        return stale_while_revalidate_destinations.some(destination => request.destination === destination);
    },
    new workbox.strategies.StaleWhileRevalidate()
);
