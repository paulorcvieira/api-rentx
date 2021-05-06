import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'

import AppException from '@shared/exceptions/AppException'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  auth_pass: process.env.REDIS_PASSWORD,
  enable_offline_queue: false,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5,
  duration: 1,
})

export default async function rateLimiter(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (error) {
    throw new AppException('Too many requests.', StatusCodes.TOO_MANY_REQUESTS)
  }
}
