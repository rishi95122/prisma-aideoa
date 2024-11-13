import { Router } from 'express';
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../controllers/onlineTest.js';

const router = Router();


router.get('/', getQuizzes);


router.post('/', createQuiz);


router.put('/:id', updateQuiz);


router.delete('/:id', deleteQuiz);

export default router;
