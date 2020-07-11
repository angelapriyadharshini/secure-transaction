module.exports = function () {

  return {

    findById: (data, id) => {
      let resultArray = [];
      let result;

      function iterator(a) {
        if (a.id === id) {
          result = a;
          return true;
        }
        return Array.isArray(a.children) && a.children.some(iterator);
      }

      data.some(iterator);

      if (result) {
        resultArray.push(result);
      }
      return resultArray;
    },

    flatten: function flatten(array) {
      let result = [];

      array.forEach(function (a) {
        result.push(a);

        if (Array.isArray(a.children)) {
          result = result.concat(flatten(a.children));
        }

      });
      return result;
    },

    setCombinedConnectionInfo: (array, id) => {
      let result = [];
      let types = [];
      let confidence = 1;

      const newArr = array.map((item) => {
        if (item.id !== id) {

          // adding combinedConnectionInfo property to the children of the matched parent
          types = types.concat(item.connectionInfo.type);
          confidence = confidence * item.connectionInfo.confidence;
          const combinedConnectionInfo = {
            "types": types,
            "confidence": confidence
          }
          item['combinedConnectionInfo'] = combinedConnectionInfo;
        }
        return item;
      });
      newArr.forEach((item) => {

        // removing children, connectionInfo properties for the matched parent transaction
        let obj = item.id === id ? ({ children, connectionInfo, ...rest }) => rest : ({ children, ...rest }) => rest;
        result.push(obj(item));
      });

      return result;
    },

    filterByConfidenceLevel: (array, confidenceLevel, id) => {

      // filtering elements with confidenceLevel greater than or equal to the given confidence
      return array.filter((item) => item.id === id || item.connectionInfo.confidence >= confidenceLevel);
    }
  }
}