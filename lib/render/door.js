const sha512 = require("js-sha512").sha512;

module.exports = function(app, user) {
  
  
  
  app.get("/door", function(req, res) {
    res.render("door", {
      user: {
        username: req.session.username,
        pp: req.session.pp,
        token: req.session.token,
        bio: req.session.bio
      }
    });
  });
app.get("/door/register", function(req, res) {
    res.render("door/register", {
      user: {
        username: req.session.username,
        pp: req.session.pp,
        token: req.session.token,
        bio: req.session.bio
      }
    });
  });
  
app.get("/door/login", function(req, res) {
   res.render("door/login", {
      user: {
        username: req.session.username,
        pp: req.session.pp,
        token: req.session.token,
        bio: req.session.bio
      }
    })
});
};
