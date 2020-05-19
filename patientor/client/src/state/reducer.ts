import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "GET_PATIENT";
    payload: Patient;
  } | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnose[];
  } | {
    type: "ADD_ENTRY";
    payload: { id: Patient['id']; entry: Entry };
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
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "GET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: { ...state.patients[action.payload.id], entries: state.patients[action.payload.id].entries.concat(action.payload.entry) }
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};
export const setPatientList = (list: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: list };
};
export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};
export const addEntry = (id: Patient['id'], entry: Entry): Action => {
  return { type: "ADD_ENTRY", payload: { id, entry } };
};

export const getPatientDetails = (patient: Patient): Action => {
  return { type: "GET_PATIENT", payload: patient };
};
export const setDiagnosisList = (list: Diagnose[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: list };
};