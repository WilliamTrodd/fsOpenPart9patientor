import React from "react";
import {Grid, Button} from '@material-ui/core';
import {Field, Formik, Form} from "formik";
import { Entry, EntryType, HealthCheckRating } from "../types";

import {DiagnosisSelection, SelectField, TextField} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";


type EntryOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = EntryOmit<Entry, 'id'>;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({
  onSubmit,
  onCancel
}: Props) => {
  const [{diagnoses}] = useStateValue(); 
  return(

  <Formik
    initialValues={{
      description: "",
      type: EntryType.Hospital,
      date: "",
      specialist: "",
    }}
    onSubmit={onSubmit}
    validate={(values) => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      } else if(!/^\d{4}-\d{2}-\d{2}/.test(values.date)){
        errors.date = "Invalid date";
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (values.type == EntryType.Occupational && !values.employerName) {
        errors.employerName = requiredError;
      }
      return errors;
    }} 
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
      return (
        <Form className="form ui">
          <SelectField 
            name="type"
            label="Entry Type"
            options={[{value: EntryType.Hospital, label:"Hospital"}, 
                        {value: EntryType.HealthCheck, label: "Health Check"},
                        {value: EntryType.Occupational, label: "Occupational"}]}
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
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
            />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          {values.type === EntryType.Hospital
          ? <> 
          <Field 
              label="Discharge"
              placeholder="YYYY-MM-DD"
              name="discharge"
              component={TextField}    
              >
            </Field>
            <Field
            label="Discharge Comment"
            placeholder="Discharge comment"
            name="discComment"
            component={TextField}
            />
            </>
          : <></>
        }

        {values.type === EntryType.HealthCheck
        ? <SelectField
            name="healthCheckRating"
            label="Rating"
            options={[{value: HealthCheckRating.Healthy , label: "Healthy"},
                      {value: HealthCheckRating.LowRisk, label: "Low Risk"},
                      {value: HealthCheckRating.HighRisk, label: "High Risk"},
                      {value: HealthCheckRating.CriticalRisk, label: "Critical Risk"}]}
          />
        : <></>
        }

        {values.type === EntryType.Occupational
        ? <><Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Field
            label="Sick Leave Start"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStart"
            component={TextField}
          />
          <Field
            label="Sick Leave End"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEnd"
            component={TextField}
          />
            </>  
        : <></>
        }
          <Grid>
            <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                </Grid>
            <Grid item>
              <Button
                style={{
                  float:"right",
                }}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
                >
                  Add
                </Button>
            </Grid>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;