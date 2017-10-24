   	$(function(){
   		// 侧边栏菜单伸缩
  		$(".global_module h3").click(function(){
  		    $(this).next().slideToggle(800);
         }); 
         $(".m-expanded span").click(function(){
         	$(this).next("ul").slideToggle()
         })
        // 新闻滚动
         var $this = $(".scrollNews");
		 var scrollTimer; // 计时器
			$this.hover(function(){
				  clearInterval(scrollTimer);
			 },function(){
			   scrollTimer = setInterval(function(){
							 scrollNews( $this );
						}, 1000 );
			}).trigger("mouseleave");  //  模拟事件  鼠标离开自动
        // 图片轮播
             var len  = $(".num > li").length;  
			 var index = 0;
			 var adTimer;
            $(".num li").mouseover(function(){
            	var index=$(this).index();
				var adWidth=$(".ad").width();        	
           	   $(this).addClass("on").siblings().removeClass("on");			 		       	 
           	   $(".slider").stop(true).animate({"left":-adWidth*index},1000);  
			 }).eq(0).mouseover();
			 adTimer=setInterval(function(){
			 	if(index==5){
			 		index=0;
			 		$(".slider").css("left",0);
			 		$(".num li").eq(0).addClass("on").siblings().removeClass("on");
			 	  }	
			 	   if(index==4){
				 		$(".num li").eq(0).addClass("on").siblings().removeClass("on");	
				 	}
	               index++;
				   var adWidth=$(".ad").width();        	
	           	   $(" .num li").eq(index).addClass("on").siblings().removeClass("on");			 		       	 
	           	   $(".slider").stop(true).animate({"left":-adWidth*index},1000);  
			 },3000)
		//滑入停止动画，滑出开始动画.
			 $(".ad").hover(function(){
			 	 clearInterval(adTimer);
			 },function(){
			 	  adTimer=setInterval(function(){
				 	if(index==5){
				 		index=0;
				 		$(".slider").css("left",0);
				 	}
				 	if(index==4){
				 		$(".num li").eq(0).addClass("on").siblings().removeClass("on");	
				 	}
		               index++;
					   var adWidth=$(".ad").width();        	
		           	   $(".num li").eq(index).addClass("on").siblings().removeClass("on");			 		       	 
		           	   $(".slider").stop(true).animate({"left":-adWidth*index},1000);  
				 },3000)
			 })
	    //  左右轮播
		    var page = 1;                               //默认当前的页面是1
		    var i = 4; 								    //每版4个图片
			var len = $(".prolist_content ul li").length;  //li的数量 
			var page_count = Math.ceil(len / i) ;  //总页数(只要不是整数，就往大的方向取最小的整数)
	        var $parent=$(".prolist_content ul");
	        var none_unit_width=1040;		      
		       	  //向右 按钮
			    $(".module_right").click(function(){ 
					if( !$parent.is(":animated") ){
						if(page == page_count ){//已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
							$parent.animate({left:0}, 800); //通过改变left值，跳转到第一个版面
							page = 1;
						}else{
							$parent.animate({ left:'-='+none_unit_width}, 800);  //通过改变left值，达到每次换一个版面
							page++;
						}
					}
			   });
			    //往左 按钮
			    $(".module_left").click(function(){
				    if( !$parent.is(":animated") ){
						if( page == 1 ){//已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
							$parent.animate({ left : '-='+none_unit_width*(page_count-1)}, 800); //通过改变left值，跳转到最后一个版面
							page = page_count;
						}else{
							$parent.animate({ left : '+='+none_unit_width }, 800);  //通过改变left值，达到每次换一个版面
							page--;
						}
					}
			    });
				    
   
	    
		    /*******************详情页***************************/
//选择尺码		   
           $(".pro_size li").click(function(){
           	  $(this).addClass("border").siblings().removeClass("border");
           	  $(".p_size strong").text($(this).text());
           });
//  购物计算
           $("#num_sort").change(function(){
           	   var unit_prize=$(".unit_money strong").text();
           	   $(".pro_price span").text(unit_prize*parseInt(this.options[num_sort.selectedIndex].text));
           })
           
//  选项卡
			$(".tab_menu li").click(function(){
				var index=$(this).index();
				$(this).find("span").addClass("cur").parent().siblings().find("span").removeClass("cur");
				$(".tab_box div").eq(index).show().siblings().hide();
			});
// 商品评分
           //通过修改样式来显示不同的星级
		   star();
		   $("#answer a").each(function(i,ele){
		    	$(this).click(function(){			    		
		    		$(".alert_win").hide();
		    		$(".body_cover").hide();
		    	});
	        })
//  加入购物车
   
//  点击放大
       changesmall("w");         
  
//  选择衣服颜色
	    $("#choose_color li").click(function(){
	    	$(this).addClass("border").siblings().removeClass("border");
	    	      var index=$(this).index();
	    	      var pic_name=['one','two','three'];	
	    	      var pic_num=['one','two']
	    	     if(index==0){
	    	     	$('.imgList li').eq(0).addClass("border").siblings().removeClass("border");
	    	     	var $hasborder=$('.imgList li');	    	     	
	    	     	changeall(this,"b",pic_num[0],pic_name);
	    	     	changesmall("b")
	    	     }else if(index==1){
	    	     	$('.imgList li').eq(0).addClass("border").siblings().removeClass("border");
	    	     	changeall(this,"w",pic_num[1],pic_name)
	    	     	changesmall("w")
	    	     }	           
	    })  ;
//  放大镜
		    $(".jqzoom").jqueryzoom({
				xzoom:300, //放大图的宽度(默认是 200)
				yzoom:300, //放大图的高度(默认是 200)
				offset:-60, //离原图的距离(默认是 10)
				position:"right", //放大图的定位(默认是 "right")
				preload:1   
		    });
//加入购物车
            def();
	        $("#put_cart").click(function () {		       
		       def();
		       $('.body_cover').toggle();
		        $(".modal").toggle();
		         
	      
	        });
		    $(".gobuy a").click(function () {
		    	$('.body_cover').toggle();
		        $(".modal").toggle();
		      
		    });
//  立即购买
            $(".media_buy").click(function(){
            	alert("购买页面仍在开发中...")
            })
	})
