import express, { Application, Request, Response } from "express";
import { PatientController } from "./controllers/patient.controller";
import { UserController } from "./controllers/user.controller";
import { VitalsController } from "./controllers/vitals.controller";

export class Server {
  private app: Application;
  private userController: UserController;
  private patientController: PatientController;
  private vitalsController: VitalsController;

  /**
   * Constructor to initialize and configure the application.
   */
  constructor() {
    this.app = express();
    this.configuration();
    this.userController = new UserController();
    this.patientController = new PatientController();
    this.vitalsController = new VitalsController();
    this.routes();
  }

  /**
   * Configures the server on the specified PORT or port 3000.
   */
  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
  }

  /**
   * Configures the routes.
   */
  public routes() {
    this.app.use("/users/", this.userController.router);
    this.app.use("/patients/", this.patientController.router);
    this.app.use("/vitals/", this.vitalsController.router);
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world!");
    });
  }

  /**
   * Starts the server.
   */
  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening on port ${this.app.get("port")}.`);
    });
  }
}
