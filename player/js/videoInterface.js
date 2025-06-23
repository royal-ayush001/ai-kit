/*this page is to give the user experience to see which movie is to be watched*/

/*dom elements variables*/
var filesIn=op('#files'),
curVidDataPan={
	elem: op(".dataBox .currentVideo"),
	name: op(".currentVideo .name")
};

var vidSource=null,
timeChInterval,
vidDuration,
videoApplied=false,
msgInterval,
videoStoringInterval,
vidHistory=localStorage.getItem("vidHistory") || [],
durationChRate=1,
curVid="",
vidErrorCt=Number(localStorage.getItem("vidErrorCt")) || 0,

shareText=`

*FREE new Movies* here...

Some Populars are:
*Khuda Hafiz 2*
*PrithviRaj*
*RRR*
*KGF 2*
*The Kashmir Files*

https://ai-playerx.netlify.app?sh=17
https://ai-playerx.netlify.app?sh=17`;

if(typeof vidHistory=="string"){
	vidHistory=vidHistory.split(",")
}


/*get player start*/

function askLink(){
	dialog.inside(`<div fs="1.1em" col="#ff3000">/...Link</div><input type="text" class="noBtn" id="lnkIn" placeholder="Paste the link...">`);
	dialog.buttons("Cancel","Go");
	dialog.show();
	dialog.success=()=>{
		var link=op("#lnkIn").value;
		if(link){setLink(link)}
	}
}

video.onerror=(e)=>{
	if(vidPan.classList.contains("active")){
		vidErrorCt++;
		localStorage.setItem("vidErrorCt",vidErrorCt);

		let errCode=video.error.code-1;
		let msgAry=["Loading was interrupted. Try again.","This video is not supported in this Browser or Network issue.","Check your network connectivity","There is an error!"];
		let msg=msgAry[errCode];

		if(errCode==3 && vidSource.altLnk!='false' && vidSource.altLnk){
			var obj=movies[vidSource.mid];
			obj.src=obj.altLnk;
			delete obj.altLnk;
			location.assign(`https://ai-player-downloader.netlify.app?lnk=${JSON.stringify(obj)}`);
			return false;
		}

		if(vidErrorCt>=2){
			dialog.inside(`<span col="#f00" ff="glory">Problem in server :</span><br><span ff="glory" col="#444">Unable to play movie now. </span><br><br><i>Please <b><u>Join our Telegram channel</u></b> to know when the error will be resolved.</i>`);
			setZeroVidErr();
			
			dialog.buttons("Close","Join")
			dialog.success=()=>{joinTelegram()};
			send("/...Problem twice "+vidSource.name);
		}else{
			dialog.inside(`<span col="#f00" ff="glory">Error :</span><br><span ff="glory" col="#444">/...${msg}</span>${onErrDown()}`);
		}
		dialog.show();

		sendProblem(vidSource.name+" /...Problem");
	}
}
function setZeroVidErr(n=0){
	vidErrorCt=n;
	localStorage.setItem("vidErrorCt",n);
}

function onErrDown(){
	if(video.src.startsWith("http")){
		var html=`<br><span>/...Download</span><br>Try to DOWNLOAD it, because unable to play right now.`;
		dialog.buttons("Close","Download");
		dialog.success=()=>{
			window.open(`https://ai-player-downloader.netlify.app?lnk=${getDownData()}`);
			location.assign(extLink);
		};
		return html;
	}
}
var vidSource={};
function setMovie(lnk,name,midx=false,altLnk){
	if(midx){
		updateHistory(midx);
	}
	controlBox.style.display='none';
	vidSource={
		name,
		src: lnk,
		mid: midx,
		altLnk
	}

	load.show();
	setLink(vidSource.src);
	window.scrollTo(0,0);

	/*TO MAKE THE DOWNLOAD AND SHARE BUTTON WHILE VIDEO*/
	var elem="";
	try{op(".currentVideo .curData").remove()}catch{}
	if(video.src.startsWith("http")){
		elem=`<div class="curData flex">
					<div class="flex" id="downCur" ico="download" onclick="movieDownloadData(${vidSource.mid})" bg="#ffa700"></div>
					<div class="flex" id="shareCur" ico="send" onclick="shareCurent()" bg="lime" ></div>
				</div>`;
	}
	curVidDataPan.elem.insertAdjacentHTML("beforeend",elem)
	resetFormat();
}
function getLinkOrMid(midx=video.getAttribute("mid")){
	log(midx)
	let lnkx=domain+"?sh=17";
	if(midx){
		lnkx+=`&mid=${midx}`;
	}else if(video.src && video.src.startsWith("http")){
		lnkx+=`&mlnk='${video.src}'`;
	}
	return lnkx;
}
function shareCurent(mid,name=vidSource.name){
	var lnkx=getLinkOrMid(mid);
	shareApp({title: name,text: `Direct link for ${name}`+shareText, url:lnkx})
}

