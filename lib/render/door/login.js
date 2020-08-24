
const sha512 = require("js-sha512").sha512;

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
module.exports = function(app, user, session) {
app.post("/door/login", function(req, res) {
    let email = req.body.email,
      password = req.body.password;

    user.find({email: email}).exec(function(err, doc) {
      if (!doc[0]) return res.redirect("/door/login");
      if (doc[0].password === sha512(password)) {
        req.session.username = doc[0].username;
        req.session.pp = doc[0].pp;
        req.session.token = doc[0].token;
        req.session.bio = doc[0].bio;
        res.redirect("/app");
      } else {
        res.redirect("/door/login");
      }
    });
  });
};