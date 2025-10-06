import { ConcretePrototype, Circle, Rectangle } from './creational-design-pattern/prototype';
let user1 = new ConcretePrototype({
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
});

let user2 = user1.clone();

let redRectangle = new Rectangle(
  { color: 'red', x: 10, y: 20 },
  100,
  50
);
let anotherRedRectangle = redRectangle.clone();
anotherRedRectangle.properties.color = 'green';
let blueCircle = new Circle({ color: 'blue', x: 15, y: 25 }, 30);
let anotherBlueCircle = blueCircle.clone();

console.log({ redRectangle, anotherRedRectangle });
console.log({ user1, user2 });