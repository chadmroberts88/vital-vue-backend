import { Repository } from "typeorm";
import { Vitals } from "../entities/vitals.entity";
import { Database } from "../utilities/database";
import {
  CreateVitalsBody,
  DeleteVitalsParams,
  GetVitalsParams,
  UpdateVitalsBody,
  UpdateVitalsParams,
} from "../schemas/vitals.schema";

export class VitalsService {
  private vitalsRepository: Repository<Vitals>;

  constructor() {
    this.vitalsRepository = Database.getRepository(Vitals);
  }

  public createVitals = async (body: CreateVitalsBody) => {
    const newVitals = this.vitalsRepository.create(body);
    return await this.vitalsRepository.save(newVitals);
  };

  public getVitals = async (params: GetVitalsParams) => {
    return await this.vitalsRepository.findOneBy({ id: params.id });
  };

  public updateVitals = async (
    params: UpdateVitalsParams,
    body: UpdateVitalsBody
  ) => {
    return await this.vitalsRepository.update(params.id, body);
  };

  public deleteVitals = async (params: DeleteVitalsParams) => {
    return await this.vitalsRepository.delete(params.id);
  };
}
