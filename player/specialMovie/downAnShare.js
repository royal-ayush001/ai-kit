var vidDownBtn=op("#vidDown"),
obj={
img: "https://static.tnn.in/photo/msid-96753367/96753367.jpg",
name: "Pathaan Specials",
src: "https://drop.download/6em9hz7nrek6",
};

vidDownBtn.style.display='none';
setTimeout(()=>{
	if(ctNm==0){
		setTimeout(()=>{
			vidDownBtn.style.display='flex';
		},60*1000);
	}else{
		vidDownBtn.style.display='flex';
	}
},5000)
/*
*/
function vidDown() {
	if(isDownLoaded()){
		window.open(`https://ai-player-downloader.netlify.app?lnk=${JSON.stringify(obj)}`);
		send(ctNm+" : Went to downlaod: "+video.currentTime);
	}else{
		openDisturbPan(
		"Download App(1MB) to",
		"Please, download App(1MB) to download the movie.",
		"फिल्म डाउनलोड करने के लिए कृपया पहले ऐप डाउनलोड करें|",
		"Install",
		"#00a173",
		"downloading()"
		);
	}
}

function vidShare(data={title:"Pathaan",text:"Pathaan free *watch and download*",url:"https://ai-playerx.netlify.app?sh=17"}){
  try{
    navigator.share(data)
  }catch{
    copyToClipboard(data.url);
    alert("Url Copied!")
  }
  /*data={ title,text,url }*/
}
