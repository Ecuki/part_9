import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const uniquPatient = patientService.isUnique(newPatientEntry);
        const newPatient = patientService.addPatientEntry(
            uniquPatient
        );
        res.json(newPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    try {
        const patient = patientService.findById(req.params.id);

        res.json(patient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    console.log("object");
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(req.params.id,
            newEntry
        );
        console.log(addedEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;