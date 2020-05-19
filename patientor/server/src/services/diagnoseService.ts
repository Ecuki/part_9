import diagnosis from '../../data/diagnosis';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
    return diagnosis;
};

const addEntry = (entry: DiagnoseEntry): DiagnoseEntry => {
    const newDiagnose = {
        ...entry
    };
    diagnosis.push(newDiagnose);
    return newDiagnose;
};

const findByCode = (code: string): DiagnoseEntry | undefined => {
    const diagnose = diagnosis.find(d => d.code === code);
    return diagnose;
};

const isUnique = (entry: DiagnoseEntry): DiagnoseEntry => {
    if (diagnosis.find(d => d.code === entry.code)) throw new Error(`Diagnose with code: ${entry.code} already exist`);
    if (diagnosis.find(d => d.name === entry.name)) throw new Error(`Diagnose with name: ${entry.name} already exist`);
    if (diagnosis.find(d => d?.latin === entry?.latin)) throw new Error(`Diagnose with latin name: ${entry.latin} already exist`);
    return entry;
};

export default {
    getEntries, addEntry, findByCode, isUnique
};