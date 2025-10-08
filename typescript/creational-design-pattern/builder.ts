// Builder Design Pattern
// The builder pattern is a creational design pattern that allows for the step-by-step construction of complex objects.
// It separates the construction of an object from its representation, allowing the same construction process to create different representations.

// When to use Builder Pattern:
// 1. When you need to create complex objects with many optional parameters.
// 2. When you need to create steps-by-steps objects.
// 3. When you need to avoid combination explosion of constructors, especially when you are dealing with an object that can be configured in many different ways.
// 4. When you need to construct a composite or hierarchical structure.
// 5. When you want to create immutable objects with many optional parameters.
// 6. Improve code clarity by separating the construction logic from the representation logic.

// Example implementation of Builder Pattern in TypeScript

interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
}

class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}`);
  }
}

class ConcreteBuilder implements Builder {
  private product!: Product;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product();
  }

  public setPartA(): void {
    this.product.add('PartA');
  }

  public setPartB(): void {
    this.product.add('PartB');
  }

  public setPartC(): void {
    this.product.add('PartC');
  }

  public getProduct(): Product {
    // Can you explain why we need to reset the builder here?
    // We need to reset the builder to ensure that it can be reused to create new products
    // Why?
    // Because if we don't reset, the next time we call getProduct, it will return the same product instance with the same parts
    // This would lead to unexpected behavior and bugs in the application

    // I still don't get it, can you give me an example?
    // Sure! Let's say we build a product with PartA and PartB, and then we call getProduct.
    // If we don't reset, the next time we build a product and call getProduct, it will still have PartA and PartB from the previous build.
    // This means that the new product will not be a fresh instance, but rather a continuation of the previous one, which is not what we want.
    // By resetting, we ensure that each time we call getProduct, we get a new product instance with only the parts that were added during the current build process.

    // It means that the builder can be reused to create multiple products without retaining state from previous builds.
    // This is important for maintaining the integrity and correctness of the products being created.

    // Question: Why don't we just have multiple builder instances instead of resetting?
    // Answer: While having multiple builder instances is a valid approach, it can lead to increased memory usage and complexity in managing those instances.
    // Resetting a single builder instance is often more efficient and simpler, especially when the construction process is similar for multiple products.
    // It allows for better resource management and reduces the overhead of creating and destroying multiple builder objects.

    // Question: What if I want to keep the state of the previous product?
    // Answer: If you want to keep the state of the previous product, you can create a new builder instance for each product you want to build.
    // This way, each builder instance will maintain its own state and you can have multiple products with different configurations.
    // However, this approach may lead to increased memory usage and complexity in managing those instances.
    // In most cases, resetting the builder is the preferred approach for simplicity and efficiency.

    // Question: How about recreate whole builder and director?
    // Answer: While it's possible to recreate the whole builder and director, it's usually not necessary.
    // The current implementation allows for a clean separation of concerns and reusability of the builder.
    // If you find yourself needing to recreate the builder and director frequently, it may be worth reevaluating the design.
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.setPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}

// Client code
// export const builder = new ConcreteBuilder();
// export const director = new Director();

// Real world example
// Ref: https://cloudaffle.com/series/creational-design-patterns/builder-pattern-implementation/

interface ICustomer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

class Customer implements ICustomer {
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public email: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}

interface ICustomerBuilder {
  setFirstName(firstName: string): ICustomerBuilder;
  setLastName(lastName: string): ICustomerBuilder;
  setPhoneNumber(phoneNumber: string): ICustomerBuilder;
  setEmail(email: string): ICustomerBuilder;
  build(): ICustomer;
}

class CustomerBuilder implements ICustomerBuilder {
  private firstName: string = '';
  private lastName: string = '';
  private phoneNumber: string = '';
  private email: string = '';

  public setFirstName(firstName: string): ICustomerBuilder {
    this.firstName = firstName;
    return this;
  }
  public setLastName(lastName: string): ICustomerBuilder {
    this.lastName = lastName;
    return this;
  }
  public setPhoneNumber(phoneNumber: string): ICustomerBuilder {
    this.phoneNumber = phoneNumber;
    return this;
  }
  public setEmail(email: string): ICustomerBuilder {
    this.email = email;
    return this;
  }
  public reset(): void {
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
  }
  public build(): ICustomer {
    const customer = new Customer(
      this.firstName,
      this.lastName,
      this.phoneNumber,
      this.email
    );
    this.reset();
    return customer;
  }
}

class CustomerDirector {
  private builder!: ICustomerBuilder;

  public setBuilder(builder: ICustomerBuilder): void {
    this.builder = builder;
  }

  public buildMinimalCustomer(
    firstName: string,
    lastName: string,
    email: string
  ): ICustomer {
    return this.builder
      .setFirstName(firstName)
      .setLastName(lastName)
      .setEmail(email)
      .build();
  }

  public buildFullCustomer(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string
  ): ICustomer {
    return this.builder
      .setFirstName(firstName)
      .setLastName(lastName)
      .setPhoneNumber(phoneNumber)
      .setEmail(email)
      .build();
  }
}

// Client code
export const CustomerBuilderInstance = new CustomerBuilder();
export const CustomerDirectorInstance = new CustomerDirector();

CustomerDirectorInstance.setBuilder(CustomerBuilderInstance);

export const fullCustomer = CustomerDirectorInstance.buildFullCustomer(
  'abc',
  '123',
  '123-456-7890',
  'jane.doe@example.com'
);
export const customer = CustomerDirectorInstance.buildMinimalCustomer(
  'John',
  'Doe',
  'john.doe@example.com'
);

// Advantages of Builder Pattern:
// 1. Fluent interface for object construction. Make client code more readable.
// 2. Construction logic is separated from the business logic.
// 3 Multi representation of the object. Same construction process can create different representations.
// 4. Object integrity. The builder can ensure that the object is always in a valid state.
// 5. Immutable objects. The builder can create immutable objects with many optional parameters.
// 6. Easy to extend. New features can be added easily.

// Caveats of Builder Pattern:
// 1. Complexity. The builder pattern can add complexity to the codebase. Involves additional abstraction layers and more classes
// 2. More code. The builder pattern requires more code.
// 3. Runtime errors. Lack of built-in compile-time checks for mandatory fields.
// 4. Mutability concerns. Issues handling mutable objects if not properly managed.
// 5. Refactoring burden. Changes to the product structure may require updates to the builder and director classes.
// 6. Performance issue. More steps, more computational resources.
// 7. Documentation overhead. More classes and methods to document and maintain.

// Overall, the builder pattern is a powerful design pattern that can help to create complex objects in a readable and maintainable way.
// However, it is important to weigh the advantages and caveats before deciding to use it in a project.

// Where to use Builder Pattern:
// Ref: https://cloudaffle.com/series/creational-design-patterns/where-to-use-builder-pattern/