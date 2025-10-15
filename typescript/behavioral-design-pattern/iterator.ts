// Iterator design pattern

// When to use:
// 1. Complex navigation logic: Navigation logic of a complex data structure is intertwined with the business logic.
// 2. Multiple traversals: You need to traverse a data structure in different ways (e.g., forward, backward, filtered).
// 3. Accessing elements without exposing structure: You want to provide a way to access elements of a collection without exposing its underlying representation (e.g., array, list, tree).
// 4. Different collections with same traversal logic: You have different types of collections that need to be traversed in a similar manner.

class ArrayIterator<T> {
  private collection: T[];
  private position: number = 0;

  constructor(collection: T[]) {
    this.collection = collection;
  }

  hasNext(): boolean {
    return this.position < this.collection.length;
  }

  next(): T | null {
    const result = this.hasNext() ? this.collection[this.position] : null;
    this.position++;
    return result;

  }
}

// Client code
export const numbers = [1, 2, 3, 4, 5];
const iterator = new ArrayIterator<number>(numbers);

// while (iterator.hasNext()) {
//   console.log(iterator.next());
// }

// Real-world example
interface MyIterator<T> {
  next(): MyIteratorResult<T>;
  hasNext(): boolean;
}
interface MyIteratorResult<T> {
  value: T | null;
  done: boolean;
}

class UserIterator implements MyIterator<User> {
  private collection: UserCollection;
  private position: number = 0;

  constructor(collection: UserCollection) {
    this.collection = collection;
  }

  next(): MyIteratorResult<User> {
    if (this.hasNext()) {
      const user = this.collection.getUsers()[this.position];
      this.position++;
      return { value: user, done: false };
    } else {
      return { value: null, done: true };
    }
  }
  hasNext(): boolean {
    return this.position < this.collection.getUsers().length;
  }
}

interface Collection<T> {
  createIterator(): MyIterator<T>;
}

class UserCollection implements Collection<User> {
  private users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  createIterator(): MyIterator<User> {
    return new UserIterator(this);
  }

  getUsers(): User[] {
    return this.users;
  }
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Client code
const users = [new User("Alice"), new User("Bob"), new User("Charlie")]
const userCollection = new UserCollection(users);
const userIterator = userCollection.createIterator();

while (userIterator.hasNext()) {
  const user = userIterator.next();
  if (user.value) {
    console.log(user.value.name);
  }
}

// Advantages:
// 1. Simplifies traversal: The iterator pattern provides a simple and uniform way to traverse complex data structures without exposing their internal representation.
// 2. Supports multiple traversal strategies: Different iterators can be implemented for the same collection, allowing for various traversal strategies (e.g., forward, backward, filtered).
// 3. Allows concurrent traversal: Multiple iterators can be created for the same collection, enabling concurrent traversal without interference.
// 4. Encapsulation of internal structure: The iterator pattern encapsulates the internal structure of the collection, exposing only the necessary methods for traversal.
// 5. Uniform interface: The iterator pattern provides a consistent interface for traversing different types of collections, making it easier to work with various data structures.

// Caveats:
// 1. Increased complexity: Implementing the iterator pattern can introduce additional complexity to the codebase, especially for simple collections where direct access might suffice.
// 2. Modification during iteration: If the underlying collection is modified while an iterator is in use, it can lead to unexpected behavior or errors. Proper handling of such scenarios is necessary.
// 3. Performance considerations: Potentially expensive computation in hasNext and next methods.
// 4. Stateful iterators: Iterators maintain state (e.g., current position), which can lead to issues if not managed properly, especially in multi-threaded environments.
// 5. Memory consumption: Creating multiple iterators for large collections can lead to increased memory usage, especially if the iterators maintain significant state information.

// Use cases:
// ref: https://cloudaffle.com/series/behavioral-design-patterns/iterator-pattern-application/