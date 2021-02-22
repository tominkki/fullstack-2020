import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, RatingField } from '../AddPatientModal/FormField';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HealthCheckEntry, 'type' | 'id'>;

export interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healty' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' }
];

interface FormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
  
  const [{ diagnosis }] = useStateValue();
  
  return (
  <Formik
    initialValues={{
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = 'Field is required';
      const errors: { [ field: string ]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
      <Form className='form ui'>
        <Field  
          label='Description'
          placeholder='Description'
          name='description'
          component={TextField}
        />
         <Field  
          label='Date'
          placeholder='Date'
          name='date'
          component={TextField}
        />
         <Field  
          label='Specialist'
          placeholder='Specialist'
          name='specialist'
          component={TextField}
        />
        <DiagnosisSelection
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          diagnoses={Object.values(diagnosis)}
        />
        <RatingField
          label='Health Check Rating'
          name='healthCheckRating'
          options={ratingOptions}
        />
        <Grid>
          <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
      </Form>
    )}
  </Formik>
);
};

export default AddEntryForm;
