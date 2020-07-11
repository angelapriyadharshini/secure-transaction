module.exports = function ({ transactionService }) {

  return {

    /**
    * This function gives the transaction details for the given transactionId
    * and confidence
    *
    * @param req request from the browser
    * @param res response sent to the browser
    * 
    * @returns returns the transaction details for the requested transactionId
    * 
    * HTTP METHOD: GET
    * 
    * URL: /api/transactions?transactionId=:transactionId&confidenceLevel=:confidence
    */

    getTransactionByIdAndConfidence: (req, res, next) => {
      const transactionId = req.query.transactionId;
      const confidence = req.query.confidenceLevel;

      transactionService.getTransactionByIdAndConfidence(transactionId, confidence).then((result) => {
        res.send(result);
      }).catch(err => {
        console.log("Error occurred while retrieving transaction data ", err);
        return next(err);
      });
    }
  }
  
}
