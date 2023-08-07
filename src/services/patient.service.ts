import { Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { Database } from "../utilities/database";
import {
  CreatePatientBody,
  DeletePatientParams,
  GetPatientParams,
  UpdatePatientBody,
  UpdatePatientParams,
} from "../schemas/patient.schema";

export class PatientService {
  private patientRepository: Repository<Patient>;

  constructor() {
    this.patientRepository = Database.getRepository(Patient);
  }

  public createPatient = async (body: CreatePatientBody) => {
    const newPatient = this.patientRepository.create(body);
    return await this.patientRepository.save(newPatient);
  };

  public getPatient = async (params: GetPatientParams) => {
    return await this.patientRepository.findOneBy({ id: params.id });
  };

  public updatePatient = async (
    params: UpdatePatientParams,
    body: UpdatePatientBody
  ) => {
    return await this.patientRepository.update(params.id, body);
  };

  public deletePatient = async (params: DeletePatientParams) => {
    return await this.patientRepository.delete(params.id);
  };
}
