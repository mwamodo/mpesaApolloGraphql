const { UserInputError } = require('apollo-server');
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
        console.log(response.data);
        // TODO: Check for success before returning true.
        return true;
      } catch (error) {
        inputError = error.response.data.errorMessage
        throw new UserInputError('Errors', { inputError });
      }
    }
  },
  // Mutation: {
  // }
}