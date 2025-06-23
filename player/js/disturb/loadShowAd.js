var loadShowAd=op(".loadShowAd"),
loadShowCont=op(".loadShowAd .cont"),
adType=["ads","poll"],
pollList=['gender','age'],
loadShowTim=false,
toShow=false;


adType=adType[Math.ceil(Math.random()*10)%2];
// adType="poll";//CHANGED HERE _TEMP
log(adType)
var toPollFor=pollTodo();

if(adType=="ads" || toPollFor){
	addScript(`js/vidOnSt/${adType}.js`);
	toShow=true;
}

video.onplay=skipLoad;

function startLoadShow(){
	if(toShow){
		loadShowTim=setTimeout(()=>{
			loadShowAd.classList.add('active');
		},1000);
	}

	if(adType=="ads"){
		loadAdInStart();
	}else if(toPollFor){
		loadPollInStart(toPollFor);
	}	
}

function skipLoad(){
	clearTimeout(loadShowTim);
	loadShowAd.classList.remove("active");
}

function pollTodo(){/*CHECK IF ANY POLL Q IS LEFT*/
	var a;
	for(let i=0; i<pollList.length; i++){
		if(!stored(pollList[i])){
			a=pollList[i];
			break;
		}
	}
	return a;
}