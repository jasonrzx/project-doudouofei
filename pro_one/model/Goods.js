var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Goods = new Schema({
	goodsname: String,
	goodsnum: Number,
	goodsprice: Number,
	goodssales: Number,
	goodsinventory: Number,
	createDate: {type: Date, default: Date.now}
});
var GoodsModel = mongoose.model('goodsmessage', Goods);
module.exports = GoodsModel;