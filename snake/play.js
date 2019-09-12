;(function(){
	var els=[];
	var position = 'absolute';
	function Food(x,y,width,heigth,color){
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 20;
		this.height = heigth || 20;
		this.color = color || 'pink';
	}
	
	Food.prototype.render=function(map){
		del();
		var div = document.createElement('div');
		map.appendChild(div);
		els.push(div);
		this.x = parseInt(Math.random() * map.offsetWidth /this.width) * this.width;
		this.y = parseInt(Math.random() * map.offsetHeight /this.height) * this.height;
		div.style.position=position;
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width +'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor=this.color;
		
	}
	
	function del(){
		var i = els.length - 1;
		  for(; i >= 0; i--) {
		    // 删除页面上渲染的蛇
		    els[i].parentNode.removeChild(els[i]);
		    // 删除elements数组中的元素
		    els.splice(i, 1);
		  }
	}
	
	window.Food=Food;
}
)()

;(function(){
	var position = 'absolute';
	var els=[];
	function Snake(width,height,direction){
		this.width = width || 20;
		this.height = height || 20;
		this.direction = direction || 'right';
		this.body = [
			{x : 4 ,y : 2 ,color:'#555'},
			{x : 3,y : 2 ,color:'red'},
			{x : 2,y : 2 ,color:'red'}
		]
	}
	Snake.prototype.render=function(map){
		delSanke();
		
		for(var i=0 ;i <this.body.length;i++){
			var obj=this.body[i];
			var div=document.createElement('div');
			map.appendChild(div);
			div.style.position=position;
			div.style.left = (obj.x * this.width) + 'px';
			div.style.top = (obj.y * this.height) +  'px';
			div.style.width = this.width +'px';
			div.style.height = this.height + 'px';
			div.style.backgroundColor=obj.color;
			els.push(div);
		}
	}
	Snake.prototype.move = function(map,food){
		var herdX = this.body[0].x * this.width;
		var herdY= this.body[0].y * this.height;
		for(var i=this.body.length - 1; i>0 ;i--){
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}
		switch (this.direction){
			case 'right':
			    this.body[0].x+=1;
				break;
			case 'left':
			    this.body[0].x-=1;
				break;
			case 'top':
			    this.body[0].y-=1;
				break;
			case 'bottom':
			    this.body[0].y+=1;
				break;
			default:
				break;
		}
		if(herdX === food.x && herdY ===food.y){
			var last = this.body[this.body.length -1];
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			})
			food.render(map);
		}
		
	}
	
	function delSanke(){
		var i = els.length - 1;
		  for(; i >= 0; i--) {
		    // 删除页面上渲染的蛇
		    els[i].parentNode.removeChild(els[i]);
		    // 删除elements数组中的元素
		    els.splice(i, 1);
		  }
	}
	
	window.Snake=Snake;
})()

;(function(){
	var that;
	function Game(map){
		this.food=new Food();
		this.snake=new Snake();
		this.map=map;
		that=this;
	}
	
	Game.prototype.start= function(){
		this.food.render(this.map);
		this.snake.render(this.map);
		bindKey();
		runSnake();
	}
	
	function runSnake(){
		var maxX = that.map.offsetWidth / that.snake.width;
		var maxY = that.map.offsetHeight / that.snake.height;
		var time = setInterval(function(){
			that.snake.move(that.map,that.food);
			that.snake.render(that.map);
			var body=that.snake.body;
			if(body[0].x < 0 || body[0].y < 0 || body[0].x >=maxX || body[0].y >=maxY){
				clearInterval(time);
				alert('Game over');
			}
			for(var j=1 ;j <=body.length-1;j++){
				if(body[0].x == body[j].x && body[0].y == body[j].y ){
					clearInterval(time);
					alert('Game over');
				}
			}
		},140);
	}
	
	function bindKey(){
		document.addEventListener('keydown',function(e){
			var key=e.keyCode;
			var d=that.snake.direction;
			if(key==37 && d!='right'){
				that.snake.direction='left';
			}
			if(key==38 && d!='bottom' ){
				that.snake.direction='top';
			}
			if(key==39 && d!='left'){
				that.snake.direction='right';
			}
			if(key==40  && d!='top'){
				that.snake.direction='bottom';
			}
		})
	}
	
	window.Game=Game;
})()

;(function(){
	var map=document.getElementById('map');
	var gm=new Game(map);
	gm.start();
})()
