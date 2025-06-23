var noti=op(".noti"),timxx=false,
conN=true,
notiTop=op(".noti .top"),
seen=localStorage.getItem("notifier3") || false,
notifier3ClTim=Number(localStorage.getItem('notifier3ClTim')) || 0;

notiTop.onclick=closeNoti;

function closeNoti(){
	noti.classList.toggle("active");
	clearTimeout(timxx);
	if(!noti.classList.contains("active") && conN){
		send("/...Closed Notifier");
		localStorage.setItem("notifier3ClTim",++notifier3ClTim)
	}
}

timxx=setTimeout(()=>{
	if(!seen && aiLoadedNum >2 && notifier3ClTim<2){
		noti.classList.add("active");
	}
},1000);

function openNotiLnk(el){
	localStorage.setItem("notifier3",true);
	noti.classList.remove('active')
	conN=false;
	el.children[0].click()
}
resetFormat();

if(!toAskPro()){
	noti.style.display="none";
}

function onSwipe(elem,fun,direction=false){
	elem.addEventListener("touchmove",e=>{e.preventDefault()})
	elem.addEventListener('touchmove',check,{passive: false});
	var cordAry=[],final=[],
	obj={
		'-1':["right","down"],
		'1':["left","up"],
	};

	function check(e){
		e.cancelable=true;
		e.preventDefault();
		elem.removeEventListener('touchmove',check);
		var cord=e.touches[0];

		cordAry.push([cord.clientX,cord.clientY]);
		if(cordAry.length>=2){
			var sub=[cordAry[0][0]-cordAry[1][0],cordAry[0][1]-cordAry[1][1]];
			sub.map((val,n)=>{
				sub[n]=(val>=0)?1:-1;
			});
			final=[obj[sub[0]][0],obj[sub[1]][1] ];

			if(direction){
				if(final.includes(direction)){eval(fun+`("${final}")`);}
			}else{
				eval(fun+`("${final}")`);
			}
		}else{
			setTimeout(()=>{
				elem.addEventListener('touchmove',check,{passive: false});
			},10);
		}
	}
}
onSwipe(noti,"swiped");
function swiped(dir){
	if(dir.includes("up")){
		noti.classList.add("active");
	}else{
		closeNoti();
	}
	onSwipe(noti,"swiped");
}