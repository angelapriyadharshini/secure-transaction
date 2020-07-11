module.exports = function run({ initiateModule, container }) {

  initiateModule(initiateModule, "initiateModule");
  initiateModule(container, "container");

  const serverConfig = container.resolve("config").getServerConfig();
  const cors = container.resolve("cors");
  const bodyParser = container.resolve("bodyParser");
  const app = container.resolve("app");
  const commonMiddlewares = container.resolve("commonMiddlewares");

  function serve() {
    const PORT = process.env.PORT || serverConfig.PORT;

    return app.listen(PORT, () =>
      console.log(`>>> Transaction API is up and running on port ${PORT} <<<`)
    );

  }

  setRoutes();
  usePostProcessingMiddlewares();
  serve();

  // enabling CORS  
  app.use(cors());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    } else {
      return next();
    }
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  function setRoutes() {
    const router = container.resolve("router");
    app.use(`${serverConfig.BASE_URL}`, router);
    console.log("Routes are successfully plugged!");
  }

  function usePostProcessingMiddlewares() {
    // initiating error handlers
    app.use(commonMiddlewares.errorHandler);
  }

}(require("./scripts/dependency-injector"))
