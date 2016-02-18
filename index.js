document.addEventListener("readystatechange",function(){
	if(document.readyState==="complete"){
            var audio=document.querySelector("#audio");
            var playpause=document.querySelector("#playpause");
            var yin=document.querySelector("#spanvolumebar");
            var vol=document.querySelector("#spanvolume");
            var volcon=document.querySelector("#spanvolumeop");
            var mute=document.querySelector("#spanmute");
             var state=document.querySelector(".player_bar");
             var statecon=document.querySelector("#spanprogress_op");
             var tiao=document.querySelector("#spanplaybar");
             var tip=document.querySelector(".time_show");
             var qiege=document.querySelector("#qiege");
             var btnPlayway=document.querySelector("#btnPlayway");
             var divselect=document.querySelector("#divselect");
             var clear_list=document.querySelector("#clear_list");
             var divnulllist=document.querySelector("#divnulllist");
             var spansongnum1=document.querySelector("#spansongnum1");
             var btn_del=document.querySelector(".btn_del");
             var btnfold=document.querySelector("#btnfold");
             var divsongframe=document.querySelector("#divsongframe");
             var divplayframe=document.querySelector("#divplayframe");
             var divplayer=document.querySelector("#divplayer");
             var btnclose=document.querySelector("#btnclose");



             // 0 大屏小屏
              var f=true,fs=true;
             spansongnum1.onclick=btnclose.onclick=function(){
              if(f){
                divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity: 1";
                f=false;
                }else{
                divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity: 0";
                f=true;
                }
             }

             btnfold.onclick=function(){
              if(fs){
                if(f==false){
                divplayframe.style.cssText="transition:opacity 0.3s ease 0s;opacity: 0";
                divplayer.classList.add("m_player_folded");
                divplayer.style.cssText="transition:left 0.6s ease 0.3s;left:-540px";
                }
                else{
                divplayer.classList.add("m_player_folded");
                divplayer.style.cssText="transition:left 0.6s ease 0s;left:-540px";
                }
                fs=false;
              }
              else{
                divplayer.classList.remove("m_player_folded");
                divplayer.style.cssText="transition:left 0.6s ease 0s;left:0px";
                fs=true;
              }
             }
             divplayer.style.cssText="transition:left 0.6s ease 0s;left:0px";
            // 1 播放 暂停
            	btnplay.onclick=function(){
                 if(audio.paused){
            	audio.play();
             	}
             	else{
                   audio.pause();
                  }
            }
            audio.onplay=function(){
            	btnplay.className="pause_bt";
            }
            audio.onpause=function(){
            	btnplay.className="play_bt";
            }
            // 2 音量
            vol.onclick=function(ev){
            	var v=ev.offsetX/this.offsetWidth;
            	audio.volume=v;
            }
            audio.onvolumechange=function(){
            	var r=audio.volume*100;
            	volcon.style.left=r+"%";
            	yin.style.width=r+"%";
            	if(audio.volume===0){
            		mute.className="volume_mute";
            	}
            	else{
            		mute.className="volume_icon";
            	}
            }
            volcon.onclick=function(ev){
            	ev.stopPropagation();
            }
            // 3 静音
             mute.onclick=(function(){
             	var old;
            	 return function(){
            	 	if(audio.volume!==0){
            	 		old=audio.volume;
            	 		audio.volume=0;
			}
            	 	else{ 
            	 		audio.volume=old;
            	 	}
            	 }
             })()
             // 4 播放进度条
             state.onclick=function(ev){
             	var rate=ev.offsetX/this.offsetWidth*audio.duration;
             	audio.currentTime=rate;
             }
             audio.ontimeupdate=function(){
             	var l=this.currentTime/this.duration*100;
             	statecon.style.left=l+"%";
             	tiao.style.width=l+"%";
                  if(audio.ended){
                        if(curbfms==SXBF){
                              if(currentsongindex!==yinyueku.leftngth-1){
                                    nextsong();
                              }
                        }
                        else if(curbfms==LBXH){
                              nextsong();
                        }
                        else if(curbfms==SJBF){
                              randomsong();
                        }
                        else if(curbfms==DQXH){
                              audio.play();
                        }
                  }
             }

             var randomsong=function(){
                  currentsongindex=Math.floor(Math.random()*yinyueku.length);
                  audio.src=yinyueku[currentsongindex].src;
                  audio.play();
                  onsongchange();
             }
             // 5 时间
             state.onmouseover=function(ev){
             	tip.style.display="block";
             	var time;
             	 state.onmousemove=function(ev){
	             	tip.style.left=ev.offsetX-tip.offsetWidth/2+"px";
	             	time=ev.offsetX/this.offsetWidth*audio.duration;
	             	tip.innerHTML=zhuanhuan(time);
	             }
             }
             state.onmouseout=function(){
             	tip.style.display="none";
             }
             statecon.onmouseover=function(ev){
            	ev.stopPropagation();
            }
            statecon.onclick=function(ev){
            	ev.stopPropagation();
            }
             var zhuanhuan=function(time){
             	var fen=parseInt(time/60);
             	var miao=parseInt(time%60);
             	return fen+":"+miao;
             }

             // 6 切歌
             /*qiege.onclick=function(){
             	audio.src="../萌萌哒天团 - 你是我的天.mp3";
             	audio.play();
             }
              */
              
             // 7 音乐库
             var yinyueku=[
             {name:"萌萌哒天团 - 你是我的天",src:"./music/mmd.mp3",geshou:"萌萌哒天团",duration:"3:13"},
             {name:"莫爱河往生 - 莫爱河往生-心的构造《蜀山战纪》片尾曲",src:"./music/sszj.mp3",geshou:"莫爱河往生",duration:"3:59"},
             {name:"小曲儿 - 上邪",src:"./music/sy.mp3",geshou:"小曲儿",duration:"4:13"},
             {name:"董贞 - 逍遥叹",src:"./music/xyt.mp3",geshou:"董贞",duration:"4:53"}
             ];
             var lis=divsonglist.firstElementChild.children;
             var currentsongindex;
             var creatlist=function(){
                  var el="";
                  for(var i=0;i<yinyueku.length;i++){
                       var ac=(i==currentsongindex)?"play_current":"";
                        el+='<li mid="j0" class='+ac+' data-src="'+i+'"><strong class="music_name">'+yinyueku[i].name+'</strong><strong class="singer_name">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢"name="myfav_003mrtuf046hAM"mid="003mrtuf046hAM"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
                  }
                  divsonglist.firstElementChild.innerHTML=el;
                  spansongnum1.firstElementChild.innerHTML=yinyueku.length;
                   for(var i=0;i<lis.length;i++){
                        lis[i].index=i;
                        lis[i].onclick=function(){
                              //audio.src=this.getAttribute("data-src");
                              audio.src=yinyueku[this.index].src;
                              currentsongindex=this.index;
                              audio.play();
                              onsongchange();
                        }
                        lis[i].onmouseover=function(){
                              this.classList.add("play_hover");
                        }
                        lis[i].onmouseout=function(){
                              this.classList.remove("play_hover");
                        }
                   }
                   var des=document.querySelectorAll(".btn_del");
                   for(var i=0;i<des.length;i++){
                        des[i].index=i;
                        des[i].onclick=function(ev){
                              ev.stopPropagation();
                              var newarr=[];
                              for(var j=0;j<yinyueku.length;j++){
                                    if(yinyueku[this.index]!=yinyueku[j]){
                                          newarr.push(yinyueku[j]);
                                    }
                              }
                              yinyueku=newarr;
                              if(this.index<currentsongindex){
                                     this.index-=1;
                                    currentsongindex-=1;
                              }
                              creatlist();
                              if(this.index==currentsongindex){
                                    if(this.index==yinyueku.length){
                                          audio.src=" ";
                                          reset();
                                    }
                                    else{
                                          audio.src=yinyueku[currentsongindex].src;
                                          audio.play();
                                          onsongchange();
                                    }
                              }
                              if(yinyueku.length==0){
                               divnulllist.style.display="block";
                               }
                        }
                   }
             }
             creatlist();
             	var onsongchange=function(){
             		for(var i=0;i<lis.length;i++){
                                          lis[i].classList.remove("play_current");
             		}
             		lis[currentsongindex].classList.add("play_current");
		             var cu=yinyueku[currentsongindex];
		             document.querySelector(".music_name").innerHTML=cu.name;
		             document.querySelector(".singer_name").innerHTML=cu.geshou;
                                                   document.querySelector(".play_date").innerHTML=cu.duration;
		             document.querySelector(".music_op").style.display="block";
             	}

             	// 8 下一首
             	var nextsong=function(){
             		if(currentsongindex==undefined) {return};
                        if(curbfms==SJBF){
                              randomsong();
                              return;
                        }
                        else{
                              currentsongindex+=1;
                        currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
                        audio.src=yinyueku[currentsongindex].src;
                         audio.play();
                         onsongchange();
                        }
             	}
                   document.querySelector(".next_bt").onclick=nextsong;

                   // 9 上一首
                   var prevsong=function(){
             		if(currentsongindex==undefined) {return};
                         if(curbfms==SJBF){
                              randomsong();
                              return; 
                        }
                        else{
             		currentsongindex-=1;
             		currentsongindex=(currentsongindex==-1)?yinyueku.length-1:currentsongindex;
             		audio.src=yinyueku[currentsongindex].src;
                         audio.play();
                         onsongchange();
                   }
             	}
                   document.querySelector(".prev_bt").onclick=prevsong;

                   // 10 播放模式
                   var DQXH=1,SXBF=2,LBXH=3,SJBF=4;
                   var curbfms=LBXH;
                   btnPlayway.onclick=function(){
                        divselect.style.display="block";
                   }
                   setbfms=function(num){
                        curbfms=num;
                        divselect.style.display="none";
                        var data={
                              1:"cycle_single_bt",    //单曲循环
                              2:"ordered_bt",          //顺序播放
                              3:"cycle_bt",              //列表循环
                              4:"unordered_bt"       //随机播放
                        }
                        btnPlayway.className=data[num];
                   }

                   // 11 清空列表
                   clear_list.onclick=function(){
                        yinyueku=[];
                        creatlist();
                        reset();
                   }
                   var reset=function(){
                         document.querySelector(".music_name").innerHTML='<span>听我想听的歌！</span><a href="javascript:;" class="icon_radio">电台</a>';
                         document.querySelector(".singer_name").innerHTML="<span>QQ音乐</span>";
                         document.querySelector(".play_date").innerHTML="";
                         document.querySelector(".music_op").style.display="none";
                         audio.src="";
                         statecon.style.left="0%";
                         tiao.style.width="0%";
                         btnplay.className="play_bt";
                         btnplay.onclick=function(){
                              return;
                         }
                         if(yinyueku.length==0){
                         divnulllist.style.display="block";
                         }
                   }


                   // 12 单个删除





















	}
},false)