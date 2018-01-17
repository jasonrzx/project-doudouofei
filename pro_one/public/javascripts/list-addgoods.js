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

