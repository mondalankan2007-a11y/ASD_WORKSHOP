const cache = {};
const TTL = 60 * 1000; // 1 minute in milliseconds

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url;
    const cachedEntry = cache[key];

    if (cachedEntry) {
        const isExpired = Date.now() - cachedEntry.createdAt >= TTL;
        if (!isExpired) {
            res.setHeader("X-Cache", "HIT");
            return res.json(cachedEntry.data);
        } else {
            delete cache[key];
        }
    }

    res.setHeader("X-Cache", "MISS");

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: body,
                createdAt: Date.now(),
            };
        }
        return originalJson(body);
    };

    next();
}

function invalidateCacheMiddleware(req, res, next) {
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            clearCache();
        }
        return originalJson(body);
    };
    next();
}

function clearCache() {
    for (const key in cache) {
        delete cache[key];
    }
}

function getCache() {
    return cache;
}

module.exports = {
    cacheMiddleware,
    invalidateCacheMiddleware,
    clearCache,
    getCache,
    TTL,
};
