const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")



mongoose.connect("mongodb://127.0.0.1:27017/delet2");
const userSchema = mongoose.Schema({
  username:String,
  password:String,
  name:String
})
userSchema.plugin(plm);


module.exports = mongoose.model("user", userSchema)



