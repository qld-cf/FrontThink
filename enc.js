
// $            ---获取ID...
//getByClass    ---获取class标签函数
//getSetStyle   ---获取,修改样式
//getPosClient  ---获取到窗口的距离

//move          ---运动框架			
//ajax          ---ajax框架						
//jsonp         ---jsonp框架        		

//addEvent  	---绑定事件函数
//removeEvent   ---解绑事件函数
//addMouseWheel ---滚轮事件函数
//ready         ---加载事件函数

//setCookie     ---设置缓存			
//getCookie		---获取缓存			
//removeCookie	---删除缓存			

//hashJson		---hash转json		
//jsonHash		---json转hash	

//toggleClass   ---切换class
//hasClass   	---判断class
//addClass   	---添加class
//removeClass   ---删除class	


//获取ID...
function $(id){
	return document.getElementById(id);
}

//获取class标签函数
function getByClass(oParent,sClass){

	if(oParent.getElementsByClass)
	{
		return oParent.getElementsByClass(sClass);
	}
	else
	{
		var aEle = oParent.getElementsByTagName("*");
		var result=[];

		for(var i=0 ;i<aEle.length;i++){
		var tmpArr = aEle[i].className.split(/\s+/g);
			for(var j=0;j<tmpArr.length;j++){
				if(tmpArr[j] == sClass){
					result.push(aEle[i]);
					break;
				}
			}
		}	
		return result;
	}
};

//获取,修改样式
function getSetStyle(){
	if(arguments.length == 2 ){	
		if(typeof arguments[1] == "string"){
			var obj = arguments[0];
			var name = arguments[1];
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else{
				return getComputedStyle(obj,false)[name];
			}
		}
		else if(typeof arguments[1] == "object"){	
			var obj = arguments[0];
			var json = arguments[1];
			for (var key in json) {
				obj.style[key] = json[key];	
			}		
		}
	}
	else if(arguments.length == 3 ){
		var obj = arguments[0];
		var style = arguments[1];
		var value = arguments[2];
		obj.style[style] = value;
	}
}

//获取到窗口的距离;
function getPosClient(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;			
		t+=obj.offsetTop;
		obj=obj.offsetParent;		
	}
	return {left:l,top:t};
}

//运动框架(对象,{属性},{时间,函数,类型})
function move(obj,json,optional){
	optional = optional || {};
	optional.time = optional.time || 300;
	optional.type = optional.type||'ease-out';

	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getSetStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	var count=Math.round(optional.time/30);
	var n=0;
		
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;		
		//办事
		for(var key in json){
			
			switch(optional.type){//计算运动到哪
				case 'linear'://匀速
					var cur=start[key]+n*dis[key]/count;
					break;	
				case 'ease-in'://加速
					var a=n/count;
					var cur=start[key]+dis[key]*(a*a*a);	//加速
					break;	
				case 'ease-out'://减速
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);	//减速
					break;	
			}	
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}	
		if(n==count){//停止条件
			clearInterval(obj.timer);
			optional.fn  && optional.fn();
		}
	},30);
}

//ajax框架 ---> url data  success error timeout type 
function ajax(options){
	
	//-1.	整理options
	options	=	options || {};
	if(!options.url) return;
	options.data = options.data || {};
	options.type = options.type || 'get';
	options.timeout = options.timeout || 0;
	
	//0.整理data
	options.data.t=Math.random();  //根据实际情况改变--->更新速度;
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	var str = arr.join('&');
	
	//1.创建ajax
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if(options.type=='get'){//根据type建立连接，发送请求
		//2.
		oAjax.open('get',options.url+'?'+str,true);
		//3.
		oAjax.send();	
	}else{
		//2.
		oAjax.open('post',options.url,true);
		//设置请求头信息
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		//3.
		oAjax.send(str);	
	}
	
	
	//4.接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				
				options.success && options.success(oAjax.responseText);
			}else{
				options.error && options.error(oAjax.status);	
			}
		}
	};
	
	//5.超时
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时了');
			oAjax.abort();//中断ajax请求
		},options.timeout);
	}	
}

