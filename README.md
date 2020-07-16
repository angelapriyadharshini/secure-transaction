# secure-transaction

This is an api developed to detect online fraud. 

This application is published at http://secure-transaction-api.herokuapp.com/

Endpoint url: http://secure-transaction-api.herokuapp.com/api/transactions?transactionId={transactionId}&confidenceLevel={confidence}

## Prerequisites

To run this project you will need:

* node.js
* postman - for locally testing the API endpoint

### Local setup

* Clone the project from https://github.com/angelapriyadharshini/secure-transaction - git clone <repository_url>
* Open a terminal window and navigate to the project directory
* Then run > npm install
* After installing all the dependencies, run > npm start
* The app will be up and running on port 3000 - http://localhost:3000/

### To view the REST API request, 

* Open postman application
* In the url field enter > http://localhost:3000/api/transactions?transactionId={transactionId}&confidenceLevel={confidence}
* Select GET from the dropdown
* Send
* You will get the transaction details for the requested transactionId and confidenceLevel

## Testing

To run the unit test for the GET request:

* Stop the application that is already running on port 3000
* In a terminal window run > npm test
* The available test results will be displayed

## Technologies used

* nodejs - backend
* expressjs - backend framework
* awilix - dependency injection framework
* chai and mocha - testing frameworks
