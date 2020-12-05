import data from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = data;

const getDiagnoses = (): Diagnose[] => diagnoses;

export default { getDiagnoses };
