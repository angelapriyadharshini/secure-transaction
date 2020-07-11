module.exports = function loadModules(awilix) {

  let container = awilix.createContainer({
    resolutionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    awilix: awilix.asValue(require('awilix')),
    express: awilix.asValue(require('express')),
    app: awilix.asValue(require('express')()),
    bodyParser: awilix.asValue(require('body-parser')),
    cors: awilix.asValue(require('cors')),
    fs: awilix.asValue(require("fs"))
  });

  container.loadModules([
    ['src/config/config.js', { register: awilix.asFunction }],
    ['src/transactions/router.js', { register: awilix.asFunction }],
    ['src/transactions/controllers/*.js', { register: awilix.asClass }],
    ['src/transactions/services/*.js', { register: awilix.asClass }],
    ['src/transactions/middlewares/*.js', { register: awilix.asClass }],
    ['src/transactions/utils/*.js', { register: awilix.asFunction }]
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: awilix.Lifetime.SINGLETON
    }
  });

  return {
    container,
    initiateModule: function (module, moduleName) {
      var diObj = {}
      diObj[moduleName] = awilix.asValue(module);
      container.register(diObj);
    }
  };

}(require('awilix'))