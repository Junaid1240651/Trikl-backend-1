const mongoose = require("mongoose");

const crudData = new mongoose.Schema({
  userId: { type: Number },
  id: { type: Number },
  title: { type: String },
  completed: { type: Boolean },
});
module.exports = mongoose.model("crudData", crudData);
