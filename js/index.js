$(function(){

	/*==========================焦点轮播图==========================*/
	(function slidePic () {
			var $carousel = $('#carousel'),
			    $inner = $('#carousel .carousel_inner'),
			    $item = $('#carousel .item'),
			    $oL = $('#carousel .carousel_indicator'),
			    $oLi = $('#carousel .carousel_indicator li'),
			    index = 0,//标记
			    timer = null,//初始化计时器
			    num = 6;//切换图片数量
	
			/*绑定开始和停止轮播事件*/
			$carousel.hover(stop,start);
			start();
			circle(); 

			/*轮播开始函数*/   
			function start () {
				 timer = setTimeout(function(){
				 	fade(index);
				 	index++;
				 	if (index > num - 1) {
				 		index = 0;
				 	}
				 	start();
				 },3000)//设置计时器
			}

			/*轮播停止函数*/
			function stop () {
				clearTimeout(timer);//清除计时器
			}
			 
			/*图片切换函数*/
			function fade (Index) {
				$item.eq(Index).fadeIn(500).siblings().fadeOut(500);//主图片变化
				$oLi.eq(Index).addClass('active').siblings().removeClass('active');//小圆点背景变化
			}
	
			/*绑定圆点与图片*/
			function circle () {
				$oLi.each(function(){
					var that = $(this);
					var $index = that.index();
					that.attr('index',$index);//为当前对象创建index属性
					$oLi.on('mouseover',function(){
						if ($inner.is(':animated')) {
							return;
						}
						var myIndex = parseInt($(this).attr('index'));//获取index属性值
						fade(myIndex);
						index = myIndex;
					})
				})
			}
		})();

	/*==========================循环滚动字幕==========================*/
	(function marquee () {
				var timer = null;//初始化变量
				timer = setTimeout(function () {
					var $scroll = $('.scroll');//获取目标对象
					$scroll.each(function () {
						var $p = $(this).find('p'),
						    $target = $p.eq(0),
						    $height = $target.height(),//获取第一部分高度
						    $clone = $target.clone(),//复制第一部分
						    $top = $target.css('marginTop');//获取第一部分的marginTop属性
					    if (!$top) {
					    	$target.marginTop(0);
					    }else{
				    	    $target.animate({marginTop: '-='+$height},'normal',function(){
				    	    	$clone.appendTo($scroll);
				    	    	$target.remove();
				    		});//改变第一部分的marginTop,把复制的内容插入到父元素的最后，再移除第一部分
					    }
					})
					marquee();
				},3000);
			})();

	/*==========================滑动出现==========================*/
	(function slideShow () {
			var $parent = $('.sidebar_right .icon'),
			    $icon_9 = $('.sidebar_right .icon_9');
			$parent.each(function(){
				var $that = $(this);
				var $span = $that.find('span');
				var $two_code = $that.find('.two_code');
				$span.css({left: '-120px',display: 'none'});
				$that.on('mouseover',function(){
					if($that.is(':animated')){
						return;
					}
					$span.show().animate({left: '-90px'},'fast');
					if ($two_code) {
						$two_code.show();
					}
				})
				$that.on('mouseout',function(){
					$span.css({left: '-120px',display: 'none'});
					if ($two_code) {
						$two_code.hide();
					}
				})
			})
		})();

	/*==========================滑条滚动监测==========================*/
	function scrollCheck () {
			var $top = $(window).scrollTop(),
			    $topbar = $('.topbar'),
			    $sidebar_right = $('.sidebar_right .icon_10'),
			    $sidebar_left = $('.sidebar_left');
			//针对头部栏的监测
			if ($top>700) {
				$topbar.show();
			}else{
				$topbar.hide();
			}
			// 针对右侧边栏的监测
			if ($top>0) {
				$sidebar_right.show();
			}else{
				$sidebar_right.hide();
			}
			// 针对左侧边栏的监测
			if ($top>660) {
				$sidebar_left.show();
			}else{
				$sidebar_left.hide();
			}
	};
	$(window).scroll(scrollCheck);
	$(window).load(scrollCheck);

	/*==========================左侧导航栏==========================*/
	(function leadbar () {
		var $oLi = $('.sidebar_left li'),
			$item = $('.item_list'),
			currentId = '';
		$oLi.each(function(){
			var that = $(this);
			var $href = that.find('a').attr('href'),
			    bg_color;
			//导航块的颜色设置在父层li上，a上设置灰色覆盖，当有hover、click事件时，使a的背景色为继承，从而使父层li的颜色显现出来
			that.hover(function(){
				that.find('a').addClass('hover');
			},function(){
				that.find('a').removeClass('hover')
			});
			that.click(function(){
				$oLi.find('a').removeClass('click');
				that.find('a').addClass('click');
			})
		})
		//使左侧导航条跟随滚动条滚动而变化
		$(window).scroll(function(){
			var $scrollTop = $(document).scrollTop();
			$item.each(function(){
				var $m = $(this);
				var $itemTop = $m.offset().top;
				if ($scrollTop > $itemTop - 300) {
					currentId = "#" + $m.attr("id");
				}else{
					return false;
				}
			})
			var $currentLink = $oLi.find('.click');
			if (currentId && $currentLink.attr('href')!=currentId) {
				$currentLink.removeClass('click');
				$oLi.find('[href='+currentId+']').addClass('click');
			};
		})
	})()

	/*==========================瀑布流效果==========================*/
	$(window).load(waterFall);
	function waterFall () {
		var dataInt = {"data":
					    [{"dataIn":
					    	[{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]}]
					    },{"dataIn":
					    	[{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]}]
					    },{"dataIn":
					    	[{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]}]
					    },{"dataIn":
					    	[{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]},
					    	{"item":[{"src":"TB1Dqs9KpXXXXa6XXXXYXGcGpXX_M2.SS2.jpg"},{"p":"[热销]志霞奥迪汽车车衣 A4L A6L<br> TT A3 A5 A7A8L Q3Q5Q7专用铝膜"},{"price_front":"¥ 118"},{"price_behind":".0"}]}]
					    }]
					};  
		var i = 0;
		$(window).scroll(function(){
			if (conditionCheck()) {
				i++;
				if (i<4) {
					addNew(i);
				}else{
					return false;
				}
			}
		});
		function addNew (i) {
	  		var $ul = $('<ul></ul>');
	  		var $level1 = dataInt.data[i];//获取数据
	  		for(var j=0;j<5;j++){
	  			var $level2 = $level1.dataIn[j];
				var $p = $('<p></p>').html($level2.item[1].p);//创建p元素并插入数据
				var $span1 = $('<span></span>').html($level2.item[2].price_front);//创建span元素并插入数据
				var $span2 = $('<span></span>').html($level2.item[3].price_behind);//创建span元素并插入数据
				var $div = $('<div></div>').addClass('description').append($p).append($span1).append($span2);//创建div元素并插入数据
				var $img = $('<img>').attr('src','images/' + $level2.item[0].src);//创建img元素并插入数据
				var $a = $('<a></a>').append($img).append($div);//创建a元素并插入数据
				var $li = $('<li></li>').addClass('box_md').append($a);//创建li元素并插入数据
				$ul.append($li);
	  		}
	  		$('.content_box_j .box_group').append($ul);
		}
	}
	function conditionCheck () {
		var $lastOne = $('.content_box_j ul').last();//获取最后一个ul元素
		var changH = $lastOne.offset().top + $lastOne.outerHeight()/2;//计算动作临界高度
		var nowH = $(window).height() + $(window).scrollTop();//计算实时高度
		return nowH>changH?true:false;
	}
})