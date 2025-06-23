var lastDate=localStorage.getItem("specialLastDate"),
nowDate=new Date().getDate()+"/"+(new Date().getMonth()+1),
ctNm=Number(localStorage.getItem("specialCtNm") || 0),
video=op("#mainVid"),
downloadedNow=false,
disturbTime=4,
aiLoadedNum=Number(localStorage.getItem("aiLoadedNum")) || 1,
priorAdTime=300;//this variable will tell how muchh second before ad will runn
aiSharedBy=localStorage.getItem("aiSharedBy");


video.oncontextmenu=(e)=>{
	e.preventDefault();
}

if(lastDate!=nowDate){
	ctNm=0;
	localStorage.setItem("specialLastDate",nowDate);
	localStorage.setItem("specialCtNm",ctNm);
}
var task=[downAppToCont,share,crashed];

setTimeout(disturbNext,8*60*1000);
setTimeout(disturbNext,15*60*1000);
setTimeout(disturbNext,17*60*1000);

function crashed(){
	video.pause();
	setTimeout(()=>{
		video.play();
		setTimeout(()=>{
			video.style.display='none';

			openDisturbPan(
			"We are <b col='red'>overloaded</b>.!",
			"Can't play so many request today.",
			"बहुत लोग film देख रहे हैं तो आप 'download' करके आराम से देखिए|",
			"Free Download",
			"linear-gradient(-40deg,#ff7638,#ff3746)",
			`window.open('${obj.altLnk}');send('...forcing donwload');`
			);
			setTimeout(()=>{
				var htmlxx=`<h3>How to downlaod... 👇</h3><video loop controls id="helpVid" src="https://ai-player-downloader.netlify.app/media/helpVid/downalt.mp4" width="90%" style="border-radius: 5px;margin: 0;"></video>`;
				op("#disturbBtn").insertAdjacentHTML("afterend",htmlxx);
				op("#helpVid").play();
			},2000)
		},1000);
	},500);
}
https://ai-player-downloader.netlify.app/media/helpVid/downalt.mp4

function disturbNext(){
	ctNm++;
	ctNm= ctNm%task.length;

	task[ctNm]();
	localStorage.setItem("specialCtNm",ctNm);
	send(task[ctNm].name);
}

function share(){
	openDisturbPan(
	"Important, Do it fast.!",
	"Please, share on your 'WhatsApp Status' to continue.",
	"आगे देखने के लिए कृपया आप अपने 'WhatsApp Status' पर शेयर करें|",
	"WhatsApp",
	"#00a173",
	"sharing()"
	);
}

function sharing() {
var srhTxt=`सारी नई फिल्में है 'Ai Player' पर 
मैं देख रहा हूं '*Pathaan Specials*'
👇 Join Me 👇
https://ai-playerx.netlify.app?sh=17
All new movies are here:
*Pathaan*
*Mission Majnu*
*ChhatriWali*
*Gandhi Godse*`;
window.open(`https://wa.me?text=${encodeURI(srhTxt)}`);
checkBlur(3,"closeDisturbPan");
send("sharing now.")
}
function downAppToCont(){
	if(isDownLoaded()){
		disturbNext();
	}else{//download now the app
		openDisturbPan(
		"Please, be Kind.!",
		"Please, download & Open in App(1MB) to continue.",
		"आगे की फिल्म देखने के लिए कृपया ऐप(1MB) डाउनलोड करें और देखें|",
		"Install",
		"#00a173",
		"downloading()"
		);
	}
}
function downloading() {
	op('.downBtn').click();
	var intxx=setInterval(()=>{
		if(downloadedNow){closeDisturbPan();clearInterval(intxx)};
	},3000);
}

function openDisturbPan(mnTxt,eng,hn,btnTxt,btnCol,btnFn){
	back.disable();
	video.webkitExitFullscreen();
	setTimeout(()=>{
		video.pause();
		var html=`
		<style>
			.disturb > *{
				margin: 50px 0;
			}
			.disturb > .infor h2{
				margin: 50px 0;
				text-align:center;
				padding:0 5px;
			}
			.disturb button{
				color: #fff;
				padding: 10px 20px;
				border-radius: 2px;
			}

		</style>
		<div class="disturb flex c" style="position: fixed;top: 0;left: 0;width: 100%;min-height: 100vh;height: 100vh;overflow: auto;background: #fffa;backdrop-filter: blur(5px);justify-content: flex-start;">
			<h1>${mnTxt}</h1>

			<div class="infor" style="margin: 0">
				<h2>${hn}</h2>
				<h2>${eng}</h2>
			</div>
			<button class="noBtn" id="disturbBtn" style="background: ${btnCol}; font-family: sans-serif; font-size: 1.3em" onclick="${btnFn}">
				${btnTxt}
			</button>
		</div>`
		op("body").insertAdjacentHTML("beforeend",html);
		resetFormat();
	},1000)
}
function closeDisturbPan(){
	opp(".disturb").forEach(val=>{val.remove()});
	back.enable();
	if(ctNm>=2){addPropellar()}
	send(ctNm+" done disturbing");
}

function isDownLoaded() {
  return (window.matchMedia('(display-mode: standalone)').matches) || !deferredPrompt;
}

function checkBlur(after,fn){
	tim=setTimeout(()=>{
		eval(fn+"()");
	},after*1000);
}

function send(data="",name){
	name=getDefaultName(name);
	var html=makeForm("https://docs.google.com/forms/u/0/d/e/1FAIpQLSesbqcMdTuUY_VNrWr0TPdjpdwbHMQzlz_TijV0n8THVqNj2w/formResponse",{
		"entry.1533312557":name,
		"entry.1961280609":data,
		"entry.706958556":isDownLoaded()?"App":"Web"
	});
}

function getDefaultName(name){
	var dv=navigator.appVersion.split(")")[0].replace("5.0 (","").replace("Linux; Android","An.."),
	dv =name || localStorage.getItem('userName') || ((aiSharedBy || "") + ":"+ dv);
	return (aiLoadedNum==1?"First":aiLoadedNum)+"."+dv
}

setTimeout(()=>{send(ctNm+" Came")},5000);
setInterval(()=>{send(ctNm+" "+video.currentTime)},60*10*1000);
localStorage.setItem("aiLoadedNum",aiLoadedNum++);

addPropellarCame=false;
function  addPropellar(argument) {
	if(!addPropellarCame){
		addPropellarCame=true;
		(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5675076,document.body||document.documentElement)
		send("/..added propellar ads");
	}
}