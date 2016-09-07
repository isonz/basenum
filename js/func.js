$(document).ready(function(){
	$("#closePOPBox").click(function(){
		hideMask();
	});		   
});

//显示按钮
function showMask() {
	$("#bgTransparent").show();
	$("#bgMask").show();
	$("#closePOPBox").show();
}
//关闭按钮
function hideMask() {
	$('#bgMask').hide();
	$('#bgTransparent').hide();
	$('#closePOPBox').hide();
}

//滚动到底部或顶部
function scrollTop(){return $("html, body").animate({scrollTop: 0},"slow"),!1}
function scrollBottom(){return $("html, body").animate({scrollTop: $(document).height()},"slow"),!1}

//禁止右键和复制
function keyEvent(){
	document.oncontextmenu=function(){return false;}
	document.onmousedown=function(){if(event.button==2)return false;}
	document.onkeydown = function(){if(window.event && window.event.keyCode == 123){event.keyCode=0;event.returnValue=false;}}
}

//BANNER轮播
function showBanner(){
	var _bodies = $("#banners img");
	if(_bodies.length < 1) return false;
	$("#banners").append('<dl id="slide_b" class="clearfix"><dt class="hover"></dt></dl>');
	for(var i=1; i<_bodies.length; i++) $("#slide_b").append('<dt class=""></dt>');
	_bodies.eq(0).show();
	var defaultOpts = { interval: 3000, fadeInTime: 800, fadeOutTime: 800 };
	var _slide_b = $("dl#slide_b");
	_slide_b.css("margin-left",-(_slide_b.width()/2)+"px");
	var _titles = $("dl#slide_b dt");
	var _count = _titles.length;
	var _current = 0;
	var _intervalID = null;
	var stop = function () { window.clearInterval(_intervalID);};
	var slide = function (opts) {
		if (opts) {
			_current = opts.current || 0;
		} else {
			_current = (_current >= (_count - 1)) ? 0 : (++_current);
		};
		_bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function () {
			_bodies.eq(_current).fadeIn(defaultOpts.fadeInTime,function(){
				$("#banners").css('background','url("'+_bodies.eq(_current).attr("src")+'") center center no-repeat');
			}).css("display","block");
			_bodies.removeClass("cur").eq(_current).addClass("cur");
			var wwidth = $(window).width();
			var bwidth = _bodies.width();
			if(bwidth > wwidth) _bodies.css('margin-left', -(bwidth-wwidth)/2+'px');
		});
		_titles.removeClass("hover").eq(_current).addClass("hover");
	};
	var go = function () {
		stop();
		_intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
	};
	var itemMouseOver = function (target, items) {
		stop();
		var i = $.inArray(target, items);
		slide({ current: i });
	};
	_titles.hover(function () { if ($(this).attr('class') != 'cur') { itemMouseOver(this, _titles); } else { stop(); } }, go);
	_bodies.hover(stop, go);
	go();
	
	/*
	#banners{height:601px; width:100%; position:relative; overflow:hidden;background:url(../image/banner1.png) center center no-repeat; text-align:center;}
	#banners img{display:none; margin:0 auto;}
	#banners img.first{display:block; left:50%; position:absolute; margin-left:-960px;}
	#banners img.cur{left:0;}
	#banners dl{ position:absolute; bottom:20px; left:50%;}
	#banners dl dt{float: left; display: block; margin-left: 12px; width: 20px; height: 20px; border: 1px #ba44ad solid; border-radius: 50%;  -ms-border-radius: 50%; cursor: pointer;}
	#banners dl dt.hover { border-radius: 50%; background: #ba44ad;}
	*/
}

//js生成随机数n表示生成几位的随机数
function jsRand(n) {
	var jschars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*61);
        res += jschars[id];
    }
    return res;
}

