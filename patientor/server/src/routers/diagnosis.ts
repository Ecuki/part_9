import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { toDiagnoseEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoseService.getEntries());
});

router.get('/:code', (req, res) => {
    const diagnose = res.send(diagnoseService.findByCode(req.params.code));
    if (diagnose) {
        res.send(diagnose);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newDiagnose = toDiagnoseEntry(req.body);
        const uniqueDiagnose = diagnoseService.isUnique(newDiagnose);
        const addedDiagnose = diagnoseService.addEntry(uniqueDiagnose);
        res.json(addedDiagnose);
    } catch (e) {
        res.status(400).send(e.message);
    }

});

export default router;

