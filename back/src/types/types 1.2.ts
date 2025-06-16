import { Order, OrderStatus } from './types';

// We use Order interface and OrderStatus enum from previous question
class OrderProcessingError extends Error {
  constructor(
    message: string,
    public orderId: string,
    public attemptCount: number,
  ) {
    super(message);
    this.name = 'OrderProcessingError';
  }
}

interface ProcessingResult {
  success: boolean;
  orderId: string;
  error?: Error;
  attemptCount: number;
}

interface ProcessingResult {
  success: boolean;
  orderId: string;
  error?: Error;
  attemptCount: number;
}

async function processOrder(order: Order): Promise<void> {
  if (Math.random() < 0.3) {
    // 30% chance of failure
    throw new OrderProcessingError('Processing failed', order.id, 0);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  order.status = OrderStatus.PROCESSING;
}

async function processOrderWithRetry(
  order: Order,
  maxAttempts: number = 3,
): Promise<ProcessingResult> {
  let attemptCount = 0;

  while (attemptCount < maxAttempts) {
    try {
      attemptCount++;
      await processOrder(order);
      return {
        success: true,
        orderId: order.id,
        attemptCount,
      };
    } catch (error) {
      if (attemptCount === maxAttempts) {
        return {
          success: false,
          orderId: order.id,
          error: error as Error,
          attemptCount,
        };
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attemptCount) * 1000),
      );
    }
  }

  throw new Error('Unexpected error in retry logic');
}

export async function processOrders(
  orders: Order[],
): Promise<ProcessingResult[]> {
  const batchSize = 5;
  const results: ProcessingResult[] = [];

  // Process orders in batches
  for (let i = 0; i < orders.length; i += batchSize) {
    const batch = orders.slice(i, i + batchSize);

    try {
      const batchResults = await Promise.all(
        batch.map((order) => processOrderWithRetry(order)),
      );
      results.push(...batchResults);
    } catch (error) {
      console.error(`Batch processing error: ${error}`);
    }
  }
  return results;
}
