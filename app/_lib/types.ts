export interface University {
  id: string;
  name: string;
  country: string;
  location: string;
  tuitionFee: number;
  ranking: number;
  establishedYear: number;
  acceptanceRate: number;
  minIeltsScore: number;
  hasScholarships: boolean;
  campusType: string;
  courseTypes: string[];
  createdAt: Date;
  updatedAt: Date;
}
