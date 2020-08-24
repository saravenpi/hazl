module.exports = function(app, user) {
  
   app.get("/config", function(req, res) {
    if (!req.session.username) return res.redirect("/door/login");

   res.send("config")
  });

  
  app.post("/config", function(req, res) {
  
    let username = req.body.user.username;
    let avatar = "https://i.stack.imgur.com/34AD2.jpg";
    let bio = req.body.user.bio;
    console.log(username);

    user.findOne({ token: req.session.token }).exec(function(err, new_profil) {
      user.find({ username: username }).exec(function(err, doc) {
    
        if (doc[0] && doc[0].username == req.session.username) {
           
          new_profil.pp = avatar;
          new_profil.bio = bio;
          new_profil.save();
          req.session.username = username;
          req.session.pp = avatar;
          req.session.bio = bio;
          res.redirect("/app");
         
        } else {
          if (doc[0] && doc[0].username != req.session.username) {
            res.send("Un compte existe déjà avec ce pseudo");
          }
          else {
          new_profil.username = username;
          new_profil.pp = avatar;
          new_profil.bio = bio;
          new_profil.save();
          req.session.username = username;
          req.session.pp = avatar;
          req.session.bio = bio;
          res.redirect("/app");
         
            
          }
            
        }
      });
    });
  });
  
  
}