// 2LMF PRO - Service Worker
// Verzija cache-a — promijeni kad se objavi nova verzija
const CACHE_VERSION = 'v1.1';
const CACHE_NAME = '2lmf-kalkulator-' + CACHE_VERSION;
const PRICE_CACHE_KEY = '2lmf-prices-cache';
const PRICE_CACHE_TIMESTAMP_KEY = '2lmf-prices-timestamp';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// Fajlovi koji se cachiraju pri instalaciji (shell app)
const STATIC_ASSETS = [
    '/kalkulator.html',
    '/kalkulator.css',
    '/kalkulator.js',
    '/items_data.js',
    '/2lmf_logo.png',
    '/assets/sharpshark_real_logo.png',
    // Google Fonts (cachiramo što možemo)
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@300;400;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// ─── INSTALL ───────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Cachiramo što možemo, ignoriramo greške za externe resurse
                return Promise.allSettled(
                    STATIC_ASSETS.map(url =>
                        cache.add(url).catch(err => console.warn('[SW] Could not cache:', url, err))
                    )
                );
            })
            .then(() => {
                console.log('[SW] Install complete');
                return self.skipWaiting();
            })
    );
});

// ─── ACTIVATE ──────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key.startsWith('2lmf-kalkulator-') && key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    })
            )
        ).then(() => self.clients.claim())
    );
});

// ─── FETCH ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Ne interceptiramo Google Apps Script pozive (slanje upita)
    if (url.hostname.includes('script.google.com')) {
        return;
    }

    // IZOLACIJA: Ne diraj CalorieShark podmapu (ona ima svoj vlastiti SW i Manifest)
    if (url.pathname.startsWith('/calorieshark/')) {
        return;
    }

    // Strategija: Cache First, fallback na network
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Vraćamo iz cache-a, ali u pozadini osvježavamo
                    const fetchPromise = fetch(event.request)
                        .then(networkResponse => {
                            if (networkResponse && networkResponse.status === 200) {
                                const responseClone = networkResponse.clone();
                                caches.open(CACHE_NAME).then(cache => {
                                    cache.put(event.request, responseClone);
                                });
                            }
                            return networkResponse;
                        })
                        .catch(() => { }); // Ignoriramo greške u pozadini

                    return cachedResponse;
                }

                // Nije u cache-u — dohvati s mreže i spremi
                return fetch(event.request)
                    .then(networkResponse => {
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
                            return networkResponse;
                        }
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                        return networkResponse;
                    })
                    .catch(() => {
                        // Offline fallback
                        if (event.request.destination === 'document') {
                            return caches.match('/kalkulator.html');
                        }
                    });
            })
    );
});

// ─── BACKGROUND SYNC (Daily price update) ──────────────────────────────────
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CHECK_PRICE_UPDATE') {
        const lastUpdate = event.data.lastUpdate || 0;
        const now = Date.now();

        if (now - lastUpdate > ONE_DAY_MS) {
            // Obavijesti klijenta da dohvati nove cijene
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'PRICES_NEED_UPDATE' });
                });
            });
        }
    }
});

console.log('[SW] Service Worker loaded - 2LMF PRO Kalkulator', CACHE_VERSION);
