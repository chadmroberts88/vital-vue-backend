import express, { Request, Response } from "express";
import { PatientController } from "./controllers/patient-controller";

export class Server {
  private app: express.Application;
  private patientController: PatientController;

  /**
   * Constructor to initialize and configure the application.
   */
  constructor() {
    this.app = express();
    this.configuration();
    this.patientController = new PatientController();
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
  public async routes() {
    this.app.use("/api/patient/", this.patientController.router);
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
