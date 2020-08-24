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
  io.on("connection", function(socket) {
    socket.on("room", function(room) {
      if (socket.room) socket.leave(socket.room);

      socket.room = room;
      socket.join(room);

      var query = message
        .find({channel_id: room})
        .sort({ date: -1 })
        .limit(75);

      query.exec(function(err, docs) {
        docs.reverse().map(message => {
          if (message.content.replace(/ /g, "").length < 1) return;
          if (message.channel_id == room) {
            
        
          console.log(message.content);
          
          
            
            socket
            .emit(
              "loadhist",
              xss(message.author),
              xss(message.pp),
              markdown.toHTML(xss(message.content)),
              message.id
            );
            
                    
          }
        });
      });

     
    });

    console.log("msggggg");

    socket.on("message", function(msg, token, channel_id) {
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
    });
  });
};
