import { render } from '@test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AssessmentForm } from './AssessmentForm';
import { samplePatient } from './fixtures';

describe('AssessmentForm', () => {
  it('loads the sample patient and calls the save handler with parsed values', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(<AssessmentForm onSave={onSave} />);

    await user.click(screen.getByRole('button', { name: 'Load sample patient' }));
    await user.click(screen.getByRole('button', { name: 'Save assessment' }));

    await waitFor(
      () => {
        expect(onSave).toHaveBeenCalledWith(samplePatient);
      },
      { timeout: 2000 }
    );
  });
});
