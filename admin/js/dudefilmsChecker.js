var indomain=op("#dudedomain");
indomain.value=localStorage.getItem('dudedomain') || "https://dudefilms.";
var movieChoosePan=op(".choosePanMv");
var seriesChoosePan=op(".choosePanSr");
var curMvsDetail,curSrsDetail;

if(indomain.value.includes('.')){
	check();
}

function applySeriesInfo(srAryNew) {
	var firstSeries=webseriesAry[0].name.substring(0,4).toLocaleLowerCase();
	var html=`<button onclick="getLinkofSeries();">Get Direct Link</button>`,checkbal='checked';

	for(let val of srAryNew){
		if(val.includes(firstSeries)){
			checkbal="";
		}
		html+=`<label class="series flex "><input type="checkbox" ${checkbal} value="${val}"> ${val.substring(21,41).split('/')[1].replaceAll('-',' ')}...</label>`;
	}
	seriesChoosePan.innerHTML=html;
}

function getLinkofSeries(){
	var checkSeries=opp(".series input[type='checkbox']:checked");
	var lnk=[];
	checkSeries.forEach(val=>{
		lnk.push(val.value);
	})
	var data=JSON.stringify(lnk);

	fetch(`https://api2.bigweds.in/automovietake.php?mvlnk=${data}`).then(ret=>ret.json()).then(res=>{
		log(res);
	 curSrsDetail=res;
		createSeriesFinalFromFinalLnk();
	})
}

function createSeriesFinalFromFinalLnk() {
	log(curSrsDetail);
	seriesChoosePan.insertAdjacentHTML("afterend",`<button onclick="copyAllSeriesLNk()">Copy All Movies link</button>
		<textarea id="altSrLnk" placeholder="All Drop Links" class="autoPaste w100p" style="display: block;"></textarea>
		<button onclick="createFinalSeriesCode()">Create Final Code</button>
		<textarea id="finalCodeSr" class="w100p" style="display: block;"></textarea>
	`);
}

function copyAllSeriesLNk(){
	var lnks="";
	for(let val of curSrsDetail){
		for(let i=1;i<=val[2]; i++){
			lnks+= val[0].replace("E01","E"+get2dNum(i)) +"\n";
		}
	}
	copyToClipboard(lnks);
}

function createFinalSeriesCode(){
	var str="";
	var dropLnkAry=op("#altSrLnk").value.replaceAll("\n",'').replaceAll("https://drop.download/",',').substring(1).split(",");

	for(let val of curSrsDetail){
		var seriesName=ExtraDetail.clearLnk(val[0]);
		seriesName=ExtraDetail.clearName(seriesName[2]).replace("S0","Season ");
		var dropLnksComma=dropLnkAry.splice(0,val[2]);
		multiFileRenamer(dropLnksComma,seriesName);

		str+=`\n['${seriesName}','${shortImgurLnk(val[1])}',${val[2]},'${getShortSeriesLnk(val[0])}','${dropLnksComma}'],`;
	}

	op("#finalCodeSr").value=str;
}
function multiFileRenamer(idAry,commonName) {
	var n=0;
	for(let a of idAry){
		dropDownloadFileRename(a,commonName+' Episode '+ ++n);
	}
}


function applyMovieInfo(mvAryNew) {
	var firstMovie=moviesAry[0].name.substring(0,4).toLocaleLowerCase();
	var html=`<button onclick="getLinkofMovie();">Get Direct Link</button>`,checkbal='checked';

	for(let val of mvAryNew){
		if(val.includes(firstMovie)){
			checkbal="";
		}
		html+=`<label class="movie flex "><input type="checkbox" ${checkbal} value="${val}"> ${val.substring(21,41).split('/')[1].replaceAll('-',' ')}...</label>`;
	}
	movieChoosePan.innerHTML=html;
}

function getLinkofMovie(){
	var checkMovie=opp(".movie input[type='checkbox']:checked");
	var lnk=[];
	checkMovie.forEach(val=>{
		lnk.push(val.value);
	})
	var data=JSON.stringify(lnk);

	fetch(`https://api2.bigweds.in/automovietake.php?mvlnk=${data}`).then(ret=>ret.json()).then(res=>{
		log(res);
	 curMvsDetail=res;
		createMovieFinalFromFinalLnk();
	})
}

function createMovieFinalFromFinalLnk() {
	movieChoosePan.insertAdjacentHTML("afterend",`<button onclick="copyAllMovieLNk()">Copy All Movies link</button>
		<textarea id="altMvLnk" placeholder="All Drop Links" class="autoPaste w100p" style="display: block;"></textarea>
		<button onclick="createFinalMovieCode()">Create Final Code</button>
		<textarea id="finalCodeMv" class="w100p" style="display: block;"></textarea>
	`);
}

function shortImgurLnk(lnk){
	try{return "imgur."+lnk.replace("https://i.imgur.com/","").replace(".jpg","")}catch(er){alert(er)};
}

function createFinalMovieCode(){
	var str=``;
	var dropLnkAry=op("#altMvLnk").value.split("\n");

	for(let i=0; i<curMvsDetail.length; i++){
		try{
			var mvType=['BollyWood','South Movies','HollyWood'];
			var val=curMvsDetail[i];
			var imgLnk=shortImgurLnk(val[1]);
			var lnkSecData=ExtraDetail.clearLnk(val[0]);
			log(lnkSecData);
			var movieName=lnkSecData[2].replaceAll('.',' ');

			str+="\n['"+movieName+"','"+imgLnk+"',`"+getMovieServerNLink(val[0])+"`,"+(mvType.indexOf(lnkSecData[1])+1)+",'"+dropLink(i,movieName)+"'],"
		}catch(err){
			log(err);
		}
	}

	op("#finalCodeMv").value=str;
	
	function dropLink(n,mvname){
		var id=dropLnkAry[n].replace('https://drop.download/','');
		dropDownloadFileRename(id,mvname);
		return id;
	}
}

function copyAllMovieLNk(){
	var str="";
	for(let val of curMvsDetail){
		str+=val[0]+"\n";
	}
	copyToClipboard(str);
}

function applyFetchedData(ret){
	localStorage.setItem("dudedomain",ret.domain);
	applyMovieInfo(ret.movieAry);
	applySeriesInfo(ret.seriesAry);

}

function check(){
	localStorage.setItem('dudedomain',indomain.value);	
	fetch(`https://api2.bigweds.in/dudefilmscheck.php?urlcheck=${indomain.value}`).then(res=>res.json()).then(ret=>{
		applyFetchedData(ret);
	})
}