//分页
function pageListli(url, page, pagesize)
{
	$("#paged ul").html('');
	var pagedlis =  eval($.cookie("pagedlis"));
	for(var i=0; i<pagedlis.length; i++){
		if('<<'==pagedlis[i]){
			$("#paged ul").append('<li><a href="'+url+'page='+(page-1)+'&pagesize='+pagesize+'">'+pagedlis[i]+'</a></li>');
		}else if('>>'==pagedlis[i]){
			$("#paged ul").append('<li><a href="'+url+'page='+(page+1)+'&pagesize='+pagesize+'">'+pagedlis[i]+'</a></li>');
		}else if(page == pagedlis[i]){
			$("#paged ul").append('<li><a href="'+url+'page='+ pagedlis[i] +'&pagesize='+pagesize+'" class="active">'+pagedlis[i]+'</a></li>');
		}else{
			$("#paged ul").append('<li><a href="'+url+'page='+ pagedlis[i] +'&pagesize='+pagesize+'">'+pagedlis[i]+'</a></li>');
		}
	}
}

//动态加载样式内容：loadStyle("*{margin:0px;}");
function loadStyle(styleText){
    var s = document.createElement("style");
    s.type = "text/css";
    try{//IE
        s.styleSheet.cssText = styleText;
    }catch(e){//FF Chrome
        s.appendChild(document.createTextNode(styleText));
    }
    document.getElementsByTagName("head")[0].appendChild(s);
}
//动态加载样式文件：loadStyleFile("../CSS/Common.css");
function loadStyleFile(url){
    var s = document.createElement("link");
    s.href = url;
    s.type = "text/css";
    s.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(s);
}
//加载脚本内容：loadScript("function test(){alert(123);}");
function loadScript(scriptText){
    var s = document.createElement("script");
    s.type = "text/javascript";
    try {//IE
        s.text = scriptText;
    } catch (e) {//FF Chrome
        s.appendChild(document.createTextNode(scriptText));
    }
    document.body.appendChild(s);
}
//加载脚本文件：loadScriptFile("../JS/Common.js");
function loadScriptFile(url){
    var s = document.createElement("script");
    s.src = url;
    s.type = "text/javascript";
    document.body.appendChild(s);
}

//把字符串安装字典正序排序
function dictSortStr(str)
{
	var strArray = new Array();
	for(var i=0; i<str.length; i++){
		strArray.push(str[i]);
	}
	strArray = strArray.sort();
	str = '';
	for(var i=0; i<strArray.length; i++){
		str += strArray[i];
	}
	return str;
}

//获取URL里的参数 var request = getRequest(); 参数1 = request['参数1']; 串is_return_key是否返回参数名
function getRequest(url, is_return_key) { 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) {
		var str = url.split("?");
		str = str[1].substr(0); 
		if(is_return_key) return str;
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	}
	return theRequest; 
}

//循环读取一维JSON对象变成字符串is_return_key是否返回参数名:readJsonToString({'a':1}, false);
function oneJsonToString(json_data, is_return_key){
	var str = '';
	for(var o in json_data){
		if(is_return_key){
			str += o +":"+ json_data[o];
		}else{
			str += json_data[o];
		}
	}
	return str;
}

//自动播放图片
function plays(id_class, num)
{
    this.timer = null;
    this.id_class = id_class;
    this.num = num;
    this.curr_num = 0;
    this.z_index = 1;

    this.autos = function () {
        if(this.curr_num > this.num) this.curr_num = 0;
        $(this.id_class).eq(this.curr_num).css({'z-index':this.z_index}).hide().fadeIn(1000);
        this.curr_num++;
        this.z_index++;
    }

	/* 用法：
	var golf = new plays('.lunbo', 9); //标记名，最大数量
	golf.autos(); golf.timer = setInterval(function(){golf.autos();}, 3000);
	$('#lunbo').mouseenter(function(){clearInterval(golf.timer);}).mouseleave(function(){golf.timer = setInterval(function(){golf.autos();}, 3000);});
	<div id="lunbo"><div class="lunbo"></div><div class="lunbo"></div></div>
	*/
}
