const { LipaNaMpesa } = require('../../mpesa');

module.exports = {
  Query: {
    async testPay(_, { senderMsisdn, amount }) {
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
        // TODO: Check for success before returning true.
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