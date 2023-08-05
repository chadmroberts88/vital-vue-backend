import { Router, Response, Request } from "express";
import { PatientService } from "../services/patient-service";

export class PatientController {
  public router: Router;
  private patientService: PatientService;

  constructor() {
    this.router = Router();
    this.patientService = new PatientService();
    this.configureRoutes();
  }

  public create = async (req: Request, res: Response) => {
    res.send(this.patientService.create());
  };

  public read = async (req: Request, res: Response) => {
    res.send(this.patientService.read());
  };

  public update = async (req: Request, res: Response) => {
    res.send(this.patientService.update());
  };

  public delete = async (req: Request, res: Response) => {
    res.send(this.patientService.delete());
  };

  public configureRoutes = () => {
    this.router.post("/", this.create);
    this.router.get("/", this.read);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  };
}
