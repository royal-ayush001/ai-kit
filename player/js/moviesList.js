var log = console.log,
	serverError = false,
	currentToshow,
	alreadyShown = 0,
	lastMovieElem,
	listPan = op(".listPan"),
	mvNum = Math.floor(window.innerWidth / 350) * 6,
	showMore = true,
	search = op("#search"),
	category = op("#category"),
	srhTop = op(".mainBnr").offsetHeight + 300,
	seriesOnly = false,
	loadedPage = false,
	loadAllPage = false,
	checkPageMoreTim = true;

mvNum = mvNum < 10 ? 10 : mvNum;
addMovies();

function searchCat() {
	if (category.value == "webseries") {
		currentToshow = webseries;
		seriesOnly = true;
	} else {
		seriesOnly = false;
		currentToshow = movies.filter(val => {
			if (category.value == 0) {
				return val;
			}
			if (val.type == category.value) {
				return val;
			}
		})
	}
	resetMvPan();
	location.assign(`#${category.value}`);
}

function doSearch() {
	var tosrh = seriesOnly ? webseriesAry : movies;
	currentToshow = tosrh.filter(val => {
		if (val.name.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())) {
			return val;
		}
	})
	resetMvPan();
}

var timX;
function addMovies() {
	var htmlxx = "";
	for (var i = alreadyShown; i <= mvNum + alreadyShown; i++) {
		var val = currentToshow[i];
		if (!val) { showMore = false; noMore(); break; }
		htmlxx += seriesOnly ? getSriesHtml(val, i) : getMvHtml(val);
	}
	alreadyShown = i;
	listPan.innerHTML += htmlxx;
	addEvtoLastMv();
	resetFormat();
	clearTimeout(timX);
	// timX=setTimeout(adsFun.addPan,1000)
}

function getSriesHtml(val, sid) {
	var lnkHtml = "";
	for (let i = 1; i <= val.links.length; i++) {
		lnkHtml += `<div class="flex" onclick="setMovie('${val.links[i - 1]}','${val.name} Episode ${i}')"><span>${i}</span></div>`;
	}
	return `<div class="noAd moviePan series flex c">
					<div class="poster w100p">
						<img src="${val.img}" alt="${val.name}" loading="lazy" class="w100p">

						<div class="downPan flex c">
							<p fs="1.1em" col="#fff">Episodes</p>
							<div class="eps flex">
								${lnkHtml}
							</div>
						</div>
					</div>
					<div class="data flex">
						<div class="name">${val.name}</div>
						<div class="downSr mvActBtn" ico="download" padding: 5px 7px; cursor: pointer; border-radius: 2px;" onclick="downSeries(${sid})"></div>
					</div>

				</div>`;
}
function downSeries(sid) {
	let val = webseries[sid],
		objx = { name: val.name, links: val.links },
		allLnk = "https://ai-player-downloader.netlify.app/series.html?lnk=" + JSON.stringify(objx);
	checkDownTrue(allLnk);
}

function getMvHtml(val) {
	return `<div class="moviePan noAd flex c">
					<div class="poster w100p" onclick="location.assign('movie?mid=${val.mid}&m=${val.name}')"><!---onlick was setMovie('${val.src}','${val.name}',${val.mid},'${val.altLnk}');--->
						<img src="${val.img}" alt="${val.name}" loading="lazy" class="w100p">
					</div>
					<div class="data flex">
						<div class="name"v onclick="location.assign('movie?mid=${val.mid}&m=${val.name}')">${val.name}</div>

						<!---<div class="btnBn flex">
							<div class="mvActBtn flex" ico="send" onclick="shareCurent(${val.mid},'${val.name}')"></div>
							<div class="mvActBtn flex" ico="download" onclick="movieDownloadData(${val.mid})"></div>

						</div>--->
					</div>
				</div>`;
}

function movieDownloadData(midx) {
	var val = movies[midx];
	log(val);
	checkDownTrue(`https://ai-player-downloader.netlify.app?lnk=${JSON.stringify(val)}`)
}
/*
function share(mid,name=""){
	var val=movies[mid];
	shareApp({url: getURI()+`?mid=${mid}&sh=17`,title: val.name,text: `Direct movie link ${name}`});
}*/
function getURI() {
	return location.origin;
}
function addEvtoLastMv() {
	lastMovieElem = op(".moviePan:last-of-type");
}

search.onfocus = () => {
	loadPage();
	loadAllPage = true;
	window.scrollTo(0, srhTop)
}


window.onscroll = (e) => {
	if (lastMovieElem && window.innerHeight > lastMovieElem.getBoundingClientRect().top && showMore) {
		addMovies();
	}
	if (checkPageMoreTim && !showMore /*window.scrollY > document.body.offsetHeight - 1000*/) {
		log("yes load next page...");
		checkPageMoreTim = false;

		loadPage();
		try { fetchMore(); } catch { }
	}
}

function resetMvPan() {
	listPan.innerHTML = "";
	alreadyShown = 0;
	showMore = true;
	if (currentToshow[0]) {
		addMovies();
	} else {
		listPan.innerHTML = (seriesOnly && alreadyShown == 0) ? "" : "<div col='#888'>Not found!</div>";
		resetFormat()
	}
}

function noMore() { }

function copy(txt) {
	let elem = document.createElement("input");
	document.body.insertAdjacentElement("beforeend", elem)
	elem.value = txt;
	elem.select();
	elem.setSelectionRange(0, 99999);
	document.execCommand("copy");
	try { navigator.clipboard.writeText(elem.value); } catch { }
	elem.remove();
	return true;
}
function sendDownInfo(data) {
	try { send("DOWN:" + data) } catch { }
}
function checkDownTrue(lnk) {

	if (isDownLoaded()) {
		saveDownData();
		window.open(lnk);
		directAdonSame();
	} else {
		dialog.inside(`<div fs="1.2em" col="#ff0059">/...Download App</div><span col="#444" ff="glory">Open in App to enable downloading feature.</span><br><span col="#000">Click on install.</span>`)
		dialog.buttons("Close", "Ok");
		dialog.show();
		dialog.hide = () => {
			dgbx.classList.remove("active");
			if (readyToDownload) {
				downBtn1.click();
			}
			dialog.hide = () => { dgbx.classList.remove("active"); }
		}
		dialog.success = () => {
			if (readyToDownload) {
				downBtn1.click();
			}
		}
	}
}
function directAdonSame() {
	// location.assign(extLink);
}

function loadPage() {
	if (!loadedPage) {
		addScript("passiveMovies/loadMorePage.js");
		loadedPage = true;
	}
}

function movieListLoadedSoStart() {
	startBnrMaking();
	searchCat();
	currentToshow=movies
}
