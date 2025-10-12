// Decorator Pattern

// When to use:
// 1. You need to add responsibilities to individual objects dynamically and transparently
// 2. You need to add responsibilities to an object that can be withdrawn later
// 3. You want to add a few additional properties to some objects, but not all
// 4. Extending class functionality is not a viable option
// 5. You want to ensure that the system can be easily extended in the future

interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return 'Simple Coffee';
  }
}

abstract class CoffeeDecorator implements Coffee {
  protected decoratedCoffee: Coffee;

  constructor(coffee: Coffee) {
    this.decoratedCoffee = coffee;
  }

  abstract cost(): number;

  abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.decoratedCoffee.cost() + 2;
  }

  description(): string {
    return this.decoratedCoffee.description() + ', Milk';
  }
}

// Client code
export let simpleCoffee = new SimpleCoffee();
simpleCoffee = new MilkDecorator(simpleCoffee);

console.log(simpleCoffee.description()); // Simple Coffee, Milk
console.log(simpleCoffee.cost()); // 7

// Real world example:
// Ref: https://cloudaffle.com/series/structural-design-patterns/decorator-pattern-implementation/

interface ServerRequest {
  handle(request: any): void;
}

class BaseServer implements ServerRequest {
  handle(request: any): void {
    console.log(`Handling request: ${request.url}`);
  }
}

abstract class ServerRequestDecorator implements ServerRequest {
  protected decoratedServer: ServerRequest;

  constructor(server: ServerRequest) {
    this.decoratedServer = server;
  }

  abstract handle(request: any): void;
}

class LoggingMiddleware extends ServerRequestDecorator {
  handle(request: any): void {
    console.log(`Logging request: ${request.url}`);
    this.decoratedServer.handle(request);
  }
}

class AuthenticationMiddleware extends ServerRequestDecorator {
  handle(request: any): void {
    if (request.isAuthenticated) {
      console.log('User authenticated');
      this.decoratedServer.handle(request);
    } else {
      console.log('Authentication failed');
    }
  }
}

// Client code
let server: ServerRequest = new BaseServer();
server = new LoggingMiddleware(server);
server = new AuthenticationMiddleware(server);

server.handle({ isAuthenticated: false, url: 'GET /api/data' });

// Advantages:
// 1. Flexible alternative to subclassing
// 2. Functionalities can be added/removed at runtime
// 3. Promotes code reuse and reduce redundancy
// 4. Keep the code simple and clean
// 5. Follow SRP (Single Responsibility Principle) 

// Caveats:
// 1. Can result in many small objects. Can be harder to debug due to many layers of wrapping
// 2. Requires interface compatibility between the original object and the decorators
// 3. Not suitable for adding new methods or properties.
// 4. Can overkill for simple additions.
// 5. Unexpected behavior with other code
// 6. Ordering of decorators is VERY IMPORTANT!!!!!!!!!! <=== Refer to HOC in React, it make a very cumbersome component

// Use cases:
// Ref: https://cloudaffle.com/series/structural-design-patterns/decorator-pattern-application/