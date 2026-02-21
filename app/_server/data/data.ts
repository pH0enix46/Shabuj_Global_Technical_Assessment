// // //
import {
  UniversitySearchParams,
  universitySearchParamsSchema,
} from "@/_lib/validators/validations";
import { PrismaClient } from "@prisma/client";

// Initialize a globally cached prisma instance for development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getUniversities(
  searchParams: Partial<UniversitySearchParams>,
) {
  // Validate params using zod schema
  const parsed = universitySearchParamsSchema.safeParse(searchParams);

  if (!parsed.success) {
    return { data: [], error: "Invalid search parameters", count: 0 };
  }

  const filters = parsed.data;

  // Build the Prisma "where" clause based on valid filters
  const where: Record<string, unknown> = {};

  if (filters.query) {
    where.OR = [
      { name: { contains: filters.query, mode: "insensitive" } },
      { location: { contains: filters.query, mode: "insensitive" } },
    ];
  }

  if (filters.country) {
    where.country = filters.country;
  }

  if (filters.location) {
    where.location = filters.location;
  }

  if (filters.minTuition !== undefined || filters.maxTuition !== undefined) {
    where.tuitionFee = {
      ...(filters.minTuition !== undefined ? { gte: filters.minTuition } : {}),
      ...(filters.maxTuition !== undefined ? { lte: filters.maxTuition } : {}),
    };
  }

  if (filters.minRank !== undefined || filters.maxRank !== undefined) {
    where.ranking = {
      ...(filters.minRank !== undefined ? { gte: filters.minRank } : {}),
      ...(filters.maxRank !== undefined ? { lte: filters.maxRank } : {}),
    };
  }

  if (filters.minIelts !== undefined) {
    where.minIeltsScore = { lte: filters.minIelts }; // The uni requires <= what the student has
  }

  if (filters.acceptanceRate !== undefined) {
    // If user searches for 50%, they want unis with >= 50% acceptance
    where.acceptanceRate = { gte: filters.acceptanceRate };
  }

  if (filters.hasScholarships === true) {
    where.hasScholarships = true;
  }

  if (filters.campusType) {
    where.campusType = filters.campusType;
  }

  if (filters.courseType) {
    where.courseTypes = { has: filters.courseType };
  }

  try {
    const data = await prisma.university.findMany({
      where,
      orderBy: { ranking: "asc" }, // Defaults to showing top-ranked first
    });

    // Using a separate query to get total count matching filters, for pagination/display
    const count = await prisma.university.count({ where });

    return { data, count, error: null };
  } catch (error) {
    console.error("Error fetching universities:", error);
    return { data: [], count: 0, error: "Database fetch failed" };
  }
}

export async function getFilterOptions() {
  // Aggregate common fields to populate frontend dropdowns instantly
  try {
    const countries = await prisma.university.findMany({
      select: { country: true },
      distinct: ["country"],
      orderBy: { country: "asc" },
    });

    const locations = await prisma.university.findMany({
      select: { location: true },
      distinct: ["location"],
      orderBy: { location: "asc" },
    });

    return {
      countries: countries.map((c: { country: string }) => c.country),
      locations: locations.map((l: { location: string }) => l.location),
    };
  } catch (error) {
    console.error("Failed to fetch filter options", error);
    return { countries: [], locations: [] };
  }
}
