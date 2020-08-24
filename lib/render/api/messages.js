const xss = require("xss");
const markdown = require("markdown").markdown;

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

module.exports = function(app, channel, guild, message, io) {
  app.get("/api/messages/:channel_id", (req, res) => {
    
  });
};
