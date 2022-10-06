const { Client, Collection, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("./config.json");
const express = require("express");
const app = express();
const port = 3000;
//!MONGO MODEL
const Note = require("./structure/model/note");
const AutoVoice = require("./structure/model/autovoice");

const client = new Client({
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: [
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  ],
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  // rejectOnRateLimit: ["/guilds", "/channels"],
  // rejectOnRateLimit: function (rate) {
  //   rate ? console.log(rate) : null;
  // },
  http: {
    agent: {},
    version: 9,
    api: "https://discord.com/api",
    cdn: "https://cdn.discordapp.com",
    invite: "https://discord.gg",
    template: "https://discord.new",
    scheduledEvent: "https://discord.com/events",
  },
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
});
client.prefix = config.PREFIX;
client.commands = new Collection();
client.limits = new Map();
client.on("warn", (error) => console.log(error));
client.on("error", (error) => console.log(error));
client.setMaxListeners(0);
client.login(config.TOKEN);
const command = require("./structure/commandHandler");
command.run(client);

const events = require("./structure/event");
events.run(client);
process.on("unhandledRejection", (reason, p) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Unhandled Rejection/Catch"
  );
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch"
  );
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch (MONITOR)"
  );
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log("\x1b[31m%s\x1b[0m", " [Anti - Crash] :: Multiple Resolves");
});

