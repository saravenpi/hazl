module.exports = function(app, channel) {
  app.get("/api/channels/:channel_id", (req, res) => {
    channel.find({id:req.params.channel_id}).exec(function(err,doc) {
      if(!doc[0]) return res.send({Error: "No channel found."})
      res.send(doc[0])
    })
  });
};