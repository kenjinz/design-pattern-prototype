// State design pattern

// When to use:
// 1. Large conditional or switch statements based on object state
// 2. Complex or error-prone state transitions
// 3. State-specific behavior spread out throughout the code
// 4. High coupling between state and behavior
// 5. Hard to extend code with new states

interface LightState {
  switchState(lightSwitch: LightSwitch): void;
}

class OnState implements LightState {
  public switchState(lightSwitch: LightSwitch): void {
    console.log("Turning light off.");
    lightSwitch.setState(new OffState());
  }
}

class OffState implements LightState {
  public switchState(lightSwitch: LightSwitch): void {
    console.log("Turning light on.");
    lightSwitch.setState(new OnState());
  }
}
class LightSwitch {
  private state: LightState;

  constructor(initialState: LightState) {
    this.state = initialState;
  }

  public press(): void {
    this.state.switchState(this);
  }

  public setState(state: LightState): void {
    this.state = state;
  }
}

// Usage
export const lightSwitch = new LightSwitch(new OffState());

lightSwitch.press(); // Turning light on.
lightSwitch.press(); // Turning light off.
lightSwitch.press(); // Turning light on.
lightSwitch.press(); // Turning light off.

// Real-world examples:

interface Tool {
  onMouseDown(): void;
  onMouseUp(): void;
}

class SelectionTool implements Tool {
  public onMouseDown(): void {
    console.log("On mouse down Selection Tool");
  }

  public onMouseUp(): void {
    console.log("On mouse up Selection Tool");
  }
}

class BrushTool implements Tool {
  public onMouseDown(): void {
    console.log("On mouse down Brush Tool");
  }

  public onMouseUp(): void {
    console.log("On mouse up Brush Tool");
  }
}

class EraserTool implements Tool {
  public onMouseDown(): void {
    console.log("On mouse down Eraser Tool");
  }
  
  public onMouseUp(): void {
    console.log("On mouse up Eraser Tool");
  }
}

class Canvas {
  private tool: Tool;

  constructor(initialTool: Tool) {
    this.tool = initialTool;
  }

  public setTool(tool: Tool): void {
    this.tool = tool;
  }

  public mouseDown(): void {
    this.tool.onMouseDown();
  }

  public mouseUp(): void {
    this.tool.onMouseUp();
  }
}

// Usage:
const canvas = new Canvas(new SelectionTool());
canvas.mouseDown();
canvas.mouseUp();

canvas.setTool(new BrushTool());
canvas.mouseDown();
canvas.mouseUp();

canvas.setTool(new EraserTool());
canvas.mouseDown();
canvas.mouseUp();

// Advantages:
// 1. SRP: Each state class has its own set of behavior
// 2. Open/Closed Principle: New states can be added without modifying existing code
// 3. Simplifies complex state logic
// 4. Encapsulates state-specific behavior
// 5. Dynamic state transitions

// Caveats:
// 1. Increase complexity with many state classes and a level of indirection
// 2. Overkill for simple state management
// 3. Maintain state consistency: Managing transitions and ensuring states consistency can be complex
// 4. State classes can become tightly coupled to the context
// 5. Potential higher runtime costs due to additional object creation and delegation

// Use cases:
// Ref: https://cloudaffle.com/series/behavioral-design-patterns/state-application/