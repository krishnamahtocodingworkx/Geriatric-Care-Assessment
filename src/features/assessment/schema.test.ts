import { describe, expect, it } from 'vitest';
import { samplePatient } from './fixtures';
import { assessmentSchema } from './schema';

describe('assessmentSchema', () => {
  it('accepts a patient who turns 60 on the assessment date', () => {
    const result = assessmentSchema.safeParse({
      ...samplePatient,
      dateOfBirth: '1966-08-07',
    });

    expect(result.success).toBe(true);
  });

  it('rejects a patient one day short of 60 on the assessment date', () => {
    const result = assessmentSchema.safeParse({
      ...samplePatient,
      dateOfBirth: '1966-08-08',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path[0] === 'dateOfBirth')).toBe(true);
  });

  it('returns exactly 9 field errors for an empty form', () => {
    const result = assessmentSchema.safeParse({
      mrn: '',
      patientName: '',
      dateOfBirth: '',
      assessmentDate: '',
      mobility: '',
      barthelIndex: Number.NaN,
      medicationCount: Number.NaN,
      pharmacistReviewRequested: false,
      followUpDate: '',
      consentObtained: false,
    });

    expect(result.success).toBe(false);

    const fields = [...new Set(result.error?.issues.map((issue) => String(issue.path[0])) ?? [])];
    expect(fields).toHaveLength(9);
  });
});
