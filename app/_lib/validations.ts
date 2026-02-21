import { z } from "zod";

export const universitySearchParamsSchema = z.object({
  query: z.string().optional(),
  country: z.string().optional(),
  location: z.string().optional(),
  minTuition: z.coerce.number().optional(),
  maxTuition: z.coerce.number().optional(),
  minRank: z.coerce.number().min(1).optional(),
  maxRank: z.coerce.number().optional(),
  minIelts: z.coerce.number().min(0).max(9).optional(),
  acceptanceRate: z.coerce.number().min(0).max(100).optional(),
  hasScholarships: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === "true" || val === true)
    .optional(),
  campusType: z.string().optional(),
  courseType: z.string().optional(),
});

export type UniversitySearchParams = z.infer<
  typeof universitySearchParamsSchema
>;
