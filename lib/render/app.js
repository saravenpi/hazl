module.exports = function(app, user, guild) {
  app.get("/app", function(req, res) {
    if (!req.session.username) return res.redirect("/door/login");
    user.find({ token: req.session.token }).exec(async function(err, doc) {
      var witness = 0;
      let guild_array = new Map();
      var user_guilds = doc[0].guilds;

      /*io.on("connection", function(socket) {
        user_guilds.map(guild => {
          socket.join(guild);
        });
      });*/
      
      res.render("app", {
        user: {
          username: req.session.username,
          pp: req.session.pp,
          token: req.session.token,
          bio: req.session.bio
        },
        guilds: user_guilds
      });
    });
  });
};
