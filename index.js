module.exports = function run({ initiateModule, container }) {

  initiateModule(initiateModule, "initiateModule");
  initiateModule(container, "container");

  const serverConfig = container.resolve("config").getServerConfig();
  const bodyParser = container.resolve("bodyParser");
  const app = container.resolve("app");
  // const express = require("express") 

  initiateResources()
    .then(res => {
      return serve();
    }).catch(err => {
      console.log("Application initialization error ", err);
    });

  function serve() {
    const PORT = process.env.PORT || serverConfig.PORT;

    return app.listen(PORT, () =>
      console.log(`>>> Transaction API is up and running on port ${PORT} <<<`)
    );

  }

  function initiateResources() {
    useInitialMiddlewares();
    setRoutes();
  }

  function useInitialMiddlewares() {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  }

  function setRoutes() {
    const router = container.resolve("router");
    app.use(`${serverConfig.BASE_URL}`, router);
    console.log("Routes are successfully plugged!");
  }

  app.get("/", (req, res) => {
    res.send("Welcome to Secure Transactions!")
  });
}
