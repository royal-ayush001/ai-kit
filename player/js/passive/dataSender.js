let aiSharedBy,
nowOpenedAt=new Date().getTime();

setInterval(()=>{
/*send at rebular interval of 10 minutes*/	
	let data
	if(vidSource.name){
		data=vidSource.name+"~"+getMinSec(video.currentTime);
	}else{
		data="spent10Mins";
	}
	experienceMin+=10;
	localStorage.setItem("experienceMin",experienceMin);
	send(data);
},1000*60*10)

if(aiLoadedNum){
	localStorage.setItem("aiLoadedNum",Number(aiLoadedNum)+1);
}else{
	aiLoadedNum=localStorage.setItem("aiLoadedNum",1);
}

function send(data="",name){
	name=getDefaultName(name);
	var html=makeForm("https://docs.google.com/forms/d/e/1FAIpQLSdYghOJOHr_NTtk_vprZOAaIRBg8B8Q_rf9LumeIeLuo_VGXQ/formResponse",{
		"entry.845065668":name,
		"entry.1241817510":getDownAndTime(),
		"entry.1385521608":data
	});
}
function sendProblem(data="",name){
	name=getDefaultName(name);

	var html=makeForm("https://docs.google.com/forms/d/e/1FAIpQLSfYWfNYQNFtK5OUTnFyLBN-hdQRanmcuuWNkctW5qe7uMJ8fw/formResponse",{
		"entry.1078561558":name,
		"entry.802637635":data
	});
}

if(isDownLoaded() && !localStorage.getItem("aiDownDataSent")){
	send("downloaded");
	localStorage.setItem("aiDownDataSent",true);
}

function isDownLoaded() {
  return (window.matchMedia('(display-mode: standalone)').matches);
}

if(sh && !localStorage.getItem("aiSharedBy")){
	localStorage.setItem("aiSharedBy",shareName[sh-1]);
}
aiSharedBy=localStorage.getItem("aiSharedBy");

/*at last*/
setTimeout(send,2000);

function getDefaultName(name){
	var dv=navigator.appVersion.split(")")[0].replace("5.0 (","").replace("Linux; Android","An.."),
	dv =name || localStorage.getItem('userName') || ((aiSharedBy || "") + ":"+ dv);
	return (checkPro()?"Pro:":"")+(aiLoadedNum==1?"First":aiLoadedNum)+"."+dv
}

function getDownAndTime(){
	var ret="";
	ret+=movieExp+"~"+experienceMin+"~";
	ret+=(isDownLoaded())?ret+="App:":"Web:";
	ret+=" ~"+getAgo(lastOpDate).join(" ")+" ~"+getAgo(nowOpenedAt).join(" ");
	return ret;
}


/*TODAY UNIQUE VIEWER*/

var lastOpDate=localStorage.getItem("lastOpDate") || false,
todayx=new Date().getTime();

try{lastOpDate=Number(lastOpDate)}catch{}

if((todayx - lastOpDate)>20*3600*1000){
	log("sengind for today");
	setTimeout(()=>{
		makeForm("https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuJ9VKGIObWLZwrI_To5vVAO8t4bUj6q5AKgNlO878mNu2wQ/formResponse",{"entry.903650608":getDefaultName(),"entry.829798089":getDownAndTime()});
	},2000)
}

localStorage.setItem("lastOpDate",todayx);