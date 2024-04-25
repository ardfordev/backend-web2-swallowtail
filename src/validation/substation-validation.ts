import { ZodType, z } from "zod";

export class SubstationValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    address: z.string().min(1).max(100),
    contact: z.string().min(1).max(15),
    ip_address: z.string().min(1).max(15),
    dcc: z.string().min(1).max(15),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100),
    address: z.string().min(1).max(100),
    contact: z.string().min(1).max(15),
    ip_address: z.string().min(1).max(15),
    dcc: z.string().min(1).max(15),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    contact: z.string().min(1).optional(),
    ip_address: z.string().min(1).optional(),
    dcc: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
