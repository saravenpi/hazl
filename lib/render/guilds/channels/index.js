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

module.exports = function(app, user, guild, channel) {
  app.post("/createchannel", function(req, res) {
    let channelname = req.body.guild.name;
    let token = req.body.user.token;
    let guild_id = req.body.guild.id
    user.find({ token: token }).exec(function(err, user) {
      if(!user[0]) return res.send({Error: "Unauthorized."});
      guild.find({id:guild_id}).exec(function(err2, guild){
        if(!guild[0]) return res.send({Error: "Guild not found."});
        if(guild[0].owner !== user[0].id) return res.send({Error: "Unauthorized."})
        var channel_id = makeid(120);
        var channels = guild[0].channels.push(channel_id);
        channels.save();
        
           
      })
    });
  });
};