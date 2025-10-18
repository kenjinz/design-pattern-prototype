// Chain of responsibility Pattern

// When to use:
// 1. Coupling: High coupling between sender and receiver of requests
// 2. Multiple conditionals: Numerous conditionals to determine processing
// 3. Varying Processing logic: Frequent changes in processing logic
// 4. Uncertain processing path: Processing path determined at runtime
// 5. Code duplication: Similar code doing part of processing
// 6. Sequential processing required: Task should be processed sequentially by multiple handlers

interface RequestHandler {
  setNext(handler: RequestHandler): RequestHandler;
  handle(request: string): string | null;
}

abstract class AbstractRequestHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  public setNext(handler: RequestHandler): RequestHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class MonkeyHandler extends AbstractRequestHandler {
  public handle(request: string): string | null {
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}.\n`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractRequestHandler {
  public handle(request: string): string | null {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.\n`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractRequestHandler {
  public handle(request: string): string | null {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.\n`;
    }
    return super.handle(request);
  }
}

// Client code
export function clientCode(handler: RequestHandler) {
  const food = ['Nut', 'Banana', 'Cup of coffee', 'MeatBall'];

  for (const f of food) {
    console.log(`Client: Who wants a ${f}?`);
    const result = handler.handle(f);
    if (!result) {
      console.log(`${f} was left untouched.\n`);
    } else {
      console.log(result);
    }
  }
}

// Setting up the chain of responsibility
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

// Running the client code
clientCode(monkey);


// Real work examples: 
interface Order {
  isValid() : boolean;
  applyDiscount() : void;
  processPayment() : boolean;
  ship() : void;
}

interface Handler {
  setNext(handler: Handler): Handler;
  handle(order: Order): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(order: Order): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(order);
    }
    return null;
  }
}

class ValidationHandler extends AbstractHandler {
  public handle(order: Order): string | null {
    if (!order.isValid()) {
      return 'Order validation failed.';
    }
    return super.handle(order);
  }
}

class DiscountHandler extends AbstractHandler {
  public handle(order: Order): string | null {
    order.applyDiscount();
    return super.handle(order);
  }
}

class PaymentHandler extends AbstractHandler {
  public handle(order: Order): string | null {
    if (!order.processPayment()) {
      return 'Payment processing failed.';
    }
    return super.handle(order);
  }
}

class ShippingHandler extends AbstractHandler {
  public handle(order: Order): string | null {
    order.ship();
    return super.handle(order);
  }
}

// Client code
export function processOrder(order: Order) {
  const validationHandler = new ValidationHandler();
  const discountHandler = new DiscountHandler();
  const paymentHandler = new PaymentHandler();
  const shippingHandler = new ShippingHandler();

  validationHandler.setNext(discountHandler)
                   .setNext(paymentHandler)
                   .setNext(shippingHandler);

  const result = validationHandler.handle(order);
  if (result) {
    console.log(result);
  } else {
    console.log('Order processed successfully.');
  }
}

// Usage example with a mock order
class MockOrder implements Order {
  isValid(): boolean {
    return true;
  }
  applyDiscount(): void {
    console.log('Discount applied.');
  }
  processPayment(): boolean {
    return true;
  }
  ship(): void {
    console.log('Order shipped.');
  }
}

// Running the order processing
const order = new MockOrder();
processOrder(order);

// Advantages:
// 1. Decoupling senders and receivers: Sender doesn't know which object in the chain will handle the request.
// 2. Dynamic chain configuration: Chain of handlers can be configured at runtime.
// 3. Easy to add or remove responsibilities: New handlers can be added without changing existing code.
// 4. Sequential processing: Requests can be processed by multiple handlers in sequence.

// Caveats:
// 1. Overhead of handling requests
// 2. Debugging and maintenance challenges
// 3. Improper or no handling: If not configured properly, requests may go unhandled.
// 4. Adding to many responsibilities: High complexity and potential violations of SRP
// 5. Dependency on the order of handlers

// Use cases:
// Ref: https://cloudaffle.com/series/behavioral-design-patterns/chain-of-responsibility-application/