// Template method design pattern

// The Template Method pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses.
// Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

// When to use:
// 1. Duplicated code in subclasses.
// 2. Complex conditional logic
// 3. Need to extend part of an algorithm, not all of it
// 4. Algorithm has mandatory and optional steps
// 5. Algorithm has a specific sequence of operations

abstract class CakeRecipe {
  protected preHeatOven(): void {
    console.log("Preheating the oven to 350°F (175°C).");
  }

 protected  bake(): void {
    console.log("Baking the cake for 30 minutes.");
  }

  protected coolingDown(): void {
    console.log("Cooling down the cake for 15 minutes.");
  }

  protected decorate(): void {
    console.log("Decorating the cake with frosting and toppings.");
  }

  protected abstract mixingIngredients(): void;
  
  public bakeCake(): void {
    this.preHeatOven();
    this.mixingIngredients();
    this.bake();
    this.coolingDown();
    this.decorate();
  }
}

class ChocolateCake extends CakeRecipe {
  protected decorate(): void {
    console.log("Decorating the chocolate cake with chocolate frosting and sprinkles.");
  }
   protected mixingIngredients(): void {
    console.log("Mixing the ingredients: flour, sugar, eggs, butter, and cocoa powder.");
  }
}

class VanillaCake extends CakeRecipe {
  protected mixingIngredients(): void {
    console.log("Mixing the ingredients: flour, sugar, eggs, butter, and vanilla extract.");
  }
}

// Usage
export const chocolateCake = new ChocolateCake();
chocolateCake.bakeCake();

console.log("\n");

const vanillaCake = new VanillaCake();
vanillaCake.bakeCake();

// Real world examples:

abstract class DataParser {
  private loadData(): void {
    console.log("Loading data from source.");
  }

  private validate(parsedData: any): boolean {
    console.log("Validating parsed data.");
    return true; // Assume data is valid for simplicity
  }

  private useData(parsedData: any): void {
    console.log("Using the parsed data.");
  }

  protected abstract parse(data: string): any;

  public parseData(data: string): void {
    this.loadData();
    const parsedData = this.parse(data);
    if (this.validate(parsedData)) {
      this.useData(parsedData);
    } else {
      console.log("Invalid data.");
    }
  }
}

class JSONDataParser extends DataParser {
  protected parse(data: string): any {
    console.log("Parsing data as JSON.");
    return JSON.parse(data);
  }
}

class XMLDataParser extends DataParser {
  protected parse(data: string): any {
    console.log("Parsing data as XML.");
    // For simplicity, returning a mock object
    return { mock: data };
  }
}

// Usage
const jsonData = '{"name": "John", "age": 30}';
const xmlData = '<person><name>John</name><age>30</age></person>';

const jsonParser = new JSONDataParser();
jsonParser.parseData(jsonData);

console.log("\n");

const xmlParser = new XMLDataParser();
xmlParser.parseData(xmlData);

// Advantages:
// 1. Code reuse: Common code is in the base class, reducing duplication.
// 2. Interface segregation and Dependency Inversion Principles: Client code needs to know only about the abstract class.
// 3. Encapsulation of complexities: Encapsulate complex parts of the algorithm in subclasses, provide a simple interface to the client
// 4. Control over subclasses: Controls subclasses by allowing them to add/alter parts of the algorithm, but not the whole thing or order of operations.
// 5. Extensibility: Makes the code more extensible, easy to support new variations of the algorithm by adding new subclasses without modifying existing code.

// Caveats:
// 1. Inheritance complexity: Inheritance can introduce complexity, especially in deep hierarchies.
// 2. Limited Flexibility in the Alg structure: Subclasses cannot change the order or add/remove steps of algorithm..
// 3. Risk of breaking the alg: If not properly designed, changes in the subclass can inadvertently affect the overall algorithm.
// 4. Lack of runtime flexibility: The algorithm structure is fixed at compile time, making it less flexible than composition-based patterns like Strategy.
// 5. Overuse can lead to many small classes: Overusing the pattern can lead to a proliferation of small subclasses, making the codebase harder to navigate and maintain.

// Use cases:
// Ref: https://cloudaffle.com/series/behavioral-design-patterns/template-method-application/ 