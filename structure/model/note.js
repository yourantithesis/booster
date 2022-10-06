const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  description: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  guildID: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  idx: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
