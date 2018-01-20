$.ajax({
	url: "/goods/api/backgoods",
	type: "post",
	data: {

	},
	success: function(res){
		$(".revise-name").val(res[0].goodsname);
		$(".revise-num").val(res[0].goodsnum);
		$(".revise-price").val(res[0].goodsprice);
		$(".revise-inventory").val(res[0].goodsinventory);
		$(".revise-sales").val(res[0].goodssales);
	}
})

$(".revise-choose").click(function(){
	var reviseprice = $(".revise-price").val();
	var reviseinventory = $(".revise-inventory").val();
	var revisesales = $(".revise-sales").val();
	$.ajax({
		url: "/goods/api/revampgoods",
		type: "get",
		data: {
			reviseprice: reviseprice,
			reviseinventory: reviseinventory,
			revisesales: revisesales
		},
		success: function(res){
			//console.log(res);
 			if(res.code==1){
 				alert(res.message);
 				$(".list-ecshop").load("/list-ecshop");
 			}else{
 				alert(res.message);
 			}
		}
	})
})
