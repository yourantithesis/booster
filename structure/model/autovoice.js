const mongoose = require("mongoose");

const AutoSchema = new mongoose.Schema({
  guildID: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  categoryID: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  channelID: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  code: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("Autovoice", AutoSchema);
