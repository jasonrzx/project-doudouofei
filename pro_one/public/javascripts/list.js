//左侧栏商品管理
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
new Menu($(".menu-div"))
$(".list-ecshop").load("/list-ecshop");


//分页效果        
function update(){
	$.ajax({
		url: "/goods/api/updategoods",
		type: "post",
		data: {
			condition: "",
			perPageCnt: $(".page-num").val(),
			pageNO: $(".sel-box option:selected").text()||1
		},
		success: function(res){
			//函数入口
			new Findcreate($(".ecshop-bylist"), res, $(".sel-box"), $(".page-div"), $(".ecshop-find"));
		}
	})
}
update(); //页面刷新自运行函数
//通过调取数据库创建列表
function Findcreate(elem, data, sel, page, key){
	var that =this;
	this.elem = elem;
	this.data = data;
	this.sel = sel;
	this.page = page;
	this.key = key;
	this.num = 0;
	//this.pagenum = $(".sel-box option:selected").text();
	this.ss = parseInt($(".page-num").val()); //每页商品数
	this.dd = parseInt(this.data.total); //商品总数
	this.ys = Math.ceil(this.dd/this.ss); //页数
	this.Init();
	//搜索按键模糊查询
	$(this.key).find(".ecshop-btn").unbind("click");
	$(this.key).find(".ecshop-btn").click(function(){
		$(".add-goodslist").remove();
		that.SearchClick($(this));
	})
	//上一页
	$(this.page).find(".page-up").unbind("click");
	$(this.page).find(".page-up").click(function(){
		$(".add-goodslist").remove();
		that.UpClick($(this));
	})
	//下一页
	$(this.page).find(".page-next").unbind("click");
	$(this.page).find(".page-next").click(function(){
		$(".add-goodslist").remove();
		that.NextClick($(this));
	})
	//首页
	$(this.page).find(".page-first").unbind("click");
	$(this.page).find(".page-first").click(function(){
		$(".add-goodslist").remove();
		that.FirstClick($(this));
	})
	//末页
	$(this.page).find(".page-last").unbind("click");
	$(this.page).find(".page-last").click(function(){
		$(".add-goodslist").remove();
		that.LastClick($(this));
	})
	//每页个数聚焦事件
	$(this.page).find(".page-num").unbind("input propertychange");
	$(this.page).find(".page-num").bind("input propertychange", function(){
		$(".add-goodslist").remove();
		that.Focus($(this));
	})
	//select菜单点击事件
	$(this.page).find(".sel-box>option").unbind("click");
	$(this.page).find(".sel-box>option").click(function(){
		$(".add-goodslist").remove();
	})
}
Findcreate.prototype = {
	Init: function(){
		$(this.page).find(".page-all").html(this.dd); //总计商品
		$(this.page).find(".page-only").html(this.ys); //分为的页码数
		$(this.page).find(".page-now").html(this.data.pageNO); //当前页
			
		//循环创建商品
		var len = $(this.data.data).length;
		for(var i=0; i<len; i++){
			this.num ++ ;

			var str = `
				<tr class="add-goodslist">
					<td><input type='checkbox'/>${this.num}</td>
					<td><span>${this.data.data[i].goodsname}</span></td>
					<td><span>${this.data.data[i].goodsnum}</span></td>
					<td><span>${this.data.data[i].goodsprice}</span></td>
					<td><img src='images/yes.gif'/></td>
					<td><img src='images/yes.gif'/></td>
					<td><img src='images/yes.gif'/></td>
					<td><img src='images/yes.gif'/></td>
					<td><span>100</span></td>
					<td><span>${this.data.data[i].goodsinventory}</span></td>
					<td><span>${this.data.data[i].goodssales}</span></td>
					<td class="goodslist-img">
						<a><img src='images/icon_view.gif'/></a>
						<a><img src='images/icon_edit.gif'/></a>
						<a><img src='images/icon_copy.gif'/></a>
						<a><img src='images/icon_trash.gif'/></a>
					</td>
				</tr>
			`
			$(this.elem).append(str);
		}

		$(this.sel).find("option").remove(); //移除select创建option
		//创建option
		for(var j=1; j<=this.ys; j++){
			var stt = `
				<option value='${j}'>${j}</option>	
			`
			$(this.sel).append(stt);
			$(this.elem).find("option").attr("selected","true");
			//通过后台返回的pageNo页码数指定相应的option数
			$(this.sel).find("option[value="+this.data.pageNO+"]").attr("selected","ture");
		} 
	},
	//搜索按键模糊查询
	SearchClick: function(){
		this.url = "/goods/api/updategoods";
		this.type = "post";
		this.keynum = $(this.key).find("#key").val();
		this.pagegoods = parseInt($(this.page).find(".page-num").val());
		this.pagegood = (this.pagegoods>0)?this.pagegoods:1;
		this.pagenum = $(".sel-box option:selected").text();
		new UpAjax(this.url, this.type, this.keynum, this.pagegood, this.pagenum);
	},
	//上一页
	UpClick: function(){
		this.url = "/goods/api/updategoods";
		this.type = "post";
		this.keynum = $(this.key).find("#key").val();
		this.pagegoods = parseInt($(this.page).find(".page-num").val());
		this.pagegood = (this.pagegoods>0)?this.pagegoods:1;
		this.pagenum = parseInt($(".sel-box option:selected").text());
		
		if(this.pagenum<=1){
			this.pagenum = 1;
		}else{
			this.pagenum -= 1;
		}
		new UpAjax(this.url, this.type, this.keynum, this.pagegood, this.pagenum);
	},
	//下一页
	NextClick: function(){
		this.url = "/goods/api/updategoods";
		this.type = "post";
		this.keynum = $(this.key).find("#key").val();
		this.pagegoods = parseInt($(this.page).find(".page-num").val());
		this.pagegood = (this.pagegoods>0)?this.pagegoods:1;
		this.pagenum = parseInt($(".sel-box option:selected").text());
		this.ys = parseInt(this.ys);
		if(this.pagenum>=this.ys){
			this.pagenum = this.ys;
		}else{
			this.pagenum += 1;
		}
		new UpAjax(this.url, this.type, this.keynum, this.pagegood, this.pagenum);
	},
	//首页
	FirstClick: function(){
		this.url = "/goods/api/updategoods";
		this.type = "post";
		this.keynum = $(this.key).find("#key").val();
		this.pagegoods = parseInt($(this.page).find(".page-num").val());
		this.pagegood = (this.pagegoods>0)?this.pagegoods:1;
		this.pagenum = 1;
		new UpAjax(this.url, this.type, this.keynum, this.pagegood, this.pagenum);
	},
	//末页
	LastClick: function(){
		this.url = "/goods/api/updategoods";
		this.type = "post";
		this.keynum = $(this.key).find("#key").val();
		this.pagegoods = parseInt($(this.page).find(".page-num").val());
		this.pagegood = (this.pagegoods>0)?this.pagegoods:1;
		this.ys = parseInt(this.ys);
		this.pagenum = this.ys;
		new UpAjax(this.url, this.type, this.keynum, this.pagegood, this.pagenum);
	},
	//每页个数聚焦事件
	Focus: function(){
		this.url = "/goods/api/updategoods";
		this.type = "post";
		this.keynum = $(this.key).find("#key").val();
		this.pagegoods = parseInt($(this.page).find(".page-num").val());
		this.pagegood = (this.pagegoods>0)?this.pagegoods:1;
		this.pagenum = parseInt($(".sel-box option:selected").text());
		new UpAjax(this.url, this.type, this.keynum, this.pagegood, this.pagenum);
	}
}

function UpAjax(url, type, keynum, pagegood, pagenum){
		this.url =url;
		this.type = type;
		this.keynum = keynum;
		this.pagegood = pagegood;
		this.pagenum = pagenum;
		$.ajax({
			url: this.url,
			type: this.type,
			data: {
				condition: this.keynum || "",
				perPageCnt: this.pagegood,
				pageNO: this.pagenum || 1
			},
			success: function(res){
				//函数入口
				new Findcreate($(".ecshop-bylist"), res, $(".sel-box"), $(".page-div"), $(".ecshop-find"));
			}
		})
	}