function importViaLink(){
	vidSource= {
		name:decodeURI(link.input.value),
		src:link.input.value
	}
	load.show();
	setLink(vidSource.src);
}

function setLink(lnk){
	if(navigator.onLine || true){
		(video.src!=lnk)?video.src=lnk:"";
		playing=false;
		if(vidSource.mid){video.setAttribute("mid",vidSource.mid)}else{
			video.removeAttribute("mid");
		}	
		video.onprogress=()=>{
			if(!playing){
				playPause();
			}
		}
		vidOnStart();

		clearInterval(videoStoringInterval);
		videoStoringInterval= setInterval(storeCurVid,5000);
	}else{
		alert("You are offline!");
		stopPlaying();
	}

}

function notLoaded(){
	if(video.readyState==4){
		load.hide();
	}else{
		load.show();
	}
}


function applyVideo(){
	let srcxx=URL.createObjectURL(vidSource)
	video.src=srcxx;
	playing=false;
	playPause();
	videoApplied=true;
	vidOnStart();
}

function getViaDevice(){
	filesIn.click();
	filesIn.onchange=(e)=>{
		vidSource=filesIn.files[0];
		applyVideo();
	}
}

function chDispTime(){
	timeBox.played.innerHTML=getMinSec(video.currentTime);
	var totalWidth=duration.line.offsetWidth,
	filledWidht=totalWidth/vidDuration*video.currentTime;

	duration.filled.style.width=Math.ceil(filledWidht)+'px';
}


function applyData(){/*funciton will be called after the video is started to be played*/
	videoApplied=true;
	clearInterval(timeChInterval);
	timeChInterval=setInterval(()=>{
	chDispTime();
	notLoaded();
	},1000)
	clearInterval(msgInterval);
	showDataForUser();
	controlBox.style.display='';

	if(curVid!=vidSource.name){/*ONE TIME ONLY: WHEN VIDEO STARTS AT FIRST*/
		curVid=vidSource.name;
		vidDuration=video.duration;
		timeBox.total.innerHTML='/'+getMinSec(vidDuration);

		document.title=vidSource.name+" : Ai-Player";
		send("/...Started~"+vidSource.name);
		setZeroVidErr();
	}
}

function playPause(){
  if(!playing){
  	video.play().then(applyData)
		playing=true;
		playBtn.innerHTML=elems.pause;
		return true;
	}else	if(playing){
		video.pause();
		playing=false;
		playBtn.innerHTML=elems.play;
		clearInterval(timeChInterval)
		return true;
	}
}

function setSpeed(per){
	if(videoApplied){
		vidSpeed=Math.ceil(per*4)/100;
		video.playbackRate=vidSpeed;
		message(vidSpeed,"<span>x<span>");
	}
}

function setDuration(per){
	var curTime=video.currentTime,
	nTim=vidDuration*per/100,
	toCh=nTim-curTime;

	video.currentTime+=toCh/durationChRate;
	chDispTime();
}


function getMinSec(time=0){
	let hrs=Math.floor(time/3600);
	time%=3600;
	let min=Math.floor(time/60),
	sec=Math.floor(time%60);
	if(hrs!=0){
		hrs=hrs<10?`0${hrs}`:hrs;
		hrs+=":";
	}else{
		hrs="";
	}
	min=min<10?`0${min}`:min;
	sec=sec<10?`0${sec}`:sec;
	return hrs+min+':'+sec;
}

function showDataForUser(){
	curVidDataPan.elem.classList.add('active');
	curVidDataPan.name.innerHTML=vidSource.name;
	// curVidDataPan.sizeAndTime.innerHTML=`<i></i><span>${getMinSec(vidDuration)}</span>`;
}

