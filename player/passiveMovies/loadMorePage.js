var totalPage=0;

fetchMore();

function fetchMore(){
	if(loadAllPage){
		loadAllPageNow();
		return false;
	}
	if(totalPage>0){
		loadNext();
	}
}

function loadNext(pageNum=totalPage){
	log(`passiveMovies/${pageNum}.pmv`);
	fetch(`passiveMovies/${pageNum}.pmv`).then(ret=>ret.text()).then(res=>{
		arrangeFetched(res);
		totalPage--;
		checkPageMoreTim=true;
	})
}

function loadAllPageNow(){
	log("loading... all page at once");
	loadAllPage=false;
	while(totalPage>0){
		loadNext();
		totalPage--;
	}
}

function arrangeFetched(raw) {
	raw=JSON.parse(raw);
	showMore=true;
	for(let val of raw){
		moviesAry.push({
			mid:0,
			name: val[0],
			img: "https://bit.ly/"+val[1],
			src: makeFullSrc(val[2]),
			category: val[3]
		});
	}
	doSearch();
}
