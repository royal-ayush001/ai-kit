
var mid=undefined,mlnk,sh,cat;
var params=decodeURI(location.search.replace("?",''));
params=params.split('&');
for(let a=0; a<params.length; a++){
	eval(params[a]);
}

if(mlnk){
	mlnk=mlnk.replaceAll("~~","&");
	setMovie(mlnk,"Direct Link");
}
else if(mid){
	var curMx=movies[mid];
	document.title=curMx.name + " : Ai-Player - All new movies";
	dialog.inside(`Want to watch <span fs="1.1em" col="#ff3000">'${curMx.name}'</span> for free.`);
	dialog.success=()=>{
		log(curMx)
		// setMovie(curMx.src,curMx.name,mid,curMx.altLnk);
		location.assign(`movie?mid=${mid}&m=${curMx.name}`);
	}
	dialog.show();
}
