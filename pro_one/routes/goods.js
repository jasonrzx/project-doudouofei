var express = require('express');
var router = express.Router();
var GoodsModel = require("../model/Goods");


//添加商品
router.post('/api/addgoods', function(req, res, next) {
	console.log(req.body);
	var goodsname = req.body.goodsname;
	var goodsnum = parseInt(req.body.goodsnum);
	var goodsprice = parseInt(req.body.goodsprice);
	var goodssales = parseInt(req.body.goodssales);
	var goodsinventory = parseInt(req.body.goodsinventory);

	var result = {
		code: 1,
		message: "商品添加成功！"
	};
	var bb = new GoodsModel();
	bb.goodsname = goodsname;
	bb.goodsnum = goodsnum;
	bb.goodsprice = goodsprice;
	bb.goodssales = goodssales;
	bb.goodsinventory = goodsinventory;
	bb.save(function(err){
		if(err){
			result.code = -101;
			result.message = "商品添加失败，请检查信息。";
			res.json(result);
		}else{
			res.json(result);
		}
	})
});

//获取添加的物品
router.post('/api/findlist', function(req, res, next){
	GoodsModel.find({}, function(err, data){
		res.json(data);
	})
});

//分页效果
router.post('/api/updategoods', function(req, res, next) {
	var condition = req.body.condition;

	var pageNO = req.body.pageNO || 1;
	pageNO = parseInt(pageNO); //第几页
	var perPageCnt = req.body.perPageCnt || 12;
	perPageCnt = parseInt(perPageCnt); //每页显示多少
	
	GoodsModel.count({goodsname:{$regex: condition}}, function(err, count){
		console.log("数量:"+count);
		var query = GoodsModel.find({goodsname: {$regex: condition}}).skip((pageNO-1)*perPageCnt).limit(perPageCnt);
		query.exec(function(err, docs){
			var result = {
				total: count, //总共有多少个符合条件的数据
				data: docs, //每页多少个
				pageNO: pageNO //当前的页码
			}
			
			res.json(result);
		});
	})
});

module.exports = router;