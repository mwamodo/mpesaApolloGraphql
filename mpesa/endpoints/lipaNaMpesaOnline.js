module.exports = async function (senderMsisdn, amount, callbackUrl, accountRef, transactionDesc = 'Lipa na mpesa online', transactionType = 'CustomerPayBillOnline', shortCode = null, passKey = null) {

  const _shortCode = shortCode || this.configs.lipaNaMpesaShortCode
  const _passKey = passKey || this.configs.lipaNaMpesaShortPass
  const timeStamp = (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const password = Buffer.from(`${_shortCode}${_passKey}${timeStamp}`).toString('base64')
  const req = await this.request()

  return req.post('/mpesa/stkpush/v1/processrequest', {
    'BusinessShortCode': _shortCode,
    'Password': password,
    'Timestamp': timeStamp,
    'TransactionType': transactionType,
    'Amount': amount,
    'PartyA': senderMsisdn,
    'PartyB': _shortCode,
    'PhoneNumber': senderMsisdn,
    'CallBackURL': callbackUrl,
    'AccountReference': accountRef,
    'TransactionDesc': transactionDesc
  })

}