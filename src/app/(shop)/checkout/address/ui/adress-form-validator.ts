import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección es obligatoria"),
  address2: z.string().optional(),
  zip: z.string().min(3, "Código postal inválido"),
  city: z.string().min(2, "La ciudad es obligatoria"),
  country: z.string().min(1, "Debe seleccionar un país"),
  phone: z.string().regex(/^[0-9]{8,15}$/, "Teléfono inválido (8-15 dígitos)"),
  rememberAddress: z.boolean(),
});

// Para tipado automático de los inputs
export type AddressInputs = z.infer<typeof addressSchema>;
