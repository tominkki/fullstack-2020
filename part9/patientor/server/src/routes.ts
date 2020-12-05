import express from 'express';
import diagnoseService from './services/diagnose-service';

const router = express.Router();

router.get('/ping', (_,res) => {
  res.send('pong');
});

router.get('/diagnoses', (_,res) => {
  res.json(diagnoseService.getDiagnoses());
});

export default router;
