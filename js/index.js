var herdBox=document.getElementById('hard_box');
var box=document.getElementById("box");

herdBox.onmousedown=function(e){
	var e=window.event||e;
	console.log("我按下了"+e.offsetX+"|"+e.offsetY);
	var pageX=e.offsetX;
	var pageY=e.offsetY;
	this.onmousemove=function(e){
		var x=e.clientX-pageX;
		var y=e.clientY-pageY;
		box.style.top=y+"px";
		box.style.left=x+"px";
		console.log("我移动了");
	}
}

herdBox.onmouseup=function(){
	this.onmousemove=null;
	console.log("我放开了");
}
