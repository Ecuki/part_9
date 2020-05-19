import patients from '../../data/patients';
import { newPatientEntry, Patient, NonSensitivePatientEntry, newEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id,
        name,
        dateOfBirth,
        gender,
        occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
};


const isUnique = (entry: newPatientEntry): newPatientEntry => {
    if (patients.find(p => p.name === entry.name)) throw new Error(`Patient with name: ${entry.name} already exist`);
    if (patients.find(p => p.ssn === entry.ssn)) throw new Error(`Patient with ssn: ${entry.ssn} already exist`);

    return entry;
};

const findById = (id: string): Patient | undefined => {

    const patient = patients.find(p => p.id === id);
    console.log(patient);
    return patient;
};

const addPatientEntry = (entry: newPatientEntry): Patient => {
    const newEntry = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newEntry);
    return newEntry;
};

const addEntry = (id: Patient["id"], entry: newEntry): Entry => {
    const newEntryContent = {
        id: uuidv4(),
        ...entry
    };

    patients.map(patient => patient.id !== id ? patient : {
        ...patient,
        entries: [...patient.entries, newEntryContent]
    });
    return newEntryContent;
};

export default {
    getEntries, addPatientEntry, getNonSensitiveEntries, isUnique, findById, addEntry
};