var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var User = new Schema({
    username  : String,
    psw       : String,
    createdate: {type: Date, default: Date.now}
});
var UserName = mongoose.model('userboxs', User);
module.exports = UserName;