export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
  type: HealthType;
}

export type newBaseEntry = Omit<BaseEntry, "id">;
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}
export enum HealthColor {
  Healthy = "green",
  LowRisk = "blue",
  HighRisk = "yellow",
  CriticalRisk = "red",
}

export enum HealthType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export interface HealthCheckEntry extends BaseEntry {
  type: HealthType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: HealthType.OccupationalHealthcare;
  sickLeave?: SickLeave;
  employerName: string;
}

export interface HospitalEntry extends BaseEntry {
  type: HealthType.Hospital;
  discharge: Discharge;
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type newHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type newOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;
export type newHospitalEntry = Omit<HospitalEntry, "id">;
export type newEntry = newHealthCheckEntry | newOccupationalHealthcareEntry | newHospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
  type: HealthType;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
export type newPatientEntry = Omit<Patient, "id">;

