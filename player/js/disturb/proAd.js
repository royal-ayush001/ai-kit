/*PROPELLAR ADS FUNCITONS*/

var proIntAdList=[
{"async":"async","data-cfasync":"false","src":"//upgulpinon.com/1?z=4952593"},
{"async":"async","data-cfasync":"false","src":"//upgulpinon.com/1?z=4954236"},
{"async":"async","data-cfasync":"false","src":"//upgulpinon.com/1?z=4954239"},
{"async":"async","data-cfasync":"false","src":"//upgulpinon.com/1?z=4954240"},
]

var lastIntAdTime=localStorage.getItem("lastIntAdTime") || 0;
lastIntAdTime=Number(lastIntAdTime);

function openProAd(){
	/*COMMENTED ADS PRO*/
	var nowTime=new Date().getTime()/1000;
	log(nowTime);

	if((aiLoadedNum>1 && proIntAdList.length) || toOpen){
		try{op("body ~ div div[id^=p_]").parentElement.remove();}catch{}

		lastIntAdTime=nowTime;
		makeScript(proIntAdList.shift());
-
		disableProInt();

		localStorage.setItem("lastIntAdTime",nowTime);

		send("/...Show ad to click")

		setTimeout(()=>{
			openProAd();
		},35*60*1000);
	}
}

var int=false;
function disableProInt(toOpen=false){
	if(fullScr){fullScrPan.click();}
	clearInterval(int);

	int=setInterval(()=>{
		log("came to disable"+toOpen)
		if(document.body.style.overflow=='hidden'){
			document.body.style.overflow="";
			clearInterval(int);

			var baap=op("body ~ div div[id^=p_]").parentElement;
			baap.style.opacity="1";
			setTimeout(()=>{baap.style.opacity="0"},200)
		}
	},1000);
	setTimeout(()=>{
		clearInterval(int);
	},20000)
}

function opened_ad(){
	dialog.hide();
	send("Really opened");
}
