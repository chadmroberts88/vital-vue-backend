import { number, object, string, TypeOf } from "zod";

export const createVitalsSchema = object({
  body: object({
    patientId: string({
      required_error: "A patient id is required.",
    }),
    systolicBp: number(),
    diastolicBp: number(),
    pulse: number(),
    respirations: number(),
    specificOxygen: number(),
  }),
});

const params = {
  params: object({
    id: string(),
  }),
};

export const getVitalsSchema = object({
  ...params,
});

export const updateVitalsSchema = object({
  ...params,
  body: object({
    systolicBp: number(),
    diastolicBp: number(),
    pulse: number(),
    respirations: number(),
    specificOxygen: number(),
  }).partial(),
});

export const deleteVitalsSchema = object({
  ...params,
});

// Export Types
export type CreateVitalsBody = TypeOf<typeof createVitalsSchema>["body"];
export type GetVitalsParams = TypeOf<typeof getVitalsSchema>["params"];
export type UpdateVitalsParams = TypeOf<typeof updateVitalsSchema>["params"];
export type UpdateVitalsBody = TypeOf<typeof updateVitalsSchema>["body"];
export type DeleteVitalsParams = TypeOf<typeof deleteVitalsSchema>["params"];
