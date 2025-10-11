// Facade design pattern
// When to use:
// 1. Rampant dependencies between clients and implementation classes.
// 2. Overwhelming complexity of a subsystem.
// 3. Overexposure of inner workings of a subsystem.
// 4. Need for a layered architecture.
// 5. Need for a simplified API/interface.


class Grinder {
  grindBeans(): void {
    console.log("Grinding coffee beans...");
  }
}

class Boiler {
  boilWater(): void {
    console.log("Boiling water...");
  }
}

class Brewer {
  brewCoffee(): void {
    console.log("Brewing coffee...");
  }
}

class CoffeeMachineFacade {
  private grinder: Grinder;
  private boiler: Boiler;
  private brewer: Brewer;

  constructor(grinder: Grinder, boiler: Boiler, brewer: Brewer) {
    this.grinder = grinder;
    this.boiler = boiler;
    this.brewer = brewer;
  }

  makeCoffee(): void {
    this.grinder.grindBeans();
    this.boiler.boilWater();
    this.brewer.brewCoffee();
    console.log("Coffee is ready!");
  }
}

// Client code
const coffeeMachine = new CoffeeMachineFacade(new Grinder(), new Boiler(), new Brewer());
coffeeMachine.makeCoffee();

// Real-world examples:
// Ref: https://cloudaffle.com/series/structural-design-patterns/facade-pattern-classic-implementation/

class Amplifier {
  turnOn(): void {
    console.log("Amplifier is on");
  }

  setVolume(level: number): void {
    console.log(`Amplifier volume set to ${level}`);
  }
}

class DvdPlayer {
  turnOn(): void {
    console.log("DVD Player is on");
  }

  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }
}

class Projector {
  turnOn(): void {
    console.log("Projector is on");
  }

  setInput(dvdPlayer: DvdPlayer): void {
    console.log(`Projector input set to DvdPlayer`);
  }
}

class Lights {
  dim(level: number): void {
    console.log(`Lights dimmed to ${level}%`);
  }
}

class HomeTheaterFacade {
  private amp: Amplifier;
  private dvd: DvdPlayer;
  private projector: Projector;
  private lights: Lights;

  constructor(amp: Amplifier, dvd: DvdPlayer, projector: Projector, lights: Lights) {
    this.amp = amp;
    this.dvd = dvd;
    this.projector = projector;
    this.lights = lights;
  }

  watchMovie(movie: string, volume: number, level: number): void {
    console.log("Get ready to watch a movie...");
    this.lights.dim(level);
    this.projector.turnOn();
    this.projector.setInput(this.dvd);
    this.amp.turnOn();
    this.amp.setVolume(volume);
    this.dvd.turnOn();
    this.dvd.play(movie);
  }
}

// Client code
export const homeTheater = new HomeTheaterFacade(
  new Amplifier(),
  new DvdPlayer(),
  new Projector(),
  new Lights()
);
homeTheater.watchMovie("Inception", 10, 5);

// Advantages of Facade Pattern:
// 1. Simplifies interface for complex subsystems.
// 2. Reduces dependencies between clients and subsystems.
// 3. Promotes loose coupling.
// 4. Easier to use and understand.
// 5. Promote layering in software architecture.

// Caveats:
// 1. Over-abstraction, can lead to unnecessary complexity.
// 2. Limited flexibility, may not expose all functionalities of subsystems.
// 3. Hiding useful information, hide beneficial features of subsystems.

// Use cases:
// Ref: https://cloudaffle.com/series/structural-design-patterns/facade-pattern-applications/