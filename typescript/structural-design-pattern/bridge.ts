// Bridge design pattern

// When to use:
// 1. When you want to hide implementation details from the client.
// 2. When you want to switch between different implementations at runtime.
// 3. It is suitable when you have a static structure but want to change the implementation dynamically.
interface MediaPlayerImplementation {
  playAudio(): void;
  playVideo(): void;
} 

class WindowsMediaPlayer implements MediaPlayerImplementation {
  playAudio(): void {
    console.log("Playing audio on Windows Media Player");
  }

  playVideo(): void {
    console.log("Playing video on Windows Media Player");
  }
}

class MacOsMediaPlayer implements MediaPlayerImplementation {
  playAudio(): void {
    console.log("Playing audio on MacOS Media Player");
  }
  
  playVideo(): void {
    console.log("Playing video on MacOS Media Player");
  }
}

abstract class MediaPlayerAbstraction {
  protected implementation: MediaPlayerImplementation;

  constructor(implementation: MediaPlayerImplementation) {
    this.implementation = implementation;
  }

 abstract playFile(): void;
}

class AudioPlayer extends MediaPlayerAbstraction {
  playFile(): void {
    this.implementation.playAudio();
  }
}

class VideoPlayer extends MediaPlayerAbstraction {
  playFile(): void {
    this.implementation.playVideo();
  }
}

export const windowAudioPlayer = new AudioPlayer(new WindowsMediaPlayer());
windowAudioPlayer.playFile(); // Output: Playing audio on Windows Media Player

const macOsVideoPlayer = new VideoPlayer(new MacOsMediaPlayer());
macOsVideoPlayer.playFile(); // Output: Playing video on MacOS Media Player

// Real world examples:
// ref: https://cloudaffle.com/series/structural-design-patterns/bridge-pattern-implementation/

interface Database {
  connect(): void;
  query(sql: string): void;
  close(): void;
}

class MySQLDatabase implements Database {
  connect(): void {
    console.log("Connecting to MySQL database...");
  }

  query(sql: string): void {
    console.log(`Executing query on MySQL database: ${sql}`);
  }

  close(): void {
    console.log("Closing MySQL database connection.");
  }
}

class PostgreSQLDatabase implements Database {
  connect(): void {
    console.log("Connecting to PostgreSQL database...");
  }

  query(sql: string): void {
    console.log(`Executing query on PostgreSQL database: ${sql}`);
  }

  close(): void {
    console.log("Closing PostgreSQL database connection.");
  }
}

abstract class DatabaseAbstraction {
  protected database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  abstract fetchData(sql: string): void;
}

class ClientDatabase extends DatabaseAbstraction {
  fetchData(sql: string): void {
    this.database.connect();
    this.database.query(sql);
    this.database.close();
  }
}

const mySQLClient = new ClientDatabase(new MySQLDatabase());
mySQLClient.fetchData("SELECT * FROM users;");
// Output:
// Connecting to MySQL database...
// Executing query on MySQL database: SELECT * FROM users;
// Closing MySQL database connection.

const postgreSQLClient = new ClientDatabase(new PostgreSQLDatabase());
postgreSQLClient.fetchData("SELECT * FROM orders;");
// Output:
// Connecting to PostgreSQL database...
// Executing query on PostgreSQL database: SELECT * FROM orders;
// Closing PostgreSQL database connection.


// Advantages:
// 1. Decoupling: The bridge pattern decouples the abstraction from its implementation, allowing them to vary independently.
// 2. Improved maintainability: Changes in the implementation do not affect the abstraction, leading to better maintainability of the codebase.
// 3. Runtime binding: The bridge pattern allows for dynamic switching of implementations at runtime, providing flexibility in choosing different implementations based on the context.

// Caveats:
// 1. Over-engineering: The bridge pattern can introduce unnecessary complexity if your system is simple and stable.
// 2. Design difficulty: Designing the abstraction and implementation layers can be challenging, especially if the requirements are not well-defined.

// Use cases:
// ref: https://cloudaffle.com/series/structural-design-patterns/bridge-pattern-application/