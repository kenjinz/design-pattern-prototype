import { Logger, Application } from "./creational-design-pattern/singleton"; 

const logger = Logger.getInstance();
// logger.log("This is a log message.");

const logger2 = Logger.getInstance();
// logger2.log("This is another log message.");

// console.log("Are both logger instances the same?", logger === logger2); // Should print true

const app = new Application();
app.run();
