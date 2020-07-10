module.exports = function loadModules(awilix) {

  let container = awilix.createContainer({
    resolutionMode: awilix.InjectionMode.PROXY
  });

  container.register({
    awilix: awilix.asValue(require('awilix')),
    express: awilix.asValue(require('express')),
    app: awilix.asValue(require('express')()),
    bodyParser: awilix.asValue(require('body-parser'))
  });

  container.loadModules([
    ['src/config/config.js', { register: awilix.asFunction }],
    ['src/transactions/router.js', { register: awilix.asFunction }],
    ['src/transactions/controllers/*.js', { register: awilix.asClass }],
    ['src/transactions/business-logics/*.js', { register: awilix.asClass }],
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      injectionMode: InjectionMode.PROXY,
      lifetime: awilix.Lifetime.SINGLETON
    }
  });

  return container;

}(require('awilix'))