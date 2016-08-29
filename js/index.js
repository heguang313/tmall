$(function(){
	slidePic();
	scroll();
	/*==========================焦点轮播图==========================*/
	function slidePic () {
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
		loading();
		 /*轮播开始函数*/   
		 function start () {
		 	 timer = setTimeout(function(){
		 	 	fade(index);
		 	 	index++;
		 	 	if (index > num - 1) {
		 	 		index = 0;
		 	 	}
		 	 	start();
		 	 },3000)
		 }
		 /*轮播停止函数*/
		 function stop () {
		 	clearTimeout(timer);
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
				that.attr('index',$index);
				$oLi.on('mouseover',function(){
					if ($inner.is(':animated')) {
						return;
					}
					var myIndex = parseInt($(this).attr('index'));
					fade(myIndex);
					index = myIndex;
				})
			})
		}

		/*Loading效果*/
		function loading () {
			var Img = new Image();
		        Img.onload = function ()
		        {
		            $('.loading').hide();
		            $('.carousel_indicator').show();
		        }
		        Img.src="images/banner0.jpg";
		}
	}
	/*==========================循环滚动字幕==========================*/
	function scroll () {
		var timer = null;
		timer = setTimeout(function () {
			var $scroll = $('.scroll');
			$scroll.each(function () {
				var $p = $(this).find('p'),
				    $target = $p.eq(0),
				    $height = $target.height(),
				    $clone = $target.clone(),
				    $top = $target.css('marginTop');
			    if (!$top) {
			    	$target.marginTop(0);
			    }else{
		    	    $target.animate({marginTop: '-='+$height},'normal',function(){
		    	    	$clone.appendTo($scroll);
		    	    	$target.remove();
		    		});
			    }
			})
			scroll();
		},3000);
		
		
	}
})