//jsonp框架 ---> url data success error timeout cbKey                 
function jsonp(options){
	//整理options
	options	=	options	||	{};
	if(!options.url) return;
	if(!options.data) return;
	options.cbKey=	options.cbKey || 'cb';
	options.timeout=options.timeout ||	0;
	options.success=options.success ||	null;
	options.error=options.error ||	null;
	
	//整理data 
	var cbValue =  'jsonp'+Math.random(); 
	options.data[options.cbKey]=cbValue.replace('.','');//告诉网上的js回调随机函数名
	
	window[options.data[options.cbKey]]=function(json){
		options.success && options.success(json);
		clearTimeout(timer);
		//删除script标签
		document.getElementsByTagName('head')[0].removeChild(oSc);
		window[options.data[options.cbKey]]=null;//删除用过的函数
	};	
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	options.url = options.url +'?' +arr.join('&');
	//创建script标签，丢到head里面
	var oSc=document.createElement('script');
	oSc.src=options.url;
	document.getElementsByTagName('head')[0].appendChild(oSc);
	
	//超时
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error && options.error();
			//阻止请求 
			window[options.data[options.cbKey]]=function(){};//给个空函数什么都不做
			document.getElementsByTagName('head')[0].removeChild(oSc);
		},options.timeout);
	}
}

//绑定事件函数;
function addEvent(obj,sEvt,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEvt,fn,false);
	}else{
		obj.attachEvent("on"+sEvt,fn);		 
	}
}

//解绑事件函数;
function removeEvent(obj,sEvt,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEvt,fn,false);
	}else{
		obj.detachEvent("on"+sEvt,fn);
	}
}

//滚轮事件函数;
function addMouseWheel(obj,fn){
	var firefox=window.navigator.userAgent.toLowerCase().indexOf('Firefox');
	if(firefox!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);	
	}else{
		obj.onmousewheel=fnWheel;			
	}
	function fnWheel(ev){
		var oEvt=ev||event;
		var down=false;
		if(oEvt.wheelDelta){
			down = oEvt.wheelDelta<0?true:false;
		}else if(oEvt.detail){
			down = oEvt.detail>0?true:false;
		}
		fn(down);
		if(oEvt.preventDefault){
			oEvt.preventDefault();
		}
		return false;
	}
}

//加载事件函数;
function ready(fn){
	if(document.addEventListener)    //高级浏览器
	{
		document.addEventListener("DOMContentLoaded",function(){
			fn && fn();
		},false);
	}
	else                             //IE低版本
	{
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == "complete"){
				fn && fn();
			}
		});
	}
}

//设置缓存
function setCookie(name,value,timeout){
	var d=new Date();
	d.setDate(d.getDate()+timeout);
	document.cookie=name+'='+value+';expires='+d;
}

//获取缓存
function getCookie(name){
	//user=alex; address=外滩18号; user2=ritian
	 var arr=document.cookie.split('; ');
	 for(var i=0;i<arr.length;i++){
		//arr[i]	==	 'user=alex'
		var arr2 = arr[i].split('=');//['user','alex']
		if(arr2[0]==name){
			return arr2[1];	
		}
	 }
	 return '';
}

//删除缓存
function removeCookie(name){
	//引用
	setCookie(name,'',-1);
}

//hash转json
function hashJson(hash){
	hash = hash.substring(1);	
	var arr= hash.split('&');
	var json={};
	for(var i=0;i<arr.length;i++){
		var arr2=arr[i].split('=');	
		json[arr2[0]]=arr2[1];
	}
	return json;
}

//json转hash	
function jsonHash(json){
	var arr=[];
	for(var key in json){
		arr.push(key+'='+json[key]);	
	}
	window.location.hash='#'+arr.join('&');
}

//切换class
function toggleClass(oParent,sClass){
	if( hasClass(oParent,sClass) ){
		removeClass(oParent,sClass)
	}else{
		addClass(oParent,sClass)
	}
}

//判断class
function hasClass(oParent,sClass){
	var re = new RegExp("\\b"+sClass+"\\b");
	return re.test(oParent.className);
}

//添加class
function addClass(oParent,sClass){
	var re = new RegExp("\\b"+sClass+"\\b");
	if(!re.test(oParent.className)){				//要添加的class是否存在
		oParent.className = oParent.className+" "+"box";
	}
	oParent.className = oParent.className.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
}

//删除class
function removeClass(oParent,sClass){
	var re = new RegExp("\\b"+sClass+"\\b");      		//规则
	if(re.test(oParent.className)){
		oParent.className = oParent.className.replace(re,"");  	//删除sClass
		if(!oParent.className){
			oParent.removeAttribute("class");				//删除一个属性名class
		}
	}
	if(oParent.className){									//整理空格
		oParent.className = oParent.className.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
	}
}