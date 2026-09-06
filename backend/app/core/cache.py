"""
Lightweight In-Memory TTL Cache for AWS Low-Resource / Low-Cost Deployment.
Avoids external Redis dependency and costs $0.00 while preventing API rate-limit exhaustion.
"""
import time
import asyncio
import functools
from typing import Any, Callable, Dict, Tuple

class SimpleAsyncTTLCache:
    def __init__(self, maxsize: int = 256, ttl: int = 300):
        self.maxsize = maxsize
        self.ttl = ttl
        self._cache: Dict[Tuple, Tuple[float, Any]] = {}
        self._lock = asyncio.Lock()

    async def get(self, key: Tuple) -> Any:
        async with self._lock:
            if key in self._cache:
                timestamp, val = self._cache[key]
                if time.time() - timestamp < self.ttl:
                    return val
                else:
                    del self._cache[key]
            return None

    async def set(self, key: Tuple, value: Any):
        async with self._lock:
            if len(self._cache) >= self.maxsize:
                # Evict oldest entry
                oldest_key = min(self._cache.keys(), key=lambda k: self._cache[k][0])
                del self._cache[oldest_key]
            self._cache[key] = (time.time(), value)

    def cached(self, ttl: int = None):
        cache_ttl = ttl or self.ttl
        def decorator(func: Callable):
            @functools.wraps(func)
            async def wrapper(*args, **kwargs):
                # Build hashable key from args and kwargs (skip 'self' if method)
                key_args = tuple(repr(a) for a in args[1:] if len(args) > 0 and hasattr(args[0], '__class__')) or tuple(repr(a) for a in args)
                key_kwargs = tuple(sorted((k, repr(v)) for k, v in kwargs.items()))
                cache_key = (func.__name__, key_args, key_kwargs)

                cached_val = await self.get(cache_key)
                if cached_val is not None:
                    return cached_val

                result = await func(*args, **kwargs)
                await self.set(cache_key, result)
                return result
            return wrapper
        return decorator

# Global instances for key external services
weather_cache = SimpleAsyncTTLCache(maxsize=128, ttl=300) # 5 min TTL
osm_cache = SimpleAsyncTTLCache(maxsize=128, ttl=600)     # 10 min TTL
satellite_cache = SimpleAsyncTTLCache(maxsize=64, ttl=900) # 15 min TTL
