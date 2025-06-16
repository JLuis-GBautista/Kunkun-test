type UserTier = 'free' | 'premium';

interface RateLimit {
  count: number;
  lastReset: number;
}

export class RateLimiter {
  private requests = new Map<string, RateLimit>();

  private limits = {
    free: 100, // requests per hour
    premium: 1000,
  };

  private windowMs = 60 * 60 * 1000; // 1 hour in milliseconds

  isAllowed(userId: string, tier: UserTier): boolean {
    const now = Date.now();

    let userRequests = this.requests.get(userId);

    // Check if window expired
    if (!userRequests || now - userRequests.lastReset > this.windowMs) {
      userRequests = {
        count: 0,
        lastReset: now,
      };
    }

    // Check if limit exceeded
    if (userRequests.count >= this.limits[tier]) {
      return false;
    }

    userRequests.count++;
    this.requests.set(userId, userRequests);

    return true;
  }
}
