import crypto from 'crypto';

export function generatePayUHash(data, salt) {
    const { key, txnid, amount, productinfo, firstname, email } = data;
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    return crypto.createHash('sha512').update(hashString).digest('hex');
}

export function verifyPayUHash(postData, salt) {
    const { status, email, firstname, productinfo, amount, txnid, key } = postData;
    const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    return crypto.createHash('sha512').update(hashString).digest('hex');
}
