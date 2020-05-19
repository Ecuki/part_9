import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, } from "formik";

import { TextField, SelectHealthTypeField, HealthTypeOption } from "./FormField";
import { HealthType, HealthCheckRating, newEntry } from "../types";
import { NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";


export type EntryFormValues = newEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthTypeOptions: HealthTypeOption[] = [
  { value: HealthType.Hospital, label: "Hospital" },
  { value: HealthType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: HealthType.HealthCheck, label: "Health Check" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        specialist: "",
        diagnosisCodes: [],
        description: "",
        date: "",
        type: HealthType.Hospital,
        healthCheckRating: HealthCheckRating.Healthy,
        sickLeave: { startDate: "", endDate: "" },
        employerName: "",
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === HealthType.HealthCheck) {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }

        if (values.type === HealthType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }

        if (values.type === HealthType.Hospital) {
          if (!values.discharge.date) {
            errors.discharge = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnosis={Object.values(diagnosis)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <SelectHealthTypeField
              label="Type"
              name="type"
              options={healthTypeOptions}
            />
            {console.log(values)}
            {values.type === HealthType.Hospital && <>
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </>}
            {values.type === HealthType.OccupationalHealthcare && <>
              <Field
                label="Employer Name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Sick Leave start date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="Sick Leave start date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />

            </>}
            {values.type === HealthType.HealthCheck && <>
              <Field
                label="Helth Check Rating"
                name="healthCheckRating"
                min={0}
                max={3}
                component={NumberField}
              />
            </>}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                {console.log(!dirty || !isValid)}
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
        );
      }}
    </Formik >
  );
};

export default AddEntryForm;
