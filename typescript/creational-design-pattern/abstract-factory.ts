// Abstract Factory Pattern
// When to use Abstract Factory Pattern:
// 1. When you need to create families of related or dependent objects without specifying their concrete classes.
// 2. When you want to provide a library of products that can be used interchangeably by clients.
// 3. When you want to enforce consistency among products created by different factories.
interface IProductA {
  operationA(): string;
}

interface IProductB {
  operationB(): string;
  combinedOperation(partner: IProductA): string;
}

interface IFactory {
  createProductA(): IProductA;
  createProductB(): IProductB;
}

class ProductA implements IProductA {
  operationA(): string {
    return 'Result of ProductA';
  }
}

class ProductB implements IProductB {
  operationB(): string {
    return 'Result of ProductB';
  }

  combinedOperation(partner: IProductA): string {
    const result = partner.operationA();
    return `ProductB combines with (${result})`;
  }
}

class Factory implements IFactory {
  createProductA(): IProductA {
    return new ProductA();
  }

  createProductB(): IProductB {
    return new ProductB();
  }
}

// Client code
export const factory: IFactory = new Factory();
export const productA: IProductA = factory.createProductA();
export const productB: IProductB = factory.createProductB();

console.log(productA.operationA()); // Output: Result of ProductA
console.log(productB.combinedOperation(productA)); // Output: ProductB combines with (Result of ProductA)
console.log(productB.operationB()); // Output: Result of ProductB

// ==========================================================
// Real world example

// Abstract Factory for creating UI components for different platforms (e.g., Windows, MacOS)

interface Button {
  render(): string;
  onClick(handler: () => void): void;
}

class WindowsButton implements Button {
  render(): string {
    return 'Rendering Windows Button';
  }
  onClick(handler: () => void): void {
    console.log('Windows Button clicked');
    handler();
  }
}

class MacOSButton implements Button {
  render(): string {
    return 'Rendering MacOS Button';
  }
  onClick(handler: () => void): void {
    console.log('MacOS Button clicked');
    handler();
  }
}

interface Checkbox {
  render(): string;
  toggle(): void;
}
class WindowsCheckbox implements Checkbox {
  constructor(private button: Button) {}
  render(): string {
    return 'Rendering Windows Checkbox';
  }
  toggle(): void {
    this.button.onClick(() => console.log('Windows checkbox action executed'));
    console.log('Windows Checkbox toggled');
  }
}

class MacOSCheckbox implements Checkbox {
  constructor(private button: Button) {}
  render(): string {
    return 'Rendering MacOS Checkbox';
  }
  toggle(): void {
    this.button.onClick(() => console.log('MacOS checkbox action executed'));
    console.log('MacOS Checkbox toggled');
  }
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(button: Button): Checkbox;
}

class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(button: Button): Checkbox {
    return new WindowsCheckbox(button);
  }
}

class MacOSFactory implements GUIFactory {
  createButton(): Button {
    return new MacOSButton();
  }
  createCheckbox(button: Button): Checkbox {
    return new MacOSCheckbox(button);
  }
}

// Client code
function renderUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox(button);

  console.log(button.render());
  button.onClick(() => console.log('Button action executed'));

  console.log(checkbox.render());
  checkbox.toggle();
}

// Usage
console.log('');
console.log('Client: Testing client code with Windows Factory:');
renderUI(new WindowsFactory());

console.log('');

console.log('Client: Testing the same client code with MacOS Factory:');
renderUI(new MacOSFactory());

// ==========================================================

// Advantages of Abstract Factory Pattern:
// 1. Consistency among products: Ensures that products created by different factories are compatible and can work together.
// 2. Avoid concrete product classes: Client code interacts only with abstract interfaces, reducing dependencies on specific implementations.
// 3. Code reusability & Swapping product families: Easily switch between different product families by changing the factory instance without modifying client code.
// 4. Single Responsibility Principle: Each factory is responsible for creating a specific family of products, adhering to the single responsibility principle.
// 5. Open/Closed Principle: New product families can be added without modifying existing client code, adhering to the open/closed principle.

// References: https://cloudaffle.com/series/creational-design-patterns/abstract-factory-implementation/#advantages-of-abstract-factory

// Caveats of Abstract Factory Pattern:
// 1. Complexity: Introduces additional layers of abstraction, which can make the code more complex and harder to understand.
// 2. Modifying product families: Adding new product families may require changes to the factory interface and all its implementations, which can be cumbersome.
// 3. Code maintenance: Maintaining multiple factory classes and product implementations can increase the maintenance burden, especially in large codebases.
// 4. Dependency: Client code becomes dependent on the abstract factory interface, which may lead to tight coupling if not managed properly.
// 5. Difficult of unit testing: Testing client code that relies on abstract factories can be challenging, as it may require creating mock factories and products.
// Ref: https://cloudaffle.com/series/creational-design-patterns/abstract-factory-criticism/

// Use cases:
// Ref: https://cloudaffle.com/series/creational-design-patterns/abstract-factory-application/