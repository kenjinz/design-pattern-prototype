// Adapter Design Pattern

// This pattern allows incompatible interfaces to work together by wrapping an existing class with a new interface.

// When to use:
// 1. Incompatible interfaces: Different system components or 3rd libraries that cannot communicate directly due to different interfaces.
// 2. Refactor legacy code: When you want to redesign a system that requires a bridge between old and new interfaces for backward compatibility.
// 3. Alternatives of multiple inheritance: A class needs to inherit behavior from multiple sources in languages that don't support multiple inheritance.
// 4. Abstract volatile classes: Encapsulate a class that is likely to change frequently, allowing the rest of the system to remain stable.

class Rectangle {
  constructor(
    private width: number,
    private height: number
  ) {}

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square {
  constructor(private side: number) {}

  getSide(): number {
    return this.side;
  }

  getArea(): number {
    return this.side * this.side;
  }
}

// Adapter to make Square compatible with Rectangle interface
class SquareToRectangleAdapter {
  constructor(private square: Square) {}

  getWidth(): number {
    return this.square.getSide();
  }

  getHeight(): number {
    return this.square.getSide();
  }

  getArea(): number {
    return this.square.getArea();
  }
}

// CLient code
export const square = new Square(5);
export const squareAdapter = new SquareToRectangleAdapter(square);

console.log(`Square Area: ${square.getArea()}`);
console.log(`Adapted Square Area: ${squareAdapter.getArea()}`);
console.log(`Adapted Square Width: ${squareAdapter.getWidth()}`);
console.log(`Adapted Square Height: ${squareAdapter.getHeight()}`);

// Real-world example

interface IMySQLDatabase {
  connectToMySQL(uri: string): void;
  executeMySQLQuery(query: string): void;
}

class MySQLDatabase implements IMySQLDatabase {
  connectToMySQL(uri: string): void {
    console.log(`Connected to MySQL Database at ${uri}`);
  }

  executeMySQLQuery(query: string): void {
    console.log(`Executing MySQL Query: ${query}`);
  }
}

class PostGreSQLDatabase {
  connectToPostgreSQL(uri: string): void {
    console.log(`Connected to PostgreSQL Database at ${uri}`);
  }

  executePostgreSQLQuery(query: string): void {
    console.log(`Executing PostgreSQL Query: ${query}`);
  }
}

class PostgresToMySQLAdapter implements IMySQLDatabase {
  constructor(private postgres: PostGreSQLDatabase) {}

  connectToMySQL(uri: string): void {
    this.postgres.connectToPostgreSQL(uri);
  }

  executeMySQLQuery(query: string): void {
    this.postgres.executePostgreSQLQuery(query);
  }
}

// Client code
const mysqlDB = new MySQLDatabase();
mysqlDB.connectToMySQL("mysql://localhost:3306/mydb");
mysqlDB.executeMySQLQuery('SELECT * FROM users');

export const postgresDB = new PostGreSQLDatabase();
const postgresAdapter = new PostgresToMySQLAdapter(postgresDB);

postgresAdapter.connectToMySQL("postgresql://localhost:5432/mydb");
postgresAdapter.executeMySQLQuery('SELECT * FROM users');

// Advantages:
// 1. Reusability and Flexibility: Allows existing classes to be reused with new interfaces without modifying their code.
// 2. Decoupling: Reduces dependencies between components with incompatible interfaces, promoting a more modular design.
// 3. Enabling interoperability: Help different parts of a system or different systems to work together seamlessly even if they have incompatible interfaces.

// Caveats:
// 1. Overuse or Unnecessary use: Can lead to extra complexity and harder to maintain code.
// 2. Performance overhead: Introducing adapters can add a layer of indirection, potentially impacting performance.
// 3. Hide the adaptee's capabilities: The adapter may not expose all functionalities of the adaptee, limiting its use in certain scenarios.
// 4. Tight coupling: The adapter can be come tightly coupled to the adaptee, making it difficult to change the adaptee without affecting the adapter.
// 5. Potential for confusion: Can confuse developers who may not be familiar with the adapter pattern, leading to misunderstandings about how the system works.

// Use cases:
// Ref: https://cloudaffle.com/series/structural-design-patterns/adapter-pattern-applications/