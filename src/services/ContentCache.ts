import { CacheEntry } from "../types";

export class ContentCache {
  private static instance: ContentCache;
  private cache: Map<string, CacheEntry>;
  private accessOrder: string[]; // For LRU tracking (end is most recent)
  private readonly MAX_ENTRIES = 50;
  private readonly TTL_MS = 300000; // 5 minutes

  private hits: number;
  private misses: number;

  private constructor() {
    this.cache = new Map();
    this.accessOrder = [];
    this.hits = 0;
    this.misses = 0;
  }

  public static getInstance(): ContentCache {
    if (!ContentCache.instance) {
      ContentCache.instance = new ContentCache();
    }
    return ContentCache.instance;
  }

  public get(url: string): CacheEntry | null {
    const entry = this.cache.get(url);
    if (!entry) {
      this.misses++;
      return null;
    }

    // Check TTL
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.cache.delete(url);
      this.removeFromAccessOrder(url);
      this.misses++;
      return null;
    }

    // Update LRU access
    this.updateAccessOrder(url);
    this.hits++;
    return entry;
  }

  public set(url: string, entry: CacheEntry): void {
    if (this.cache.has(url)) {
      // Update existing
      this.cache.set(url, entry);
      this.updateAccessOrder(url);
      return;
    }

    // Evict if full
    if (this.cache.size >= this.MAX_ENTRIES) {
      const lruUrl = this.accessOrder[0]; // First item is least recently used
      if (lruUrl) {
        this.cache.delete(lruUrl);
        this.accessOrder.shift();
      }
    }

    this.cache.set(url, entry);
    this.accessOrder.push(url);
  }

  public has(url: string): boolean {
    // Also check TTL effectively
    const entry = this.cache.get(url);
    if (!entry) return false;
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.cache.delete(url);
      this.removeFromAccessOrder(url);
      return false;
    }
    return true;
  }

  public clear(): void {
    this.cache.clear();
    this.accessOrder = [];
    this.hits = 0;
    this.misses = 0;
  }

  public getStats(): { size: number; hitRate: number } {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      hitRate: total === 0 ? 0 : this.hits / total,
    };
  }

  private updateAccessOrder(url: string): void {
    this.removeFromAccessOrder(url);
    this.accessOrder.push(url);
  }

  private removeFromAccessOrder(url: string): void {
    const index = this.accessOrder.indexOf(url);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }
}
