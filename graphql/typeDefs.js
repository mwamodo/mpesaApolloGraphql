const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    testPay(senderMsisdn: String! amount: Float!): Boolean
  }
`;