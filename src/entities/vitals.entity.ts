import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Patient } from "./patient.entity";

@Entity("vitals")
export class Vitals extends Model {
  @Column()
  patientId: string;

  @Column({ nullable: true })
  systolicBp: number | null;

  @Column({ nullable: true })
  diastolicBp: number | null;

  @Column({ nullable: true })
  pulse: number | null;

  @Column({ nullable: true })
  respirations: number | null;

  @Column({ nullable: true })
  specificOxygen: number | null;

  // Relationships
  @ManyToOne(() => Patient, (patient) => patient.vitals)
  @JoinColumn()
  patient: Patient;
}
