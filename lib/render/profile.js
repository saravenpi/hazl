module.exports = function(app, user) {
  app.get("/profile/:username", (req, res) => {
    const username = req.params.username;
    user.find({ username: username }).exec(function(err, doc) {
      if (!doc[0])
        return res.render("./app/profile", {
          user: undefined
        });
      console.log(doc[0]);
      if (doc[0].bio) {
        res.render("./app/profile", {
          user: {
            username: doc[0].username,
            status: doc[0].status,
            pp: doc[0].pp,
            bio: doc[0].bio
          }
        });
      } else {
        res.render("./app/profile", {
          user: {
            username: doc[0].username,
            status: doc[0].status,
            pp: doc[0].pp,
            bio: undefined
          }
        });
      }
    });
  });
};
