import express from 'express';
import { addMission, deleteMission, getMissions, updateMission } from '../controllers/missions.js';

const router = express.Router();


router.get('/', getMissions);



router.post('/', addMission);


router.put('/:id', updateMission);


router.delete('/:id', deleteMission);

export default router;
