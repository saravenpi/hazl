var port = process.env.PORT || 3000;

const express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io").listen(http);

const session = require("express-session");

///////////////////////////////////////////////
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
///////////////////////////////////////////////

var guildSchema = new mongoose.Schema({
  name: String,
  id: String,
  description: {type: String, default: "A random guild."},
  date: {type: Date, default: Date.now},
  members: Array,
  owner: String,
  channels: Array,
  icon: {type: String, default: "https://cdn.glitch.com/cd441c7f-4758-44d8-96a5-9f223a9d3cc5%2FCopy%20of%20hazl.png?v=1586296665489"}
  
})

var guild = mongoose.model("guild",guildSchema);

var channelSchema = new mongoose.Schema({
  name: {type: String, default: "new-channel"},
  id: String,
  guild_id: String,
  description: {type: String, default: "A random channel."},
  date: {type: Date, default: Date.now}

  
})

var channel = mongoose.model("channel",channelSchema);

var messageSchema = new mongoose.Schema({
  author: String,
  id: String,
  pp: String,
  content: String,
  date: { type: Date, default: Date.now },
  channel_id : String
});

var message = mongoose.model("Message", messageSchema);


var userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  pp: String,
  token: String,
  status: Number,
  id : String,
  bio: String,
  date:{ type: Date, default: Date.now },
  profile_banner: String,
  description : String,
  guilds : Array
});

var user = mongoose.model("user", userSchema);





require("./motor")(app, express, session);
require("./render/index")(app);
require("./render/door")(app);
require("./render/app")(app,user,guild);
require("./render/door/register")(app, user);
require("./render/logout")(app);
require("./render/door/login")(app, user);
require("./render/profile")(app,user);
require("./render/config")(app, user);
require("./render/guilds/index")(app, channel, guild, message, user, io);
require("./render/guilds/channels/index")(app, user, guild, channel);
require("./render/api/guild.js")(app, guild);
require("./render/api/channel.js")(app, channel);
require("./render/api/messages.js")(app, channel, guild, message, io);
require("./render/chat.js")(app, channel, guild, message, user, io);

http.listen(port, function() {
  console.log("Le serveur est ouvert sur le port :", port);
});
