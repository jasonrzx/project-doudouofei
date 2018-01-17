$("#btnlogin").click(function(){
	$.ajax({
		url: "/api/loginajax",
		type: "post",
		data: {
			username: $("#username").val(),
			psw: $("#psw").val(),
			verify: $("#code").val()
		},
		success: function(res){
			console.log(res);
			if(code==1){
				alert(res.message);
			}else{
				alert(res.message);
			}
		}
	})
})