var lastShare=localStorage.getItem("lastShare") || false,nowVid,
extLink="https://www.youtube.com/watch?v=RSPlBjSIHZ0",
shareNum=Number(localStorage.getItem("shareNum")) || 0;

var hrShare={
	time: 0,vidName: null,tim:0,
	adPan: op(".vidInAds"),

	start: (vidName)=>{
		hrShare.vidName= vidName;
		hrShare.tim=setInterval(()=>{
			nowVid=vidSource.name;
			if(video.currentTime > video.duration/2 && !vidSource.name.includes(lastShare)){
				hrShare.showShare();
				clearInterval(hrShare.tim);
				movieExp+=1;
				localStorage.setItem("movieExp",movieExp);
			}
		},15*1000);
	},
	showShare:()=>{
		playing?playPause():'';
		hrShare.adPan.classList.add("active");
		hrShare.adPan.innerHTML=shareHTML();
		resetFormat();
		send("/...Shown interval");
	},

	closeShare:()=>{
		hrShare.closeReal();
	},
	closeReal:()=>{
		playPause();
		hrShare.adPan.classList.remove("active");
		clearInterval(hrShare.tim);
	},

	end:()=>{
		hrShare.closeReal();
		hrShare.time=0;
		hrShare.vidName=null;
	}
}

function shared(){	
	hrShare.closeReal();
	localStorage.setItem("lastShare",nowVid.split("Episode")[0]);
	localStorage.setItem("shareNum",++shareNum);
	send("/...Shared "+shareNum+" "+getAgo(lastShare*60*1000).join(" ")+" ago");
}

function shareHTML(txt="<h3>Apply the link to <u>Status</u> to continue...</h3>"){
	var url=getShareLink(`Hey, I am watching *${vidSource.name || "this"}* on Ai Player:
*${getLinkOrMid()}* `);

	var html=`
	<div class="shareBx flex c texCen">
		<div class="head">${txt}</div>
		<p><b col='#f00'>Don't Close</b> You will unable to <b col='#f00'>resume</b>.</p>
		<div>Click the button and Choose status option</div>
		<div class="shBtn flex">
			<button class="noBtn flex" onclick="checkShare();this.children[0].click()" bg="linear-gradient(0deg,#06b900,#08f400)" ico="whatsapp"><a href="${url}" hidden target="__blank"></a></button>
		</div>
		${(toAskPro())?`<button onclick="window.open('https://ai-playerx.netlify.app/pro')" class="noBtn" fs="1em">Don't want to <span fw="bold">Share</span></button>`:''}
	</div>
	`;
	return html;
}

var onceX=true;
function checkShare(tm=6){
	if(movieExp<=1){tm-=1;}
	if(onceX){
		onceX=false;
		checkBlur(tm,"shared");
		send("/...clicked to share");
	}
}