// TODO: Clean File. Take Mpesa class to another file.
const { oAuth, lipaNaMpesaOnline } = require('../mpesaEndPoints');
const { request } = require('../helpers');

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

module.exports = {
  Query: {
    async testPay() {
      // TODO: Have this as an input instead of value hard coded
      const senderMsisdn = "254705287169";
      const amount = 1; // Amount
      const callbackUrl = "https://us-central1-devsrkcreations.cloudfunctions.net/api/mpesa/hook";
      const accountRef = "Mpesa GraphQL"; // Account Ref
      const TransactionType = "CustomerBuyGoodsOnline";

      try {
        const response = await LipaNaMpesa.lipaNaMpesaOnline(
          senderMsisdn,
          amount,
          callbackUrl,
          accountRef,
          TransactionType
        )
        // TODO: Get the errors when it fails. Errors will be included on the responses
        console.log(response);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  // Mutation: {
  // }
}