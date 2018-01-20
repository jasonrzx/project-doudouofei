//添加商品选项卡效果
function Goods(list){
	var that = this;
	this.list = list;
	$(this.list).find(".goods-list>li").click(function(){
		that.Click($(this));
	})
}
Goods.prototype = {
	Click: function(el){
		var count = $(el).index()
		$(el).addClass("goods-front").siblings().removeClass("goods-front");
		$(this.list).find(".goods-body").eq(count).addClass("goodsbox-click").siblings().removeClass("goodsbox-click")
	}
}
new Goods($(".addgoods-main"));

//向后台添加商品
function upload(){
	// var form = new FormData(); // FormData是H5新特性
	// form.append("goods-name", document.getElementById("goods-name").value);
	// form.append("goods-num", document.getElementById("goods-num").value);
	// form.append("goods-price", document.getElementById("goods-price").value);
	// form.append("img", document.getElementById("img").files[0]);
	$.ajax({
		url: "/goods/api/addgoods",
		type: "post",
		data: {
			goodsname: $("#goods-name").val(),
			goodsnum: $("#goods-num").val(),
			goodsprice: $("#goods-price").val(),
			goodssales: $("#goods-sales").val(),
			goodsinventory: $("#goods-inventory").val()
		},
		success: function(res){
			console.log(res);
			if(res.code==1){
				alert(res.message);
			}else if(res.code==-101){
				alert(res.message);
			}
		}
	})
}

