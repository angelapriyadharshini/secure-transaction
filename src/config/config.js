module.exports = function () {
  var config = {
    serverConfig: require('./server-config.json'),
    errorConfig: require('./error-config.json')
  }

  return {
    getConfig: function () {
      return config;
    },
    getServerConfig: function () {
      return config.serverConfig;
    },
    getErrorConfig: function () {
      return config.errorConfig;
    }
  }
  
}