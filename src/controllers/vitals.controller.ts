import { Router, Response, Request } from "express";
import { VitalsService } from "../services/vitals.service";
import {
  CreateVitalsBody,
  DeleteVitalsParams,
  GetVitalsParams,
  UpdateVitalsBody,
  UpdateVitalsParams,
} from "../schemas/vitals.schema";

export class VitalsController {
  public router: Router;
  private vitalsService: VitalsService;

  constructor() {
    this.router = Router();
    this.vitalsService = new VitalsService();
    this.configureRoutes();
  }

  public createVitalsHandler = async (
    req: Request<CreateVitalsBody>,
    res: Response
  ) => {
    try {
      const { body } = req;
      const vitals = await this.vitalsService.createVitals(body);

      res.status(200).json({
        status: "success",
        data: {
          vitals,
        },
      });
    } catch (error) {
      res.status(409).json({
        status: "failed",
        message: "Unable to create vitals.",
      });
    }
  };

  public getVitalsHandler = async (
    req: Request<GetVitalsParams>,
    res: Response
  ) => {
    const { params } = req;
    try {
      const vitals = await this.vitalsService.getVitals(params);
      if (!vitals) throw new Error();

      res.status(200).json({
        status: "success",
        data: {
          vitals,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not get vitals.",
      });
    }
  };

  public updateVitalsHandler = async (
    req: Request<UpdateVitalsParams, UpdateVitalsBody>,
    res: Response
  ) => {
    try {
      const { params, body } = req;
      const vitals = await this.vitalsService.getVitals(params);
      if (!vitals) throw new Error();

      const updatedVitals = await this.vitalsService.updateVitals(params, body);

      res.status(200).json({
        status: "success",
        data: {
          vitals: updatedVitals,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not update vitals.",
      });
    }
  };

  public deleteVitalsHandler = async (
    req: Request<DeleteVitalsParams>,
    res: Response
  ) => {
    try {
      const { params } = req;
      const vitals = await this.vitalsService.getVitals(params);
      if (!vitals) throw new Error();

      const deletedVitals = await this.vitalsService.deleteVitals(params);

      res.status(200).json({
        status: "success",
        data: {
          vitals: deletedVitals,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: "Could not delete vitals.",
      });
    }
  };

  public configureRoutes = () => {
    this.router.post("/vitals", this.createVitalsHandler);
    this.router.get("/vitals/:id", this.getVitalsHandler);
    this.router.patch("/vitals/:id", this.updateVitalsHandler);
    this.router.delete("/vitals/:id", this.deleteVitalsHandler);
  };
}
