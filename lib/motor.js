module.exports = function(app, express, session) {
  app.use(express.static("public"));
  app.use(
    session({
      secret: process.env.secretSession,
      resave: true,
      saveUninitialized: true
    })
  );

  app.use(express.urlencoded());
  app.use(express.json());

  app.set("view engine", "ejs");
};
