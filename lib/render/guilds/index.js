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

module.exports = function(app, channel, guild, message, user, io) {
  app.post("/createguild", function(req, res) {
    let guild_name = req.body.guild.name;
    let token = req.body.user.token;

    user.find({ token: token }).exec(function(err, doc) {
      let guild_id = makeid(10);
      var guildarray = doc[0].guilds;

      doc[0].guilds.push(guild_id);
      doc[0].save();

      let channel_id = makeid(120);

      let channel_z = new channel({
        guild_id: guild_id,
        id: channel_id
      });
      channel_z.save();

      let guild_z = new guild({
        name: guild_name,
        id: guild_id,
        members: [doc[0].id],
        owner: doc[0].id,
        channels: [channel_id]
      });
      guild_z.save();
      req.session.username = doc[0].username;
      req.session.pp = doc[0].pp;
      req.session.token = doc[0].token;
      req.session.bio = doc[0].bio;
      res.redirect("/app");
    });
  });

  app.post("/joinguild", function(req, res) {
    let guild_id = req.body.guild.id;
    let token = req.body.user.token;
    user.find({ token: token }).exec(function(err, doc) {
      var guildarray = doc[0].guilds;

      doc[0].guilds.push(guild_id);
      doc[0].save();
      req.session.username = doc[0].username;
      req.session.pp = doc[0].pp;
      req.session.token = doc[0].token;
      req.session.bio = doc[0].bio;
      res.redirect("/app");
    });
  });

  io.on("connection", function(socket) {
    socket.on("guildroom", function(room) {
      if (socket.room) socket.leave(socket.room);

      socket.room = room;
      socket.join(room);

      var query = channel.find({ guild_id: room }).sort({ date: -1 });

      query.exec(function(err, docs) {
        docs.reverse().map(channel => {
          if (channel.name.replace(/ /g, "").length < 1) return;
          if (channel.guild_id == room) {
            

            socket.emit(
              "loadchannels",
              xss(channel.name),
              xss(channel.id),
              
            );
          }
        });
      });
    });

    

  /*  socket.on("message", function(msg, token, channel_id) {
      console.log("msggggg");

      if (msg.replace(/ /g, "").length < 1) return;

      user.find({ token: token }).exec(function(err, doc) {
        let author = doc[0].username;
        let pp = doc[0].pp;
        let id = makeid(120);

        io.sockets
          .in(channel_id)
          .emit("message", xss(author), xss(pp), markdown.toHTML(xss(msg)), id);

        const kitty = new message({
          author: author,
          pp: pp,
          id: id,
          content: msg,
          channel_id: channel_id
        });

        kitty.save().then(console.log("meow"));
      });
    });*/
  });
};
