/*++++++++ PLAYER.JS actually its+++++++++++*/
var log=console.log,
domain="https://ai-playerx.netlify.app/";

/*dom elements*/
var video=op(".videoBox video"),
vidPan=op(".vidPan"),
videoBox=op(".videoBox"),
playBtn=op("#playBtn"),
nextBtn=op("#nextBtn"),
prevBtn=op("#prevBtn"),

controlBox=op(".controls"),
speedIco=op('.speedIco'),
changePan= op('.changePan'),
helpIco=op("#helpIco"),

downBtn=opp(".downBtn"),
downBtn1=downBtn[0],
downBtn2=downBtn[1],

duration={
	line: op(".linePan"),
	lineReal: op(".linePan .line"),
	filled: op('.linePan .filled'),
	percentage: 0
},

fullScrPan=op('.fullScrPan'),

speed={
	line: op('.speedChPan'),
	filled: op('.filledLine'),
	percentage: 25
},

speedBtn=op("#speedIco"),
speedChPan=op('.speedChPan'),
stoppedPropagation=[playBtn,nextBtn,prevBtn,duration.line,speed.line,...opp(".topBtn div")],

messBox=op('.messBox'),
frs=opp(".top .fr"),

timeBox={
	played: op("#playTime"),
	total: op("#totalTime")
},

quality={
	btn: op("#qualityIco"),
	options: [480,720,1080],
	choosen: 480,
	showOptions:()=>{
		let htmlxx=``;
		for(val of quality.options){
			htmlxx+=`<div class="option" ff="glory" onclick="applyQuality(${val});">${val}p</div>`
		}
		htmlxx+="";
		op("#qlOpt").innerHTML=htmlxx;
		op("#qlBox").classList.add("active");

		setTimeout(()=>{
			document.addEventListener("click",removeQbox);
		},100)
		function removeQbox(){
			if(op("#qlBox").classList.contains("active")){
				op("#qlBox").classList.remove("active");
				document.removeEventListener("click",removeQbox);
			}
		}
	}
}
;

var elems,
playing=false,
linePercent=0,
fullScr=false,
at,
atResetTimeOut,
reset=true,/*reset var is "false" while change in current Duration or speed*/
controlActiveTime,
currentActive,
vidSpeed=1,
sAndB={
	sound: 100,brightness: 50
},
lastStoredPtforTouch,
brightVolTarget,
skipTimeStamp=0,
skipping=0,
skipResetTime,
aiLoadedNum=Number(localStorage.getItem("aiLoadedNum")) || 1,
experienceMin=Number(localStorage.getItem("experienceMin")) || 0,
movieExp=Number(localStorage.getItem("movieExp")) || 0;

/*varaibles are over*/


/*making the player ready*/
playBtn.innerHTML=elems.play;
nextBtn.innerHTML=elems.next+"<span fs='.6em'>10s</span>";
prevBtn.innerHTML=elems.previous+"<span fs='.6em'>10s</span>";
speedBtn.innerHTML=elems.speed;
quality.btn.innerHTML=elems.quality;
quality.btn.style.display="none";


speedIco.addEventListener('click',e=>{
	e.stopPropagation();
	speedChPan.classList.add('active');
	controlBox.classList.remove('active');
	videoBox.removeEventListener('mousemove',addMsMoveToCon);
})


function applyQuality(val){
	let sr=video.src,curTm=video.currentTime;
	sr=sr.replaceAll("480",val).replaceAll("720",val).replaceAll("1080",val);
	
	video.src=sr;
	video.currentTime=curTm;
}

/*pause play*/
playBtn.addEventListener('click',()=>{
	playPause();
});

/*line making*/
[speed.line,duration.line].forEach(val=>{
	val.addEventListener("touchmove",changeLine);
	val.addEventListener("click",changeLine);

	val.addEventListener("mousedown",()=>{
		document.addEventListener('mousemove',changeLine);
	})
})

