import express from 'express'
import { addQuery, deleteQuery, getAllQuery } from '../controllers/query.js';
const router = express.Router();

router.post('/add', addQuery);
router.delete('/delete/:id', deleteQuery);
router.get('/', getAllQuery);

export default router