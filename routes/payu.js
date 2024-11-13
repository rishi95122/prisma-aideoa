import { Router } from 'express';
import { createPaymentRequest, handlePayUResponse } from '../controllers/payuController.js';

const router = Router();

router.post('/pay', createPaymentRequest);

// Success and Failure URLs
router.post('/success', handlePayUResponse);
router.post('/failure', handlePayUResponse);

export default router;
