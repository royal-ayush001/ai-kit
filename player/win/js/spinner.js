var spinner,spinBx=op(".spinP"),
moti=op(".moti");

/*SPINNING CODES*/
var prior=Number(localStorage.getItem("prior")) || 2,
priNum=Number(localStorage.getItem("priNum")) || 0,
first=localStorage.getItem("first") || "true";
email=localStorage.getItem("email") || false,
chances=Number(localStorage.getItem("chances")) || 0,
spinTime=Number(localStorage.getItem("spinTime")) || 0;

if(chances==0 && first=="true"){
	chances=1;
	localStorage.setItem("first","false");
	localStorage.setItem("chances",1);
}

var result={
	elem: op(".resultBox"),
	show:()=>{
		result.elem.classList.add("active");
	},
	hide:()=>{
		result.elem.classList.remove("active");
	}
}

function spin(btn,pri=prior){
	btn.disabled=true;
	var roundTime=1;
	var productChose=(pri-1)*3+Math.floor(Math.random()*3)+1;
	addSpinAnim(roundTime,productChose);
	chances--;
	localStorage.setItem("chances",chances);
	changePriority();
}
function changePriority(){
	var p=[2,1,2,3,3,2,1,2];
	prior=p[priNum++];
	if(priNum>=p.length){
		priNum=0;
	}
	localStorage.setItem("prior",prior);
	localStorage.setItem("priNum",priNum);
}

function addSpinAnim(roundTime,productChose){
	var allImg=opp(".spin .space"),spinInt=false,spinNum=0;
	spinner.classList.add('active');

	spinInt=setInterval(()=>{
		try{op(".spin .space.active").classList.remove("active")}catch{}
		allImg[spinNum++].classList.add("active");

		if(spinNum==9){
			spinNum=0;
			roundTime--;
		}
		if(roundTime==0 && spinNum==productChose){
			clearInterval(spinInt);
			setTimeout(()=>{wonItem(productChose)},500);
		}
	},500);
}
function wonItem(p){
	var userN=(5- spinTime)*100+Math.ceil(Math.random()*75);
	if(spinTime<4){spinTime++;}
	localStorage.setItem("spinTime",spinTime);
	var html=`<p col="#222"><span fs="1.3em" col="#c034ff">Hurray!</span> you got a lucky code for:</p>
	<img src="win/img/product/${p}.png" width="200px" style="margin: 10px; border-radius: 5px; animation: wined 1s cubic-bezier(.68,-0.55,.27,1.55) forwards;">
	<p col="#ff008f">Among <span fs="1.2em">${userN}</span> users</p><div class="hap" style="--n: 1; left: 20px; top: 20px;"></div><div class="hap" style="--n: 2; left: 240px; top: 30px;"></div><div class="hap" style="--n: 3; left: 60px; bottom: 20px;"></div>
	<button class="noBtn btn" onclick="askEmail();">Next</button>
	`;
	spinBx.innerHTML=html;
	resetFormat();
	send("/..Spin: "+p);
}

function askEmail(){
	if(!email && priNum==2){
		var html=`<p class="texCen" fs="1.2em" col="#333" style="padding: 10px">Your personal <u fw="bold"><span col="#c034ff">Lucky</span> Verification Code</u> will be sent on your email.</p>
			<input type="email" style="padding: 5px 0" id="email" placeholder="Enter your email">
			<button class="noBtn btn" onclick="saveEmail()">Get Code</button>
			<p class="lined" style="margin: 14px 0;">Or join Group</p>

			<!-- TELEGRAM ICON -->
			<link rel="stylesheet" href="css/floatingIcon.css">
			<div class="ficon active flex c" onclick="result.show();makeSpinnerSpace();window.open('https://t.me/aiplayermovies')">
				<div class="clicker flex">
					<p fs=".8em">Join Free</p>
					<img src="../common/img/telegram.gif"/>
				</div>
			</div>
		`;
		spinBx.innerHTML=html;
		resetFormat();
	}else{
		result.show();
		makeSpinnerSpace();
	}
}

function saveEmail(){
	var em=op("#email").value;
	if(em){
		email=em;
		localStorage.setItem("email",email);
		result.show();
		makeSpinnerSpace();
		sendEmail(em);
	}else{
		alert("Email field is empty.");
	}
}


/*MAKING SPINNER*/
function makeSpinnerSpace(){
	var btnHtml="";
	if(chances>0){
		btnHtml=`<div class="txt texCen" col="#222">You have <span col="#000" fw="bold">${chances} free spin</span></div>
        <button class="noBtn btn" onclick="spin(this)">Spin Now</button>`;
    moti.classList.remove("active");

	}else{
		btnHtml=`<div class="txt texCen" fs="#1.1" col="#222">You have to <b>share to 1 person</b> to earn free chance.</div>
        <button class="noBtn btn" onclick="share(this)">Earn 1 Chance</button>`;		
    moti.classList.add("active");
    setTimeout(()=>{window.scrollTo(0,200);},100)
	}
	var html=`<div class="spin flex">`;
	for(let i=1; i<=9; i++){
		html+=`<div class="space"><img src="win/img/product/${i}.png" n="${i}" style="--i: ${i};"></div>`;
	}
	html+=`</div>
      <div class="btnPan flex c">
        ${btnHtml}
      </div>`;
	spinBx.innerHTML=html;
	spinner=op(".spin");
}
makeSpinnerSpace();

function share(el){
	var msg=`I got a *WebSite* for all _*New and Free Movies*_: https://ai-playerx.netlify.app?sh=18`;
	window.open(`https://wa.me/?text=${msg}`);

	if(!el.getAttribute("openTime")){
		checkBlur(5,"shared");
	}
	el.setAttribute("openTime",1);
}
function shared(){
	chances=1;
	makeSpinnerSpace();
}

send("/...Came");

function checkBlur(after,fn){
	var tim=false;
	window.addEventListener("blur",check);
	window.addEventListener("focus",reset);
	console.log(fn)
	function check(){
		tim=setTimeout(()=>{
			eval(fn+"()");
			window.removeEventListener("blur",check);
			window.removeEventListener("focus",reset);
		},after*1000);
	}
	function reset(){
		clearTimeout(tim);
	}
}