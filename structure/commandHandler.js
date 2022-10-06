const { readdirSync } = require("fs");
const config = require("../config.json");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");
const mongoose = require("mongoose");

module.exports.run = (client) => {
  for (const cmd of readdirSync(filePath).filter((cmd) =>
    cmd.endsWith(".js")
  )) {
    const prop = require(`${filePath}/${cmd}`);
    client.commands.set(prop.help.name, prop);
  }
  console.log(
    "\x1b[36m%s\x1b[0m",
    `[ ✅ Load ${client.commands.size} commands! ]`
  );
  mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("\x1b[32m%s\x1b[0m", "[ ✅ Database Connected ]");
  });
  // send msg if successfull connection to mongodb
  mongoose.connection.on("err", (err) => {
    console.error("\x1b[31m%s\x1b[0m", `[ ❌ Database Error : ${err.stack} ]`);
  });
  // send msg if error on connection
  mongoose.connection.on("disconnected", () => {
    console.warn("\x1b[31m%s\x1b[0m", "[ ❌ Database Connection Timeout ]");
  });
};
