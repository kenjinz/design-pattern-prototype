// Command design pattern

// When to use:
// 1. Complex commands: Operation involves calling different methods on various objects.
// 2. Parameterization of objects: Specify the exact operation at runtime.
// 3. Deferred operations: Operation need to be performed later or in a different context.
// 4. Job queue: The apps need to support a queue of task that will be executed in different times.
// 5. Undo/Redo operations: The app needs to support undo/redo functionality.
// 6. Transaction behavior: Operations that can be grouped and executed as a transaction.

interface ICommand {
  execute(): void;
  undo(): void;
}

class Light {
  public turnOn(): void {
    console.log('The light is on');
  }

  public turnOff(): void {
    console.log('The light is off');
  }
}

class TurnOnCommand implements ICommand {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOn();
  }

  public undo(): void {
    this.light.turnOff();
  }
}

class TurnOffCommand implements ICommand {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOff();
  }

  public undo(): void {
    this.light.turnOn();
  }
}

class SimpleRemoteControl {
  private currentCommand: ICommand | null = null;
  private undoCommand: ICommand | null = null;
  private commandQueue: ICommand[] = [];

  public setCommand(command: ICommand): void {
    this.undoCommand = this.currentCommand;
    this.currentCommand = command;
    this.commandQueue.push(command);
  }

  public pressButton(): void {
    if (this.hasCommands()) {
      const command = this.commandQueue.shift();
      command?.execute();
    }
  }

  public pressUndo(): void {
    this.undoCommand?.execute();
  }

  public hasCommands(): boolean {
    return this.commandQueue.length > 0;
  }
}

// Usage
const light = new Light();
const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

export const remote = new SimpleRemoteControl();
remote.setCommand(turnOn);
remote.pressButton(); // The light is on

remote.setCommand(turnOff);
remote.pressButton(); // The light is off

remote.pressUndo(); // The light is on'

// Real world examples

class CreateFileCommand implements ICommand {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public execute(): void {
    console.log(`File created at ${this.path}`);
    // Actual file creation logic would go here
  }

  public undo(): void {
    console.log(`Created file at ${this.path} deleted`);
    // Actual file deletion logic would go here
  }
}

class DeleteFileCommand implements ICommand {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public execute(): void {
    console.log(`File at ${this.path} deleted`);
    // Actual file deletion logic would go here
  }

  public undo(): void {
    console.log(`Deleted file at ${this.path} is undone and restored`);
    // Actual file creation logic would go here
  }
}

class UpdateFileCommand implements ICommand {
  private path: string;
  private newContent: string;
  private oldContent: string;

  constructor(path: string, newContent: string) {
    this.path = path;
    this.newContent = newContent;
    this.oldContent = 'Old Content'; // This would be fetched from the file in a real scenario
  }

  public execute(): void {
    console.log(
      `File at ${this.path} updated with content: ${this.newContent}`
    );
    // Actual file update logic would go here
  }

  public undo(): void {
    console.log(
      `File at ${this.path} reverted to old content: ${this.oldContent}`
    );
    // Actual file revert logic would go here
  }
}

class ReadFileCommand implements ICommand {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public execute(): void {
    console.log(`Reading file at ${this.path}`);
    // Actual file reading logic would go here
  }

  public undo(): void {
    console.log(`Read operation on file at ${this.path} cannot be undone`);
    // Read operations typically don't have an undo action
  }
}

class MyFileSystem {
  private commandQueue: ICommand[] = [];

  public addCommand(command: ICommand): void {
    this.commandQueue.push(command);
  }

  public executeCommands(): void {
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift();
      command?.execute();
    }
  }

  public undoCommand(): void {
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.pop();
      command?.undo();
    }
  }

  public hasCommands(): boolean {
    return this.commandQueue.length > 0;
  }
}

// Usage
const fileSystem = new MyFileSystem();

const createFile = new CreateFileCommand('/path/to/file.txt');
const deleteFile = new DeleteFileCommand('/path/to/file.txt');
const updateFile = new UpdateFileCommand('/path/to/file.txt', 'New Content');
const readFile = new ReadFileCommand('/path/to/file.txt');

fileSystem.addCommand(createFile);
fileSystem.addCommand(readFile);
fileSystem.addCommand(updateFile);
fileSystem.addCommand(deleteFile);

// while (fileSystem.hasCommands()) {
//   fileSystem.executeCommands();
// }

fileSystem.undoCommand();

// Advantages:
// 1. Decoupling: The invoker is decoupled from the receiver, allowing for more flexible and reusable code.
// 2. Extensibility: New commands can be added without changing existing code, adhering to the Open/Closed Principle.
// 3. Complex commands: Complex commands can be encapsulated in a command object.
// 4. Undo/Redo functionality: The pattern naturally supports undo and redo operations by maintaining a history of executed commands.
// 5. Deferred and asynchronous execution: Commands can be queued and executed later or in a different threads.

// Caveats:
// 1. Overhead: The pattern can introduce additional complexity and overhead, especially for simple operations.
// 2. Dependency Management: Concrete Command classes often require careful management of dependencies on receiver objects.
// 3. Lack of direct feedback: Obtaining a result from the execution of a command can be less straightforward, as commands typically do not return values directly.
// 4. Debugging difficulties: The pattern can make debugging more challenging, as the flow of execution is less direct and involves multiple layers of abstraction.
// 5. Undo functionality complexity: Implementing undo functionality can be complex, especially for commands that modify state in non-trivial ways.

// Use cases:
// Ref: https://cloudaffle.com/series/behavioral-design-patterns/command-pattern-application/