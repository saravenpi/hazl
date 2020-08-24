module.exports = function(app,channel) {
  app.get("/", function(req, res) {
   
    res.render("index", {
      user: {
        username: req.session.username,
        pp: req.session.pp,
        token: req.session.token,
        bio: req.session.bio
      }
    });
  });
};
