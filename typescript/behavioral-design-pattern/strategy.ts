// Strategy design pattern
// The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.
// Strategy lets the algorithm vary independently from clients that use it.

// When to use:
// 1. Multiple conditional statements: If you find yourself using multiple conditional statements to select different behaviors based on certain conditions, the Strategy pattern can help simplify your code by encapsulating each behavior in its own class.
// 2. Prepare for the future: If your algorithms may need to change or expand, the Strategy pattern allows you to add new strategies without modifying existing code, adhering to the Open/Closed Principle.
// 3. Complex External Libraries and Frameworks: Isolate the complexity into a single class, making it easier to manage
// 4. Switching algorithms at runtime: If you need to switch between different algorithms or behaviors at runtime based on user input or other factors, the Strategy pattern provides a clean way to achieve this without cluttering your code with conditional logic.

interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Credit Card.`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal.`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Bitcoin.`);
  }
}

class ShoppingCart {
  private paymentStrategy: PaymentStrategy;
  private amount: number = 0;

  constructor(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }
  
  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  addToCart(amount: number): void {
    this.amount += amount;
  }

  checkout(): void {
    this.paymentStrategy.pay(this.amount);
    this.amount = 0; // Reset amount after payment
  }
}

// Usage
export const cart = new ShoppingCart(new CreditCardPayment());
cart.addToCart(100);
cart.addToCart(50);
cart.checkout(); // Paid 150 using Credit Card.

cart.setPaymentStrategy(new PayPalPayment());
cart.addToCart(200);
cart.checkout(); // Paid 200 using PayPal.

cart.setPaymentStrategy(new BitcoinPayment());
cart.addToCart(300);
cart.checkout(); // Paid 300 using Bitcoin.

// Real world example

interface FilterStrategy {
  apply(image: string): void;
}

class GrayScaleFilter implements FilterStrategy {
  apply(image: string): void {
    console.log(`Applying grayscale filter to ${image}`);
  }
}

class SepiaFilter implements FilterStrategy {
  apply(image: string): void {
    console.log(`Applying sepia filter to ${image}`);
  }
}

class NegativeFilter implements FilterStrategy {
  apply(image: string): void {
    console.log(`Applying negative filter to ${image}`);
  }
}

class ImageProcessor {
  private filterStrategy: FilterStrategy;

  constructor(strategy: FilterStrategy) {
    this.filterStrategy = strategy;
  }

  setFilterStrategy(strategy: FilterStrategy): void {
    this.filterStrategy = strategy;
  }

  applyFilter(image: string): void {
    this.filterStrategy.apply(image);
  }
}
// Usage
const imageProcessor = new ImageProcessor(new GrayScaleFilter());
imageProcessor.applyFilter("photo1.jpg"); // Applying grayscale filter to photo1.jpg

imageProcessor.setFilterStrategy(new SepiaFilter());
imageProcessor.applyFilter("photo2.jpg"); // Applying sepia filter to photo2.jpg

imageProcessor.setFilterStrategy(new NegativeFilter());
imageProcessor.applyFilter("photo3.jpg"); // Applying negative filter to photo3.jpg

// Advantages:
// 1. Open/Closed Principle: The Strategy pattern adheres to the Open/Closed Principle, allowing you to add new strategies without modifying existing code.
// 2. Runtime Flexibility: Strategies can be changed at runtime, providing flexibility in choosing algorithms based on context or user input.
// 3. Code Organization: It helps in organizing code by encapsulating related algorithms into separate classes, making the codebase cleaner and easier to maintain.
// 4. Avoid conditional logic: It eliminates the need for complex conditional statements, making the code more readable and maintainable.

// Caveats:
// 1. Increase complexity: Involves additional abstraction and more classes.
// 2. Inconsistent strategies: If strategies are not well-defined, it can lead to inconsistent behavior.
// 3. Dependency management: Managing multiple strategy classes can become cumbersome if not handled properly.
// 4. Discoverability: With multiple strategies, it can be challenging to identify and select the appropriate one for a specific context without proper documentation or naming conventions.

// Use cases:
// Ref: https://cloudaffle.com/series/behavioral-design-patterns/strategy-pattern-application/