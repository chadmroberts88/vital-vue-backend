import { Router, Response, Request } from "express";
import { PatientService } from "../services/patient.service";
import {
  CreatePatientBody,
  DeletePatientParams,
  GetPatientParams,
  UpdatePatientBody,
  UpdatePatientParams,
} from "../schemas/patient.schema";

export class PatientController {
  public router: Router;
  private patientService: PatientService;

  constructor() {
    this.router = Router();
    this.patientService = new PatientService();
    this.configureRoutes();
  }

  public createPatientHandler = async (
    req: Request<CreatePatientBody>,
    res: Response
  ) => {
    try {
      const { body } = req;
      const patient = await this.patientService.createPatient(body);

      res.status(200).json({
        status: "success",
        data: {
          patient,
        },
      });
    } catch (error) {
      res.status(409).json({
        status: "failed",
        message: "Unable to create patient.",
      });
    }
  };

  public getPatientHandler = async (
    req: Request<GetPatientParams>,
    res: Response
  ) => {
    const { params } = req;
    try {
      const patient = await this.patientService.getPatient(params);
      if (!patient) throw new Error();

      res.status(200).json({
        status: "success",
        data: {
          patient,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not get patient.",
      });
    }
  };

  public updatePatientHandler = async (
    req: Request<UpdatePatientParams, UpdatePatientBody>,
    res: Response
  ) => {
    try {
      const { params, body } = req;
      const patient = await this.patientService.getPatient(params);
      if (!patient) throw new Error();

      const updatedPatient = await this.patientService.updatePatient(
        params,
        body
      );

      res.status(200).json({
        status: "success",
        data: {
          patient: updatedPatient,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not update patient.",
      });
    }
  };

  public deletePatientHandler = async (
    req: Request<DeletePatientParams>,
    res: Response
  ) => {
    try {
      const { params } = req;
      const patient = await this.patientService.getPatient(params);
      if (!patient) throw new Error();

      const deletedPatient = await this.patientService.deletePatient(params);

      res.status(200).json({
        status: "success",
        data: {
          patient: deletedPatient,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not delete patient.",
      });
    }
  };

  public configureRoutes = () => {
    this.router.post("/patients", this.createPatientHandler);
    this.router.get("/patients/:id", this.getPatientHandler);
    this.router.patch("/patients/:id", this.updatePatientHandler);
    this.router.delete("/patients/:id", this.deletePatientHandler);
  };
}
