module.exports = function ({ express, transactionController }) {

  var router = express();

  // default home route 
  router.get('/', function (req, res) {
    res.send('Welcome to secure transactions!');
  })

  router.get('/transactions', transactionController.getTransactionByIdAndConfidence);

  return router;
}