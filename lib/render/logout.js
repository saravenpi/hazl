module.exports = function(app) {
  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/door/login");
  });
};
