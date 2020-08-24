const sha512 = require("js-sha512").sha512;
const mongoose = require("mongoose");
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = function(app, user) {
  app.post("/door/register", function(req, res) {
    let username = req.body.username,
      password = req.body.password,
      email = req.body.email;
    
    user.find({ username: username }).exec(function(err, doc) {
      if (doc[0]) {
        res.send("There is already a user with this username");
      } else {
        const doggy = new user({
          email: email,
          username: username,
          password: sha512(password),
          pp: "https://i.stack.imgur.com/34AD2.jpg",
          token: makeid(120),
          id: makeid(30),
          description: "",
          profile_banner: "https://i.imgur.com/7lJRtfB.png",
          bio: "Anonymous user."
        });
        doggy.save().then(console.log("wouf"));
       
        res.redirect("/door/login");
      }
    });
  });
};
