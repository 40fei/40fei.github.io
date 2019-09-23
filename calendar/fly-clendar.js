;(function($){
	$.fn.extend({
		'calendar':function(){
			//初始化
			this.append('<div class="herder"><span id="prev">&lt;</span><span id="next">&gt;</span><h4>2019年5月</h4></div>')
				.append('<div class="title">日</div>')
				.append('<div class="title">一</div>')
				.append('<div class="title">二</div>')
				.append('<div class="title">三</div>')
				.append('<div class="title">四</div>')
				.append('<div class="title">五</div>')
				.append('<div class="title">六</div>');
			for(var i=0 ; i< 42;i++){
				this.append('<div class="item"></div>');
			}
			
			//
			var nowDate=new Date();
			var year=nowDate.getFullYear();
			var moth=nowDate.getMonth();//从0开始算
//			var mDays=new Array(31,28+isLeap(year),31,30,31,30,31,31,30,31,30,31);
				var mDays=function(m){
					if(m<0){
						m=11;
					}else if(m>11){
						m=0;
					}
					switch (m){
						case 0:
						case 2:
						case 4:
						case 6:
						case 7:
						case 9:
						case 11:
							return 31;
							break;
						case 2:
							return 28+isLeap(year);
						default:
							return 30;
							break;
					}
				}

				function show(){
					//确定当月份1号为星期几
					var nlast=new Date(year,moth,1);
					var flastWeak=nlast.getDay();
					//清空次显示的样式
					$('herder>h4').text('');
					$('.item').text('').removeClass('active').removeClass('othermonth');					
					$('.herder>h4').text(year+'年'+(moth+1)+'月');
					
					//单前月
					var nowday=1;
					var nextday=1;
					var prevStart= (mDays(moth-1))-flastWeak+1;
					console.log(mDays(moth-1));
					for(var i=0;i<$('.item').length;i++){
						if(i>=(mDays(moth)+flastWeak)){//显示下个月前几天
							$('.item').eq(i).text(nextday).addClass('othermonth');	
							nextday++;
						}else if(i<flastWeak){//显示上个月后几天
							$('.item').eq(i).text(prevStart).addClass('othermonth');
							prevStart++;
						}else{//当前月
							$('.item').eq(i).text(nowday);
							nowday++;
							//判断是否为单前日期
							if(i==nowDate.getDate() && moth==nowDate.getMonth() && year==nowDate.getFullYear()){							
								console.log(moth==nowDate.getMonth());
								$('.item').eq(i).addClass('active');
							}
						}
					}
				}
				
				
				//数组确定有多少天
				
				
				//判断是否为闰年
				function isLeap(year){
					if(year % 100==0){
						if(year % 400==0){
							return 1;
						}else{
							return 0
						}
					}else{
						if(year % 4==0){
							return 1;
						}else{
							return 0;
						}
					}
				}
				
				show();
				$('#prev').click(function(){
					if(moth==0){
						moth=11;
						year--;
					}else{
						moth--;
					}
					show();
				})
				$('#next').click(function(){
					if(moth==11){
						moth=0;
						year++;
					}else{
						moth++;
					}					
					show();
				})
				
				return this;
		}
	}
		
	);
})(jQuery);


$(document).ready(function(){
	$('#calendar').calendar().css('backgroundColor','#000');
})