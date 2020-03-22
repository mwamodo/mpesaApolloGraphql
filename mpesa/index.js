const axios =  require('axios');

const { oAuth, lipaNaMpesaOnline } = require('./endpoints');

class Mpesa {
  constructor(config = {}) {
    if (!config.consumerKey) throw new Error('Consumer Key is Missing')
    if (!config.consumerSecret) throw new Error('Consumer Secret is Missing')
    this.configs = { ...config }
    this.environment = config.environment === 'production' ? 'production' : 'sandbox'
    this.request = request.bind(this)
    this.baseURL = `https://${this.environment === 'production' ? 'api' : 'sandbox'}.safaricom.co.ke`
  }
  oAuth() {
    const { consumerKey, consumerSecret } = this.configs
    return oAuth.bind(this)(consumerKey, consumerSecret)
  }
  lipaNaMpesaOnline() {
    return lipaNaMpesaOnline.bind(this)(...arguments)
  }
}

const LipaNaMpesa = new Mpesa({
  consumerKey: "6YNv1oZB4r8LaFnfwjeZXtOOcuDaAkzQ", // consumerkey
  consumerSecret: "FSGnYDnDq4AWbaWX", // consumersecret
  environment: "sandbox", // production or sandbox
  shortCode: "174379", // business shortCode
  lipaNaMpesaShortCode: "174379", // headOffice number
  lipaNaMpesaShortPass: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" // passKey
});

exports.mpesaWebHook = (req, res) => {
  console.log(`---- Received M-Pesa webhook----`);
  // dump the request payload received from safaricom
  console.log(req.body);
  console.log("-------------------");
  let message = {
    ResponseCode: "00000000",
    ResponseDesc: "success"
  };
  // respond to safaricom servers with a success message
  res.json(message);
}

exports.testPay = (req, res) => {
  const senderMsisdn = req.params.PhoneNumber; // PhoneNumber
  const amount = 10; // Amount
  const callbackUrl = "https://us-central1-devsrkcreations.cloudfunctions.net/api/mpesa/hook"; // WebHook
  const accountRef = "SRK CREATIONS"; // Account Ref
  const TransactionType = "CustomerBuyGoodsOnline";
  LipaNaMpesa.lipaNaMpesaOnline(
    senderMsisdn,
    amount,
    callbackUrl,
    accountRef,
    TransactionType
  )
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

exports.Checkout = (req, res) => {
  const senderMsisdn = req.body.phone;
  const amount = req.body.amount;
  const callbackUrl = "https://us-central1-devsrkcreations.cloudfunctions.net/api/mpesa/hook";
  const accountRef = "SRK CREATIONS"; // Account Ref
  const TransactionType = "CustomerBuyGoodsOnline";

  LipaNaMpesa.lipaNaMpesaOnline(
    senderMsisdn,
    amount,
    callbackUrl,
    accountRef,
    TransactionType
  )
    .then((response) => {
      // eslint-disable-next-line promise/always-return
      if (response.data.ResponseCode === '0'){
        return res.status(200).json({
          Success: 'Check your phone. Enter your mpesa Pin To Complete Transaction'
        })
      }
    })
    .catch(err => console.error(err));
    // TODO: Send Error to angular App
}