//  回调函数	
	  	function scrollNews(obj){
		   var $self = obj.find("ul:first"); 
		   var lineHeight = $self.find("li:first").height(); //获取行高
		   $self.animate({ "marginTop" : -lineHeight +"px" }, 600 , function(){  // 动画排序
		         $self.css({marginTop:0}).find("li:first").appendTo($self); //appendTo能直接移动元素
		   })
		}
	  	  function star(){
	  	  	var num=0  //  初始值    修改代码时全局变量可能发生冲突
			var $rating=$("#rating")
			var $item=$("#rating").find(".rating-item");
			var lightOn=function(num){
				$item.each(function(index){
//					console.log(index)
				if(index<num){
					$(this).css("background-position","-15px top");
				}else{
					$(this).css("background-position","0 top");
				}
			});
			}
			lightOn(num);//  初始化  先点亮0颗星星
			//  事件绑定  （优化  事件委托  子元素事件委托给父元素）
			$item.mouseover(function(){
				lightOn($(this).index()+1);
				$(this).css("background-position","-15px top");
			}).click(function(){				
				num=$(this).index()+1;	
				$('.body_cover').show();
				$(".alert_win").show();
				$(".alert_infor span").text($(this).attr("title"))								
			})
			$("#rating").mouseout(function(){
				lightOn(num)
				$(this).css("background-position","0 top");
			})
	  	  }
		//  颜色换图片
	            function changeall(obj,first_letter,pic_num,pic_name){
	           		$(obj).children("img").attr("src","img/"+first_letter+"_"+pic_num+".jpg");
		    	     	  $(".imgList img").each(function(i){
		    	     	  	 $(this).attr("src","img/"+first_letter+"_"+pic_name[i]+".jpg");		    	     	});	    	     	  
		    	     	  $(".jqzoom img").attr({
		    	     	  	"src":"img/"+first_letter+"_"+pic_name[0]+"_big.jpg",
		    	     	  	"jqimg":"img/"+first_letter+"_"+pic_name[0]+"_big.jpg"
		    	     	  	})
	           	 }
	    //  点击换图片        
                function changesmall(obj){
                	$(".imgList li").click(function(){
		           	      $(this).addClass("border").siblings().removeClass("border");
		           	      var index=$(this).index();
		           	      var arr=['one','two','three'];    
		           	      $(".jqzoom img").attr({
		           	      	"src":"img/"+obj+"_"+arr[index]+"_small.jpg",
		           	      	"jqimg":"img/"+obj+"_"+arr[index]+"_big.jpg"
		           	      	})
		           	      $(".zoomdiv>img").attr("src","img/"+obj+"_"+arr[index]+"_big.jpg")
                     });
                }
         //   轮播图      
	     function turn(obj,time){	   
	     	   	var wrapWidth=$(obj).width();		
		    	var left= $(obj).find("ul").css("left").substring(0,5);
		         if(left<=-1200){
		         	$(obj).find("ul").css({"left":0})
		         }
		   	    $(obj).find("ul").animate({"left":-wrapWidth+"px"},time)
	     }
	     function def(){     	   	     	   	
	     	    $(".modal_title").text( $(".pro_detail_right>h4").text() );
		        $(".modal_color").text( $("#choose_color li.border img").attr('alt') );
		        $(".modal_size").text( $(".pro_size ul li.border span").text() );
		        $(".modal_numbers").text($("#num_sort").val());
		       
	     }
		    	
