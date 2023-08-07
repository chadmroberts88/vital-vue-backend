import { Column, Entity, OneToMany } from "typeorm";
import { Vitals } from "./vitals.entity";
import Model from "./model.entity";

@Entity("patients")
export class Patient extends Model {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // relationships
  @OneToMany(() => Vitals, (vitals) => vitals.patientId)
  vitals: Vitals[];
}
