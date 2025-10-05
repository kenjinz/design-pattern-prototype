// Singleton Design Pattern
// The singleton pattern is a creational design pattern that ensures a class has only one instance and provides a global point of access to it.
// When to use Singleton Pattern:
// 1. When you need to control access to a shared resource, such as a database or a file.
// 2. When you want to ensure that a class has only one instance and provide a global point of access to it.
// 3. When you want to manage shared state across an application without using global variables.

export class Singleton {
  private static instance: Singleton;
  private static _value: number;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public get value(): number {
    return Singleton._value;
  }

  public set value(val: number) {
    Singleton._value = val;
  }
}

// ==========================================================

// Singleton Logger class
// Log method with timestamp

export class Logger {
  private static instance: Logger;

  private constructor() {}
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date().toLocaleString();
    console.log(`[LOG] [${timestamp}]: ${message}`);
  }
}

export class Application {
  private logger: Logger;

  constructor() {
    // First caveat of singleton pattern: It creates a singleton instance of Logger => It makes the application class dependent on Logger class => Tight coupling => Difficult to test and maintain
    this.logger = Logger.getInstance();
  }

  public run(): void {
    this.logger.log('Application is running.');
    this.logger.log('Application is shutting down.');
  }
}

// Advantages of Singleton Pattern:
// 1. Controlled access to the sole instance.
// 2. Reduced namespace pollution.
// 3. Permits refinement of operations and representation.
// 4. Allows a variable number of instances.
// 5. More flexible than class methods.

// References: https://cloudaffle.com/series/creational-design-patterns/singleton-real-world-application/#why-do-we-need-a-singleton-here

// ==========================================================
// Caveats of Singleton Pattern:
// 1. Global state: Singletons can introduce global state into an application, making it harder to understand and maintain => Increase coupling.
// 2. Testing challenges: Singletons can make unit testing difficult, as they can introduce hidden dependencies and make it hard to isolate tests.
// 3. Concurrency issues: In multi-threaded applications, care must be taken to ensure that the singleton instance is created in a thread-safe manner.
// 4. Subclassing limitations: Singletons can be difficult to subclass, as the constructor is typically private.
// 5. Memory management: Managing the lifecycle of a singleton can be tricky, especially if it holds resources that need to be released or cleaned up.
// 6. Hidden dependencies: Singletons can create hidden dependencies in code, making it harder to track how different parts of an application interact with each other.

// References: https://cloudaffle.com/series/creational-design-patterns/singleton-criticism/

// ==========================================================
// Use cases of Singleton Pattern: Reference: https://cloudaffle.com/series/creational-design-patterns/where-to-use-singleton/
// 1. Caching: A caching mechanism that stores frequently accessed data in memory and provides a single point of access for retrieving cached data.
// 2. Logging: A logging class that provides a single point of access for logging messages throughout an application.
// 3. Configuration Management: A configuration manager that loads and provides access to application settings and configurations.
// 4. Database Connection Pooling: A database connection pool that manages a pool of database connections and provides a single point of access for acquiring and releasing connections.
// 5. Thread Pooling: A thread pool manager that manages a pool of threads and provides a single point of access for acquiring and releasing threads.
// 6. Resource Management: A resource manager that manages shared resources, such as file handles or network connections, and provides a single point of access for acquiring and releasing resources.
// 7. Application State Management: An application state manager that maintains the state of an application and provides a single point of access for accessing and modifying the state