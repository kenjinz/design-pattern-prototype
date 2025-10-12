// Composite design pattern

// When to use:
// 1. Representing Part-Whole Hierarchies: It's particularly useful when you want to treat the part and whole in the same way
// 2. When you want to perform operations on a collection of objects the same way you’d perform them on individual objects.
// 3. The structure of objects forms a tree-like pattern
// 4. You want clients to be able to ignore the difference between compositions of objects and individual objects
interface Employee {
  getName(): string;
  getSalary(): number;
  getRole(): string;
}

class Developer implements Employee {
  constructor(
    private name: string,
    private salary: number,
  ) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return "Developer";
  }
}

class Designer implements Employee {
  constructor(
    private name: string,
    private salary: number,
  ) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return "Designer";
  }
}

interface CompositeEmployee extends Employee {
  addEmployee(employee: Employee): void;
  removeEmployee(employee: Employee): void;
  getEmployees(): Employee[];
}

class Manager implements CompositeEmployee {
  private employees: Employee[] = [];

  constructor(
    private name: string,
    private salary: number,
  ) {}

  getName(): string {
    return this.name;
  }
  
  getSalary(): number {
    return this.salary;
  }
  getRole(): string {
    return "Manager";
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(employee: Employee): void {
    const index = this.employees.indexOf(employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }

  getEmployees(): Employee[] {
    return this.employees;
  }
}

// Client code
export const dev = new Developer("Alice", 70000);
const dev2 = new Developer("Alice_2", 70000);
const designer = new Designer("Bob", 65000);
const manager = new Manager("Charlie", 90000);

manager.addEmployee(dev);
manager.addEmployee(dev2);
manager.addEmployee(designer);

console.log(manager)

// Real world examples:
// 1. File Systems: Files and directories can be represented using the composite pattern. A directory can contain files and other directories, and both files and directories can be treated uniformly.
// Ref: https://cloudaffle.com/series/structural-design-patterns/composite-pattern-implementation/

interface FileSystemComponent {
  getName(): string;
  getSize(): number;
}

class File implements FileSystemComponent {
  constructor(
    private name: string,
    private size: number,
  ) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }
}

interface CompositeFileSystemComponent extends FileSystemComponent {
  addComponent(component: FileSystemComponent): void;
  removeComponent(component: FileSystemComponent): void;
  getComponents(): FileSystemComponent[];
}

class Folder implements CompositeFileSystemComponent {
  private components: FileSystemComponent[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.components.reduce((total, component) => total + component.getSize(), 0);
  }

  addComponent(component: FileSystemComponent): void {
    this.components.push(component);
  }

  removeComponent(component: FileSystemComponent): void {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  getComponents(): FileSystemComponent[] {
    return this.components;
  }
}

// Client code
const file1 = new File("file1.txt", 100);
const file2 = new File("file2.txt", 200);
const folder1 = new Folder("folder1");
const folder2 = new Folder("folder2");

folder1.addComponent(file1);
folder1.addComponent(file2);
folder2.addComponent(folder1);

console.log('folder 1: ', folder1)
console.log('folder 2: ', folder2)

// Advantages:
// 1. Simplifies Client Code: Clients can treat individual objects and compositions uniformly, simplifying code that interacts with these objects.
// 2. Flexibility: New types of components can be added without changing existing code, adhering to the Open/Closed Principle.
// 3. Hierarchical Structures: It naturally represents hierarchical structures, making it easier to manage complex relationships.

// Caveats
// 1. Can violate the Single Responsibility Principle: Components may have multiple responsibilities, such as managing children and performing operations.
// 2. Difficult to restrict types of components: It can be challenging to enforce that certain components can only contain specific types of children.
// 3. Difficulty in restricting components of the composite structure: Clients may inadvertently add inappropriate components to a composite.
// 4. Indirect coupling: The composite pattern can introduce indirect coupling between components, making it harder to understand the relationships between them.

// Use cases:
// Ref: https://cloudaffle.com/series/structural-design-patterns/composite-pattern-application/