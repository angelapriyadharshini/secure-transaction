module.exports = function ({ config }) {
  const errorConfig = config.getErrorConfig();

  return {
    errorHandler: function (response, req, res, next) {

      // setting default 500 error if no error code found
      var error = errorConfig[response.code] ? errorConfig[response.code] : errorConfig.default;
      res.locals.message = error.DESCRIPTION;
      res.status(error.STATUS);
      res.json({
        code: response.code,
        error: error.DESCRIPTION,
        stack: response.stack
      });
    }
  }
}