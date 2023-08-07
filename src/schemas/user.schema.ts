import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
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

export const getUserSchema = object({
  ...params,
});

export const updateUserSchema = object({
  ...params,
  body: object({
    firstName: string(),
    lastName: string(),
  }).partial(),
});

export const deleteUserSchema = object({
  ...params,
});

// Export Types
export type CreateUserBody = TypeOf<typeof createUserSchema>["body"];
export type GetUserParams = TypeOf<typeof getUserSchema>["params"];
export type UpdateUserParams = TypeOf<typeof updateUserSchema>["params"];
export type UpdateUserBody = TypeOf<typeof updateUserSchema>["body"];
export type DeleteUserParams = TypeOf<typeof deleteUserSchema>["params"];