document.addEventListener("mouseup",()=>{
	document.removeEventListener('mousemove',changeLine)
})


var fullScrAdOpened=false;
fullScrPan.addEventListener('click',(e)=>{/*full screen event*/
	if(fullScr){
		document.exitFullscreen();
	}else{
		videoBox.requestFullscreen({navigationUI: "hide"});
	}
	fullScr=!fullScr;
	try{
		if(!fullScrAdOpened){
			fullScrAdOpened=true;
			setTimeout(()=>{
				openProAd(true);
			},10*60*1000);/*CHANGE HERE*/
		}
	}catch{}
	try{screen.orientation.lock("landscape-primary");}catch{}
})

checkEventToControl();

/*stop unwanted control off*/
stoppedPropagation.forEach(val=>{
	val.addEventListener('click',(e)=>{
		e.stopPropagation();
		resetControlTime();
	})
})

frs.forEach(val=>{
	val.addEventListener('touchmove',soundAnBright);
	val.addEventListener('click',doubleClick);
},true)










/*=============> FUNCTIONS <=============*/

function doubleClick(e){
	e.stopPropagation();

	if(skipTimeStamp> e.timeStamp-250){
		clearTimeout(tempTime);
		skip(e.target.getAttribute('skipTime'))
		controlBox.classList.remove("active")
	}else{
		tempTime=setTimeout(()=>{
			controlBox.click();
		},250)	
	}
	skipTimeStamp=e.timeStamp;
}

function skip(time){
	justSkip(time);

	clearTimeout(skipResetTime);
	
	skipResetTime=setTimeout(()=>{
		skipping=0;
		message(null)
	},500)

}

function justSkip(time){
	var sum=skipping+time;
	video.currentTime+=eval(time);
	sum=eval(sum)
	message(sum+'s');
	skipping=sum;
}

function soundAnBright(e){/*to change the sound and brightness*/
	e.preventDefault();
	var elem=this,
	brightVolTarget=elem.getAttribute("forWhat"),
	y=getCordinates(e,e.target.parentElement)['clientY'];


	y=Math.floor(y/elem.offsetWidth*100);

	var changes=(lastStoredPtforTouch-y);
	sAndB["soundChanger"](changes,brightVolTarget);
	lastStoredPtforTouch=y;
	resetTounchMovePt();
}

sAndB.soundChanger=(val,forWhat)=>{
	if(val){
		sAndB[forWhat]+=val;
		if(sAndB[forWhat]<0){
			sAndB[forWhat]=0;
		}
		if(sAndB[forWhat]>100){
			sAndB[forWhat]=100;
		}

		video.volume=sAndB.sound/100;
		video.style.filter=`brightness(${sAndB.brightness/100*2})`;
		message(sAndB[forWhat],elems[forWhat]);
	}
}

function getCordinates(event,parentPosi=at.line.getBoundingClientRect()){/*returns the x y points for mouse move and touch move*/
	var obj={},
	e=(event.type=="touchmove")?event.touches[0]:event,
	datas=["clientX","clientY","screenX","screenY","pageX","pageY"];

	for(val of datas){
		obj[val]=e[val];
	}
	obj.offsetX=obj.clientX-parentPosi.left;
	obj.offsetY=obj.clientY-parentPosi.top;
	
	return obj
}


function message(text,elem=''){
	if(text){
		messBox.classList.add('active');
		messBox.innerHTML=elem + text;
		controlBox.classList.remove('active');
		currentActive=messBox;
		resetControlTime();
	}else{
		messBox.classList.remove('active')
	}
}

/*addActive class onclick*/
function checkEventToControl(){/*checks the touchscreen and adds the event listener*/
	videoBox.addEventListener('click',addMsMoveToCon);
	if(is_touch_enabled()){
		videoBox.removeEventListener('mousemove',addMsMoveToCon);
	}else{
		videoBox.addEventListener('mousemove',addMsMoveToCon);
	}
}

