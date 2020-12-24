import express from 'express';
import diagnoseService from '../services/diagnose-service';
import patientService from '../services/patient-service';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/ping', (_,res) => {
  res.send('pong');
});

router.get('/diagnoses', (_,res) => {
  res.json(diagnoseService.getDiagnoses());
});

router.get('/patients', (_,res) => {
  res.json(patientService.getPatients());
});

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch ({message}) {
    res.status(400).send(message);
  }
});

router.get('/patients/:id', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    res.json(patient);
  } catch ({message}) {
    res.status(400).send(message);
  }
});

export default router;
