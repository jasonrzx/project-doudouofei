function Menu(elem){
	var that = this;
	this.elem = elem;
	this.flag = 1;
	$(this.elem).find(".icon-d").click(function(){
		that.Click($(this));
	})
}
Menu.prototype = {
	Click: function(el){
		if(this.flag==1){
			$(el).find(".icol").css({"display":"block"});
			$(el).find(".iconi").css({"background":"#454545 url(../images/menu1_1.png) no-repeat 9px 0"});
			this.flag = 0;
		}else if(this.flag==0){
			$(el).find(".icol").css({"display":"none"});
			$(el).find(".iconi").css({"background":"#575757 url(../images/menu_1.png) no-repeat 9px 0"});
			this.flag = 1;
		}
		$(el).find(".menu-item").click(function(e){
			e.stopPropagation();
			if($(this).index()==0){
				$(".list-ecshop").load("/list-ecshop");
			}else if($(this).index()==1){
				$(".list-ecshop").load("/list-addgoods");
			}
		})
	}
}
new Menu($(".menu-div"));
$(".list-ecshop").load("/list-ecshop");

