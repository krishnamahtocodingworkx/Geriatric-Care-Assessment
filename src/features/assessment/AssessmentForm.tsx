import { useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Checkbox,
  Code,
  Container,
  Divider,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { samplePatient } from './fixtures';
import { assessmentSchema, type Assessment } from './schema';
import type { AssessmentDraft } from './type';
import { mobilityOptions } from './utils';
import classes from './AssessmentForm.module.css';

type AssessmentFormProps = {
  onSave?: (data: Assessment) => void;
};

function SectionLabel({ children }: { children: string }) {
  return <Text className={classes.sectionLabel}>{children}</Text>;
}

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [saving, setSaving] = useState(false);
  const [savedData, setSavedData] = useState<Assessment | null>(null);

  const form = useForm<AssessmentDraft>({
    mode: 'controlled',
    initialValues: {
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
    },
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const loadSamplePatient = () => {
    form.setValues(samplePatient);
    form.clearErrors();
    setSavedData(null);
  };

  const handleSubmit = async (values: AssessmentDraft) => {
    setSaving(true);
    setSavedData(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const parsed = assessmentSchema.parse(values);
      setSavedData(parsed);
      onSave?.(parsed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box className={classes.page} py={{ base: 'md', sm: 'xl' }}>
      <Container size="lg">
        <Paper className={classes.card} p={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            <div className={classes.header}>
              <Group align="flex-start" gap="md" wrap="nowrap">
                <span className={classes.brandMark} aria-hidden="true">
                  GC
                </span>
                <div>
                  <Group gap="sm" mb={4}>
                    <Title order={2}>Geriatric Care Assessment</Title>
                    <Badge variant="light" color="teal" visibleFrom="sm">
                      Home visit
                    </Badge>
                  </Group>
                  <Text c="dimmed" size="sm" maw={420}>
                    Complete the patient assessment and review all required fields before saving.
                  </Text>
                </div>
              </Group>
            </div>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="xl">
                <Stack gap="md">
                  <SectionLabel>Patient details</SectionLabel>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput
                      label="Medical record number"
                      placeholder="MRN-004821"
                      {...form.getInputProps('mrn')}
                    />
                    <TextInput label="Patient name" {...form.getInputProps('patientName')} />
                    <DateInput
                      label="Date of birth"
                      value={form.values.dateOfBirth || null}
                      onChange={(value) => form.setFieldValue('dateOfBirth', value ?? '')}
                      onBlur={() => form.validateField('dateOfBirth')}
                      error={form.errors.dateOfBirth}
                    />
                    <DateInput
                      label="Assessment date"
                      maxDate={new Date()}
                      value={form.values.assessmentDate || null}
                      onChange={(value) => form.setFieldValue('assessmentDate', value ?? '')}
                      onBlur={() => form.validateField('assessmentDate')}
                      error={form.errors.assessmentDate}
                    />
                  </SimpleGrid>
                </Stack>

                <Divider />

                <Stack gap="md">
                  <SectionLabel>Clinical assessment</SectionLabel>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Select
                      label="Mobility"
                      placeholder="Select mobility status"
                      data={mobilityOptions}
                      clearable
                      {...form.getInputProps('mobility')}
                      onChange={(value) => form.setFieldValue('mobility', value ?? '')}
                    />
                    <NumberInput
                      label="Barthel Index"
                      min={0}
                      max={100}
                      step={5}
                      allowDecimal={false}
                      clampBehavior="none"
                      value={Number.isNaN(form.values.barthelIndex) ? '' : form.values.barthelIndex}
                      onChange={(value) =>
                        form.setFieldValue(
                          'barthelIndex',
                          value === '' ? Number.NaN : Number(value)
                        )
                      }
                      onBlur={() => form.validateField('barthelIndex')}
                      error={form.errors.barthelIndex}
                    />
                    <NumberInput
                      label="Regular medications"
                      min={0}
                      max={30}
                      allowDecimal={false}
                      clampBehavior="none"
                      value={
                        Number.isNaN(form.values.medicationCount) ? '' : form.values.medicationCount
                      }
                      onChange={(value) =>
                        form.setFieldValue(
                          'medicationCount',
                          value === '' ? Number.NaN : Number(value)
                        )
                      }
                      onBlur={() => form.validateField('medicationCount')}
                      error={form.errors.medicationCount}
                    />
                    <DateInput
                      label="Next review date"
                      value={form.values.followUpDate || null}
                      onChange={(value) => form.setFieldValue('followUpDate', value ?? '')}
                      onBlur={() => form.validateField('followUpDate')}
                      error={form.errors.followUpDate}
                    />
                  </SimpleGrid>

                  <Checkbox
                    mt="xs"
                    label="Pharmacist review requested"
                    {...form.getInputProps('pharmacistReviewRequested', {
                      type: 'checkbox',
                    })}
                  />
                </Stack>

                <Divider />

                <Stack gap="md">
                  <SectionLabel>Consent</SectionLabel>
                  <Checkbox
                    label="Patient or representative has given consent"
                    {...form.getInputProps('consentObtained', {
                      type: 'checkbox',
                    })}
                  />
                </Stack>

                <div className={classes.actions}>
                  <Button type="submit" loading={saving} disabled={saving}>
                    Save assessment
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    disabled={saving}
                    onClick={loadSamplePatient}
                  >
                    Load sample patient
                  </Button>
                </div>
              </Stack>
            </form>

            {savedData && (
              <Alert color="teal" title="Assessment saved successfully" variant="light">
                <Code block>{JSON.stringify(savedData, null, 2)}</Code>
              </Alert>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
