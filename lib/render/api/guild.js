module.exports = function(app, guild) {
  app.get("/api/guilds/:guild_id", (req, res) => {
    guild.find({id:req.params.guild_id}).exec(function(err,doc) {
      if(!doc[0]) return res.send({Error: "No guild found."})
      res.send(doc[0])
    })
  });
};