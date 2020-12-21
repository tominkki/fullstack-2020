import express from 'express';
import diagnoseService from './services/diagnose-service';
import patientService from './services/patient-service';

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

router.post('/patients', (req,res) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

export default router;
