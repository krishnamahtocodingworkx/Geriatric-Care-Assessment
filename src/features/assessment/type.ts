import type { Assessment } from './schema';

/** Form state before Zod parsing — empty strings / NaN are allowed until submit. */
export type AssessmentDraft = {
  mrn: string;
  patientName: string;
  dateOfBirth: string;
  assessmentDate: string;
  mobility: Assessment['mobility'] | '';
  barthelIndex: number;
  medicationCount: number;
  pharmacistReviewRequested: boolean;
  followUpDate: string;
  consentObtained: boolean;
};
