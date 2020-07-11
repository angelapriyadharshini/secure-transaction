module.exports = function ({ fs, transactionUtils, config }) {

  const errorConfig = config.getErrorConfig();

  return {

    getTransactionByIdAndConfidence: function (transactionId, confidence) {

      // reading json file and modifying the retrieved data
      return readJsonFile().then(data => {
        const result = transactionUtils.findById(JSON.parse(data), transactionId);

        if (typeof result !== 'undefined' && result.length > 0) {
          return result;
        } else {
          throw errorConfig.E004;
        }

      }).then(transaction => {
        return transactionUtils.flatten(transaction)
      }).then(flattened => {
        return transactionUtils.filterByConfidenceLevel(flattened, confidence, transactionId)
      }).then(matchedTransaction => {
        return transactionUtils.setCombinedConnectionInfo(matchedTransaction, transactionId)
      }).catch(err => {
        return err;
      });

    }

  }

  function readJsonFile() {
    return new Promise(function (resolve, reject) {
      fs.readFile('src/resources/test-data.json', function (err, data) {
        if (err) {
          console.log('An error occurred while reading file', err);
          reject(errorConfig.E002);
        } else {
          resolve(data);
        }
      });
    });
  }
}