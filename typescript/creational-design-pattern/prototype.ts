// Prototype design pattern
// The prototype pattern is a creational design pattern that allows you to create new objects by copying existing ones, known as prototypes.
// When to use Prototype Pattern:
// 1. When the cost of creating a new object is expensive, such as when it involves complex initialization or resource allocation.
// 2. When you want to avoid the overhead of creating a new object from scratch, especially if the object is large or complex.
// 3. When you want to create objects that are similar to existing ones but with slight variations.
// Ref: https://cloudaffle.com/series/creational-design-patterns/prototype-pattern/#when-to-use-the-prototype-pattern

// When to use prototype pattern and cloneDeep utility from lodash:

// Use Prototype Pattern when:
// You need control over the cloning process.
// Your objects have methods, private fields, or complex relationships.
// You want to support polymorphic cloning (e.g., subclasses)

// Use cloneDeep when:
// You just need a deep copy of a plain object or array.
// You don't care about methods, prototypes, or custom logic.

interface UserDetails {
  name: string;
  age: number;
  email: string;
}

interface Prototype {
  clone(): Prototype;
  getUserDetails(): UserDetails;
}

export class ConcretePrototype implements Prototype {
  private userDetails: UserDetails;

  constructor(userDetails: UserDetails) {
    this.userDetails = userDetails;
  }
  public clone(): Prototype {
    // Shallow copy
    const clone = Object.create(this);
    clone.userDetails = { ...this.userDetails };
    return clone;
  }

  public getUserDetails(): UserDetails {
    return this.userDetails;
  }
}

// Another example:
interface ShapeProperties {
  color: string;
  x: number;
  y: number;
}

abstract class Shape {
  public properties: ShapeProperties;

  constructor(properties: ShapeProperties) {
    this.properties = properties;
  }

  abstract clone(): Shape;
}

export class Circle extends Shape {
  public radius: number = 0;
  constructor(properties: ShapeProperties, radius: number) {
    super(properties);
    this.radius = radius;
  }

  public clone(): Shape {
    return new Circle({ ...this.properties }, this.radius);
  }
}

export class Rectangle extends Shape {
  public width: number = 0;
  public height: number = 0;
  constructor(properties: ShapeProperties, width: number, height: number) {
    super(properties);
    this.width = width;
    this.height = height;
  }

  public clone(): Shape {
    return new Rectangle({ ...this.properties }, this.width, this.height);
  }
}

// Advantages:
// 1. Avoid reference issues: By creating a new object through cloning, you avoid the pitfalls of shared references that can lead to unintended side effects when one object is modified.
// 2. Efficient object cloning: Cloning can be more efficient than creating a new object from scratch, especially if the object is complex and requires significant setup or initialization.
// 3. Simplify Object Creation: The prototype pattern simplifies the process of creating new objects by allowing you to clone existing ones, reducing the need for complex constructors or factory methods.
// 4. Runtime Flexibility: The prototype pattern allows for dynamic object creation at runtime, enabling you to create new object types without modifying existing code.

// Caveats:
// 1. Shallow vs. Deep Copy: The prototype pattern typically involves shallow copying, which means that nested objects or references within the cloned object may still point to the same memory locations as the original. This can lead to unintended side effects if the nested objects are modified. 
// 2. Complexity with Inheritance: If your objects have complex inheritance hierarchies, implementing the prototype pattern can become more complicated, as you need to ensure that the cloning process correctly handles all levels of the hierarchy.

// Use cases:
// 1. Graphics and Game Development:
// 2. Distributed systems and database:
// 3. Data Processing Pipelines
// 4. UI Development 
// Ref: https://cloudaffle.com/series/creational-design-patterns/where-to-use-prototype-pattern/