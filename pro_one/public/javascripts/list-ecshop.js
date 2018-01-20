//ajax获取数据库goods
// $.ajax({
// 	url: "/goods/api/findlist",
// 	type: "post",
// 	data: {

// 	},
// 	success: function(res){
// 		new Findcreate($(".ecshop-bylist"), res);
// 	}
// })
// //通过调取数据库创建列表
// function Findcreate(elem, data){
// 	this.elem = elem;
// 	this.data = data;
// 	this.num = 0;
// 	this.Init();
// }
// Findcreate.prototype = {
// 	Init: function(){
// 		var len = $(this.data).length;
// 		for(var i=0; i<len; i++){
// 			this.num ++ ;
// 			var str = `
// 				<tr class="add-goodslist">
// 					<td><input type='checkbox'/>${this.num}</td>
// 					<td><span>${this.data[i].goodsname}</span></td>
// 					<td><span>${this.data[i].goodsnum}</span></td>
// 					<td><span>${this.data[i].goodsprice}</span></td>
// 					<td><img src='images/yes.gif'/></td>
// 					<td><img src='images/yes.gif'/></td>
// 					<td><img src='images/yes.gif'/></td>
// 					<td><img src='images/yes.gif'/></td>
// 					<td><span>100</span></td>
// 					<td><span>${this.data[i].goodsinventory}</span></td>
// 					<td><span>${this.data[i].goodssales}</span></td>
// 					<td class="goodslist-img">
// 						<a><img src='images/icon_view.gif'/></a>
// 						<a><img src='images/icon_edit.gif'/></a>
// 						<a><img src='images/icon_copy.gif'/></a>
// 						<a><img src='images/icon_trash.gif'/></a>
// 					</td>
// 				</tr>
// 			`
// 			$(this.elem).append(str);
// 		}
// 	}
// }