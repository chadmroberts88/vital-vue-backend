import { Server } from "./src/server";
import { Database } from "./src/utilities/database";

Database.initialize()
  .then(() => {
    const server = new Server();
    server.start();
  })
  .catch((error) => {
    console.log("Error initalizing database:");
    console.log(error);
  });
