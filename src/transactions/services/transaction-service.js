const fs = require('fs');
// const fileData = require('src/resources/test-data.json');


exports.getAllTransactions = function (transactionId) {
  return new Promise(function (resolve, reject) {

    fs.readFile('src/resources/test-data.json', function (err, data) {
      if (err) {
        reject(err);
        console.log('An error occured ', err);
      } else {
        // console.log(data);
        //         const data1 = fs.readFile('src/resources/test-data.json');
        // console.log(elements);
        // console.log(findById(JSON.parse(elements), transactionId));
        resolve(findById(JSON.parse(data), transactionId));
        // resolve(findById(JSON.parse(data), transactionId));
      }
    });
  });
}

exports.getTransactionById = function (transactionId) {
  return new Promise(function (resolve, reject) {
    fs.readFile('src/resources/test-data.json', 'utf8', function (err, data) {
      if (err) {
        reject(err);
        console.log('An error occured ', err);
      } else {

        // res = JSON.parse(data);
        // console.log(data);
        resolve(findById(data, transactionId));
      }
    });
  });
}
// let json = [
//   {
//       "id": "14868f1e1a39",
//       "type": "Type1",
//       "name": "Aaaaa",
//       "balance": 0
//   },
//   {
//       "id": "d71d2af73ccc",
//       "type": "Type2",
//       "name": "Bbbbbbbbb",
//       "balance": 0
//   },
//   {
//       "id": "5918cf986969",
//       "type": "Type3",
//       "name": "Ccccccccccccc",
//       "balance": 4000
//   }
// ];  
// }

// new Promise(function (resolve, reject) {
//   fs.readFile('../sample/sample.json', function (err, res){
//       if (err) {
//           reject(err);
//           console.log(err);
//       }
//   });

function findById(data, id) {
  var resultArray = [];
  function iter(a) {
    if (a.id === id) {
      result = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }

  var result;
  data.some(iter);
  // const elements = JSON.parse(result);
  // console.log(result);
  // return result;
  resultArray.push(result);
  // return resultArray;
  return flat(resultArray, id);

}

function flat(array, id) {
  var result = [];
  let types = [];
  let confidence = 1;
  // console.log(array);
  array.forEach(function (a) {
    types = types.concat(a.connectionInfo.type);
    confidence = confidence * a.connectionInfo.confidence;
    a.combinedConnectionInfo = {
      "types": types,
      "confidence": confidence
    }

    let obj = a.id === id ? ({ children, connectionInfo, combinedConnectionInfo, ...rest }) => rest : ({ children, ...rest }) => rest;
    // const obj = ({ children, ...rest }) => rest;



    console.log(obj);

    if (a.connectionInfo.confidence >= 0.8) {
      result.push(obj(a));
    }

    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children, id));
    }
  });
  return result;

}