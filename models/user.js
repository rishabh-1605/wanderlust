const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose); // username , hashing ,salting, hash password it automatically implement // pbkdf2 hashing algorithm applies

module.exports = mongoose.model("User", userSchema);
