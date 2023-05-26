import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'username must be a alphanumeric character or underscore',
      })
      .min(3, { message: 'username must be at least 3 characters long' })
      .max(20, { message: 'username must be at most 20 characters long' })
      .optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    email: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password not match',
  });

export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>;
