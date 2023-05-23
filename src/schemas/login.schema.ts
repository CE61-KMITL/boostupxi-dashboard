import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
