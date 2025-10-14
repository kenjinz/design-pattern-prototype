// Observer design pattern

// When to use:
// 1. Polling: When an object needs to be informed about changes in another object without continuously checking for updates.
// 2. Inefficient updates: When frequent updates to an object are inefficient or impractical, and you want to notify interested parties only when necessary.
// 3. Ineffective communication: When objects need to communicate changes without being tightly coupled, allowing for more flexible and maintainable code.
// 4. High component coupling: When you want to reduce dependencies between components, making it easier to modify or replace them independently.

interface Subject {
  addObserver(observer: StateObserver): void;
  removeObserver(observer: StateObserver): void;
  notifyObservers(): void;
}

interface StateObserver {
  update(state: number): void;
}

class ConcreteSubject implements Subject {
  private observers: StateObserver[] = []
  private state: number = 0;

  addObserver(observer: StateObserver): void {
    // Avoid adding the same observer multiple times
    if (this.observers.includes(observer)) return console.log("Observer already added.");
    this.observers.push(observer);
  }

  removeObserver(observer: StateObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) return console.log("Observer not found.");
    this.observers.splice(observerIndex, 1);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  getState(): number {
    return this.state;
  }

  setState(state: number): void {
    this.state = state;
    this.notifyObservers();
  }
}

class ConcreteObserver implements StateObserver {
  private observerState: number = 0;
  private ID: number;

  constructor(ID: number) {
    this.ID = ID;
  }

  update(state: number): void {
    this.observerState = state
    console.log(`Observer ${this.ID} updated with state: ${this.observerState}`);
  }
}

// Client code
export const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver(1);
const observer2 = new ConcreteObserver(2);

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.setState(10); // Both observers should be notified

// Real world example:
//Let's say we have a weather station that measures temperature, humidity, and pressure. 
// We have multiple display elements (e.g., Current Conditions Display, Statistics Display, Forecast Display) 
// that show these measurements. When the weather station gets new measurements, all the displays should update.

class WeatherData implements Subject {
  private observers: WeatherObserver[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  addObserver(observer: WeatherObserver): void {
    if (this.observers.includes(observer)) return console.log("Observer already added.");
    this.observers.push(observer);
  }

  removeObserver(observer: WeatherObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) return console.log("Observer not found.");
    this.observers.splice(observerIndex, 1);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }
}

interface WeatherObserver {
  update(temperature: number, humidity: number, pressure: number): void;
}

class CurrentConditionsDisplay implements WeatherObserver {
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;
  private displayName: string;
  private subject: WeatherData;

  constructor(displayName: string, subject: WeatherData) {
    this.displayName = displayName;
    this.subject = subject;
    this.subject.addObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display(): void {
    console.log(`Current conditions of ${this.displayName}: ${this.temperature}°C, ${this.humidity}% humidity, ${this.pressure} hPa`);
  }
}

// Client code
const weatherData = new WeatherData();
const currentDisplay = new CurrentConditionsDisplay("Current Conditions", weatherData);
const anotherDisplay = new CurrentConditionsDisplay("Another Display", weatherData);


// Simulate new weather measurements
weatherData.setMeasurements(25, 65, 1013);
weatherData.setMeasurements(30, 70, 1012);

weatherData.removeObserver(anotherDisplay);
weatherData.setMeasurements(28, 90, 1011);

// Advantages:
// 1. Decoupling of subject and observers: The subject and observers are loosely coupled, allowing for independent development and maintenance.
// 2. Dynamic relationships: Observers can be added or removed at runtime, providing flexibility in managing dependencies.
// 3. Broadcast communication: The subject can notify multiple observers simultaneously, making it efficient for scenarios where multiple components need to react to changes.
// 4. Scalability: The pattern can easily accommodate additional observers without modifying the subject, promoting scalability in complex systems.

// Caveats:
// 1. Unexpected Updates: Observers may receive updates they are not interested in, leading to unnecessary processing.
// 2. Debugging Difficulty: The indirect communication between subjects and observers can make it challenging to trace the flow of updates and identify issues.
// 3. Memory Leaks: If observers are not properly removed, they may continue to receive updates even when they are no longer needed, leading to memory leaks.
// 4. Ordering of updates: Pattern does not specify the order in which observers are notified, which may lead to inconsistent states if observers depend on each other.
// 5. Over-notification: Frequent updates to the subject can lead to a large number of notifications being sent to observers,  which could be inefficient and impact performance.

// Use cases:
// Ref: https://cloudaffle.com/series/behavioral-design-patterns/observer-pattern-application/