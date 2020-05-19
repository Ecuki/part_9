import { DiagnoseEntry, newPatientEntry, Gender, newEntry, HealthType, HealthCheckRating, SickLeave, Discharge, newHealthCheckEntry, newOccupationalHealthcareEntry, newHospitalEntry, newBaseEntry, Entry } from './types';
export const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};
const isArray = (array: any): array is [] => {
    return Array.isArray(array);
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const isType = (param: any): param is HealthType => {
    return Object.values(HealthType).includes(param);
};
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    const stringKeys = Object.keys(HealthCheckRating).filter(x => isNaN(parseInt(x)));
    return Object.values(stringKeys).includes(param);
};

const parseString = (name: string, text: any): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${name}: ` + text);
    }
    return text;
};

const parseLatin = (latin: any): string => {
    if (latin && !isString(latin)) {
        throw new Error('Incorrect latin name: ' + latin);
    }
    return latin;
};

export const toDiagnoseEntry = (object: any): DiagnoseEntry => {
    return {
        name: parseString("name", object.name),
        latin: parseLatin(object.latin),
        code: parseString("code", object.code)
    };
};


const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorect or missing date: ${date}`);
    }
    return date;
};


const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};



export const toNewPatientEntry = (object: any): newPatientEntry => {
    const newEntryContent: newPatientEntry = {
        name: parseString("name", object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString("ssn", object.ssn),
        occupation: parseString("occupation", object.occupation),
        gender: parseGender(object.gender),
        entries: []
    };
    return newEntryContent;
};

const parseDiagnosisCodes = (codes: any): Array<string> => {
    if (codes && !isArray(codes)) {
        throw new Error('Incorrect latin name: ' + codes);
    }
    codes.map((code: any, index: number) => {
        if (!code && !isString(code)) {
            throw new Error(`Incorrect or missing diagnose code in diagnosis array: [${index}]: ` + code);
        }
        return code;
    });
    return codes;
};
const parseType = (type: any): HealthType => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
};
const parseHealthCheckType = (type: any): HealthType.HealthCheck => {
    if (type !== HealthType.HealthCheck) {
        throw new Error('Incorrect or missing health check type: ' + type);
    }
    return type;
};
const parseHospitalType = (type: any): HealthType.Hospital => {
    if (type !== HealthType.Hospital) {
        throw new Error('Incorrect or missing hospital type: ' + type);
    }
    return type;
};

const parseOccupationalHealthcareType = (type: any): HealthType.OccupationalHealthcare => {
    if (type !== HealthType.OccupationalHealthcare) {
        throw new Error('Incorrect or missing occupational healthcare type: ' + type);
    }
    return type;
};

export const isNumber = (number: any): number is number => {
    return number && !isNaN(Number(number));
};
export const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(HealthCheckRating[healthCheckRating])) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    console.log(healthCheckRating);
    return healthCheckRating;
};

const isSickLeave = (param: any): param is SickLeave => {

    return param.startDate && isDate(param.startDate) && param.endDate && isDate(param.endDate);
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    if (sickLeave && !isSickLeave(sickLeave)) {
        throw new Error('Incorrect sick leave: ' + sickLeave);
    }
    return sickLeave;
};

const isDischarge = (param: any): param is Discharge => {

    return param.date && isDate(param.date) && param.criteria && isString(param.criteria);
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect discharge: ' + discharge);
    }
    return discharge;
};

export const toNewEntry = (object: any): newEntry => {
    const newEntryContent: newBaseEntry = {
        description: parseString("description", object.description),
        date: parseDate(object.date),
        specialist: parseString("specialist", object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type: parseType(object.type),
    };

    switch (newEntryContent.type) {
        case HealthType.HealthCheck:
            const newHealthCheckEntryContent: newHealthCheckEntry = {
                ...newEntryContent,
                type: parseHealthCheckType(newEntryContent.type),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            console.log(newHealthCheckEntryContent);
            return newHealthCheckEntryContent;
        case HealthType.OccupationalHealthcare:
            const newOccupationalHealthcareEntryContent: newOccupationalHealthcareEntry = {
                ...newEntryContent,
                type: parseOccupationalHealthcareType(newEntryContent.type),
                employerName: parseString("employer name", object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
            return newOccupationalHealthcareEntryContent;
        case HealthType.Hospital:
            const newHospitalEntryContent: newHospitalEntry = {
                ...newEntryContent,
                type: parseHospitalType(newEntryContent.type),
                discharge: parseDischarge(object.discharge)
            };
            return newHospitalEntryContent;

        default:
            return assertNever(newEntryContent.type);

    }

};
export const toEntry = (object: any): Entry => {
    const { id, ...rest } = object;
    return { id, ...toNewEntry(rest) };
};