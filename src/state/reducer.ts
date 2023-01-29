import { State } from "./state";
import { Diagnoses, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type:"SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "MODIFY_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnoses[];
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return ({
    type: "SET_PATIENT_LIST",
    payload: patientList
  });
};

export const setDiagnoses = (diagnosesList: Diagnoses[]): Action => {
  return ({
    type: "SET_DIAGNOSES",
    payload: diagnosesList
  });
};

export const addNewPatient = (newPatient: Patient): Action => {
  return ({
    type:"ADD_PATIENT",
    payload: newPatient
  });
};

export const currentPatient = (current: Patient): Action => {
  return ({
    type:"SET_PATIENT",
    payload: current
  });
};

export const modifyPatient = (updatedPatient: Patient): Action => {
  return ({
    type: "MODIFY_PATIENT",
    payload: updatedPatient
  });
};


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_PATIENT":
        return {
          ...state,
          patient: action.payload
        };
      case "MODIFY_PATIENT":
        return {
          ...state,
          patient: {
            id: action.payload.id,
            name: action.payload.name,
            dateOfBirth: action.payload.dateOfBirth,
            ssn: action.payload.ssn,
            gender: action.payload.gender,
            occupation: action.payload.occupation,
            entries: action.payload.entries
          }
        };
    default:
      return state;
  }
};
