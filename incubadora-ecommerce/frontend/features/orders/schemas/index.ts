import { z } from 'zod';

export const checkoutSchema = z.object({
  customerEmail: z.string().email('Email inválido'),
  shippingAddress: z.string().min(10, 'O endereço deve ter no mínimo 10 caracteres'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
