$(document).ready(function(){
	 bgImg();
});
window.onresize = function(){ bgImg();}
function bgImg(){
	$("#content").height($(document).height()-$("#footer").height()-$("#header").height());	
}
function showWord(){
}