function addMsMoveToCon(){
	addActive(op('.controls'),'add');
}

function addActive(target=controlBox, act='toggle'){
	currentActive=target;

	if(currentActive==controlBox && this.event.type=="click" && currentActive.classList.contains('active')){
		currentActive.classList.remove('active');
		addActiveTimeCalled=this.event.timeStamp;
		return;
	}
	currentActive.classList[act]('active');
	resetControlTime();
	messBox.classList.remove('active');
	if(speedChPan.classList.contains('active')){
		checkEventToControl();
		speedChPan.classList.remove('active');
	}
}


function resetControlTime(){
	clearTimeout(controlActiveTime);

	controlActiveTime=setTimeout(()=>{
		currentActive.classList.remove('active');
	},3000);
}

var touchMoveTime;
function resetTounchMovePt(){
	clearTimeout(touchMoveTime);

	touchMoveTime=setTimeout(()=>{
		lastStoredPtforTouch=undefined;
	},100);
}

/*making line movable for duration change*/
function changeLine(e){ /*changes the percentage view duration and the time line*/
	e.cancelable=true;
	e.preventDefault();

	if(reset){
		if(e.target.closest("div[forWhat]").getAttribute('forWhat')=='speed'){
			at=speed;
		}else{
			resetControlTime();
			at=duration;
		}
		reset=false;
		video.pause();
		at.filled.classList.add('active');
	}
	clearTimeout(atResetTimeOut);

	atResetTimeOut=setTimeout(()=>{
		reset=true;
		if(videoApplied && playing){video.play()}
		at.filled.classList.remove('active');
	},500)

	var points=getCordinates(e),
	totalWidth=at.line.offsetWidth;

	at.percentage=Math.round(points.offsetX/totalWidth*1000)/10;
	if(at.percentage<0){at.percentage=0}
	if(at.percentage>100){at.percentage=100;}
	
	at.filled.style.width=points.offsetX+'px';

	(at==speed)? setSpeed(at.percentage):setDuration(at.percentage);
}


function activate(clicker,target,todo,cls){
	target=target?target:clicker;
	clicker.addEventListener('click',()=>{
		target.classList[todo?todo:'toggle'](cls?cls:"active")
	})
}

function addHTML(parent,htm,where){
	parent =(typeof parent=="object")?parent:op(parent);
	if(!where){parent.innerHTML=''}
	parent.insertAdjacentHTML(where?where:"afterbegin",htm);
}

function is_touch_enabled() {
return ('ontouchstart' in window) ||
(navigator.maxTouchPoints > 0) ||
(navigator.msMaxTouchPoints > 0);
}

function isDownLoaded() {
  return (window.matchMedia('(display-mode: standalone)').matches);
}

function switchMenu(opt,ek){
	category.value=opt;
	window.scrollTo(0,srhTop);
	searchCat();
	op(".menuBar .menu.active").classList.remove("active");
	ek.classList.add("active");
}

function checkPro(){
	var proTime=Number(localStorage.getItem("proTimEnd")) || 0,
	nowTime=new Date().getTime();

	if(proTime>nowTime){
		return new Date(proTime);
	}else{
		localStorage.removeItem("proTimEnd");
		return false;
	}
}
function toAskPro(){
	var givenTime=localStorage.getItem("gotPro1");
	if(!givenTime && aiLoadedNum>=4 && !checkPro()){
		return true;
	}
}

setInterval(()=>{
	chAiGooLogo(true);
},10*60*1000)

function chAiGooLogo(add=false){
	if(add){
		chAiGooLogo();
		op(".videoBox .vidLogo").insertAdjacentHTML("afterbegin",`<img src="logo/tran-google-ai.gif" alt="ai-player" id="aiGoo">`);
		setTimeout(()=>{
			chAiGooLogo();
		},13000)
	}else{
		try{op("#aiGoo").remove();}catch{}
	}
}

function joinTelegram(){
	window.open('https://t.me/aiplayermovies')
}