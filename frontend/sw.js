// offline support :

self.addEventListener("install", async (event) => {
  const assets = [
    "/",
    "./index.js",
    "style.css",
    "/services/api.js",
    "/services/router.js",
    "/services/state.js",
    "/services/ai.js",
    "/components/Projects.js",
    "/components/Projects.css",
    "/components/ProjectDetails.js",
    "/components/Contact.js",
    "/components/Contact.css",
    "/utils/loadProjects.js",
    "/images/projects/dating1.png",
    "/images/projects/moodyPlayer.png",
    "/images/projects/movieCli.png",
    "/images/projects/soroborno.png",
    "/images/projects/codeClips.png",
    "/images/projects/syshealth.png",
    "https://teachablemachine.withgoogle.com/models/oF9z45RJn/",
    "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js",
    "https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.5.4/dist/speech-commands.min.js",
  ];
  const cache = await caches.open("ai-portfolio");
  cache.addAll(assets);
});

// state while revalidating the cache

// Fetch event to implement stale-while-revalidate strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open("ai-portfolio");

      const cachedResponse = await cache.match(event.request);

      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })()
  );
});
