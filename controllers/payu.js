



const PAYU_MERCHANT_KEY = 'YOUR_MERCHANT_KEY';
const PAYU_MERCHANT_SALT = 'YOUR_MERCHANT_SALT';
const PAYU_URL = 'https://secure.payu.in/_payment';


function generateHash(data) {
    const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_MERCHANT_SALT}`;
    return crypto.createHash('sha512').update(hashString).digest('hex');
}

export const payu=(req, res) => {
    const { firstname, email, phone, amount, productinfo } = req.body;
    const txnid = 'TXN' + Math.random().toString(36).substr(2, 9); 

    const paymentData = {
        key: PAYU_MERCHANT_KEY,
        txnid: txnid,
        amount: amount,
        productinfo: productinfo,
        firstname: firstname,
        email: email,
        phone: phone,
        surl: 'http://localhost:5000/success',  
        furl: 'http://localhost:5000/failure',  
        hash: ''  
    };

 
    paymentData.hash = generateHash(paymentData);

 
    res.send(`
        <html>
            <body>
                <form action="${PAYU_URL}" method="POST" id="payuForm">
                    <input type="hidden" name="key" value="${PAYU_MERCHANT_KEY}" />
                    <input type="hidden" name="txnid" value="${txnid}" />
                    <input type="hidden" name="amount" value="${amount}" />
                    <input type="hidden" name="productinfo" value="${productinfo}" />
                    <input type="hidden" name="firstname" value="${firstname}" />
                    <input type="hidden" name="email" value="${email}" />
                    <input type="hidden" name="phone" value="${phone}" />
                    <input type="hidden" name="surl" value="http://localhost:5000/success" />
                    <input type="hidden" name="furl" value="http://localhost:5000/failure" />
                    <input type="hidden" name="hash" value="${paymentData.hash}" />
                </form>
                <script type="text/javascript">
                    document.getElementById('payuForm').submit(); // Auto submit the form
                </script>
            </body>
        </html>
    `);
};



