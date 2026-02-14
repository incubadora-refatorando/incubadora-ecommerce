import { z } from 'zod';

export const checkoutSchema = z.object({
  customerEmail: z.string().email('Invalid email address'),
  shippingAddress: z.string().min(10, 'Address must be at least 10 characters'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