function resetSpeed(){
	setSpeed(25);
	speed.filled.style.width=25+'%';
	speed.percentage=25;
}
function alterSpeed(val){
	val=eval(speed.percentage+val);
	if(val>0 && val<100){
		setSpeed(val);
		speed.percentage=val;
		speed.filled.style.width=val+'%';
	}
}

function hideIntro(){
	op(".banner").style.display="none";
	vidPan.classList.add("active");
}

window.onhashchange=(e)=>{
	if(!location.hash.includes("watching")){
		stopPlaying();
	}
}

function vidOnStart(){/*ON THE VIDEO PAN IS SHOWN TO PLAY*/
	hideIntro();
	window.scrollTo(0,0);
	location.assign("#watching");
	try{send(vidSource.name)}catch{};

	showLoadingMsg();
	let sr=video.src;
	if(sr.includes("480") || sr.includes("720") || sr.includes("1080")){
		quality.btn.style.display=""
	}else{
		quality.btn.style.display="none"
	}
	try{disturbOnVidStart()}catch{}

	if(!(experienceMin>30 || movieExp>1 || aiLoadedNum>5) && video.src.startsWith("http")){/*CHANGE HERE AFTER 10 DAY OF 10 JUNE: REMOVE AI LOADED NUM*/
		durationChRate=1000;
	}
	chAiGooLogo(true);
}

function stopPlaying(){/*to stop the video forcefully*/
	vidSource={},
	timeChInterval,
	vidDuration,
	videoApplied=false;

	clearInterval(videoStoringInterval);
	clearInterval(timeChInterval)
	clearInterval(msgInterval);
	/*show intro*/

	op(".banner").style.display="";
	vidPan.classList.remove("active");
	curVidDataPan.elem.classList.remove("active")
	video.src='';
	video.removeAttribute("mid");
	try{hrShare.end();}catch{}
}

/*screen rotate for get full screen*/
screen.orientation.addEventListener('change', function(e) { autoFullScr(); })

function autoFullScr(){	
	if(screen.orientation.angle%180==0 && videoApplied && fullScr){
		fullScrPan.click();
	}else if(screen.orientation.angle%180!=0 && videoApplied && !fullScr){
		fullScrPan.click();
	}
}


function storeCurVid(){
	let data={
		name: vidSource.name,
		src: vidSource.src,
		time: video.currentTime,
	}
	if(data.name){
		data=JSON.stringify(data);
		localStorage.setItem("aiCurVid",data);
	}
}

function showLoadingMsg(){
	curVidDataPan.elem.classList.add('active');
	let msg=["/...Please wait while loading.","/...It will be there in seconds.","/...Almost there!","/...Unfortunately It is taking longer than expected.","/...Fetching"];

	let num=0;
	funXXX();
	clearInterval(msgInterval);
	msgInterval= setInterval(funXXX,4000)
	function funXXX(){
		curVidDataPan.name.innerHTML=((vidSource.name +"<br>") || "")+(msg[num] || msg[4]);
		num++;
	}
}

video.onended=()=>{
	clearInterval(videoStoringInterval);
	localStorage.removeItem("aiCurVid");
}

function checkDownload(){
	if(localStorage.getItem("downloadedSomething")){
		op("#deviceFile").classList.add("active");
		dialog.inside("You may watch the downloed videos only in this app.");
		dialog.success=()=>{
			getViaDevice();
		}
		dialog.buttons("Not now","Open");
		dialog.show();
		saveDownData("remove");
	}
}
checkDownload();

function saveDownData(kind="set"){
	if(kind=="set"){
		localStorage.setItem("downloadedSomething",true);
		localStorage.setItem("downloadExperience",Number(localStorage.getItem("downloadExperience"))+1)
	}else{
		localStorage.removeItem("downloadedSomething");
	}
}
function updateHistory(midx){
	if(vidHistory[0]!=midx){
		vidHistory.unshift(midx);
		localStorage.setItem("vidHistory",vidHistory.join(","));
	}
}

function getShareLink(toAdd=""){
	var data=toAdd+shareText;
	return encodeURI("https://wa.me/?text="+data);
}

function getDownData(){
	log(vidSource);
	return JSON.stringify(vidSource);
}