var assert = require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Transactions', () => {

  it('Should GET a transaction by the given id and confidence', (done) => {

    const transactionId = '5c868b224aafffc5fcffd9c3';
    const confidence = 0.8;
    
    chai.request('http://localhost:3000/api')
      .get(`/transactions?transactionId=${transactionId}&confidenceLevel=${confidence}`)
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Fetched transaction for the given transactionId and confidence ", result.body);
        done();
      });

  });
});