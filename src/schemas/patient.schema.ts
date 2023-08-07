import { object, string, TypeOf } from "zod";

export const createPatientSchema = object({
  body: object({
    firstName: string({
      required_error: "A first name is required.",
    }),
    lastName: string({
      required_error: "A last name is required.",
    }),
  }),
});

const params = {
  params: object({
    id: string(),
  }),
};

export const getPatientSchema = object({
  ...params,
});

export const updatePatientSchema = object({
  ...params,
  body: object({
    firstName: string(),
    lastName: string(),
  }).partial(),
});

export const deletePatientSchema = object({
  ...params,
});

// Export Types
export type CreatePatientBody = TypeOf<typeof createPatientSchema>["body"];
export type GetPatientParams = TypeOf<typeof getPatientSchema>["params"];
export type UpdatePatientParams = TypeOf<typeof updatePatientSchema>["params"];
export type UpdatePatientBody = TypeOf<typeof updatePatientSchema>["body"];
export type DeletePatientParams = TypeOf<typeof deletePatientSchema>["params"];
