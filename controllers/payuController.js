import axios from 'axios';
import dotenv from 'dotenv';
import { generatePayUHash, verifyPayUHash } from '../utils/hashUtils.js';

dotenv.config();

export const createPaymentRequest = (req, res) => {
    const { firstname, email, phone, amount, productinfo } = req.body;
    const txnid = `txn_${new Date().getTime()}`; // Unique transaction ID
    const data = {
        key: process.env.PAYU_KEY,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
    };

    const hash = generatePayUHash(data, process.env.PAYU_SALT);

    const paymentData = {
        ...data,
        phone,
        surl: process.env.SUCCESS_URL,
        furl: process.env.FAILURE_URL,
        hash,
        service_provider: 'payu_paisa',
    };

    // Render the HTML form to submit the payment data to PayU
    res.render('paymentForm', { paymentData, actionURL: process.env.PAYU_BASE_URL });
};

export const handlePayUResponse = (req, res) => {
    const postData = req.body;
    const receivedHash = postData.hash;
    const expectedHash = verifyPayUHash(postData, process.env.PAYU_SALT);

    if (receivedHash === expectedHash && postData.status === 'success') {
        res.send('Payment successful! Transaction ID: ' + postData.txnid);
    } else {
        res.send('Payment failed or hash mismatch');
    }
};
