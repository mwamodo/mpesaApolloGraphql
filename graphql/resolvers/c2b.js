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

        if(response.data.ResponseCode === '0'){
          console.log(response.data);
          return true;
        } throw new UserInputError('Errors', "Transaction Not Complete");

      } catch (error) {
        inputError = error.response.data.errorMessage
        throw new UserInputError('Errors', { inputError });
      }
    }
  },
  // Mutation: {
  // }
}