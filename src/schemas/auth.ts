import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please provide a valid email address'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
