// Factory design pattern
// Ref: https://cloudaffle.com/series/creational-design-patterns/factory-pattern/

// When to use Factory Pattern:
// 1. Uncertain object types at runtime.
// 2. Similar classes with shared interfaces.

abstract class Car {
  public model: string;
  public productionYear: number;

  constructor(model: string, productionYear: number) {
    this.model = model;
    this.productionYear = productionYear;
  }

  abstract displayInfo(): void;
}

class Sedan extends Car {
  constructor(model: string, productionYear: number) {
    super(model, productionYear);
  }

  displayInfo(): void {
    console.log(`Sedan Model: ${this.model}, Year: ${this.productionYear}`);
  }
}

class SUV extends Car {
  constructor(model: string, productionYear: number) {
    super(model, productionYear);
  }

  displayInfo(): void {
    console.log(`SUV Model: ${this.model}, Year: ${this.productionYear}`);
  }
}

class Hatchback extends Car {
  constructor(model: string, productionYear: number) {
    super(model, productionYear);
  }

  displayInfo(): void {
    console.log(`Hatchback Model: ${this.model}, Year: ${this.productionYear}`);
  }
}

class CarFactory {
  public static createCar(
    type: 'sedan' | 'suv' | 'hatchback',
    model: string,
    productionYear: number
  ): Car {
    switch (type.toLowerCase()) {
      case 'sedan':
        return new Sedan(model, productionYear);
      case 'suv':
        return new SUV(model, productionYear);
      case 'hatchback':
        return new Hatchback(model, productionYear);
      default:
        throw new Error('Invalid car type');
    }
  }
}

// Example usage:
export const sedan = CarFactory.createCar('sedan', 'Toyota Camry', 2020);
export const suv = CarFactory.createCar('suv', 'Honda CR-V', 2021);
export const hatchback = CarFactory.createCar('hatchback', 'Volkswagen Golf', 2019);

sedan.displayInfo(); // Sedan Model: Toyota Camry, Year: 2020
suv.displayInfo(); // SUV Model: Honda CR-V, Year: 2021
hatchback.displayInfo(); // Hatchback Model: Volkswagen Golf, Year: 2019

// Real-world example: Payment processing system

abstract class PaymentProcessor {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  abstract processPayment(): void;
}

class PayPalProcessor extends PaymentProcessor {
  constructor(amount: number) {
    super(amount);
  }

  processPayment(): void {
    console.log(`Processing PayPal payment of $${this.amount}`);
  }
}

class StripeProcessor extends PaymentProcessor {
  constructor(amount: number) {
    super(amount);
  }

  processPayment(): void {
    console.log(`Processing Stripe payment of $${this.amount}`);
  }
}

class BankTransferProcessor extends PaymentProcessor {
  constructor(amount: number) {
    super(amount);
  }

  processPayment(): void {
    console.log(`Processing Bank Transfer payment of $${this.amount}`);
  }
}
type PaymentType = 'paypal' | 'stripe' | 'banktransfer';

class PaymentProcessorFactory {
  public static createProcessor(type: PaymentType, amount: number): PaymentProcessor {
    switch (type.toLowerCase()) {
      case 'paypal':
        return new PayPalProcessor(amount);
      case 'stripe':
        return new StripeProcessor(amount);
      case 'banktransfer':
        return new BankTransferProcessor(amount);
      default:
        throw new Error('Invalid payment processor type');
    }
  }
}

// Example usage:
export const paypalPayment = PaymentProcessorFactory.createProcessor('paypal', 100);
export const stripePayment = PaymentProcessorFactory.createProcessor('stripe', 200);
export const bankTransferPayment = PaymentProcessorFactory.createProcessor('banktransfer', 300);

paypalPayment.processPayment(); // Processing PayPal payment of $100
stripePayment.processPayment(); // Processing Stripe payment of $200
bankTransferPayment.processPayment(); // Processing Bank Transfer payment of $300

// Advantages of Factory Pattern:
// 1. Decoupling object creation from usage.
// 2. Flexibility in adding new types without modifying existing code.
// 3. Encapsulation of object creation logic.

// Caveats:
// 1. Increased complexity with many classes.
// 2. Refactoring challenges if constructors change.
// 3. Hidden types, actual object types can be obscured.
// 4. Increased number of classes and files, leading to potential maintenance overhead.
// 5. Testing complexity, as factories may require additional setup for unit tests.

// Some use cases:
// Ref: https://cloudaffle.com/series/creational-design-patterns/where-to-use-factory-pattern/