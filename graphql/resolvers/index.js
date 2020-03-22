const mpesaResolvers = require('./mpesa');

modules.exports = {
  Query: {
    ...mpesaResolvers.Query,
  },
  Mutation: {
    ...mpesaResolvers.Mutation,
  },
};