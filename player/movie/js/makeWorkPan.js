getVariableFromQuery();
var curMvDetail;
fetch("https://api.coinsons.com/ai-kit/admin/php/movieDataByName.php?name=" + m).then(ret => ret.json()).then(res => {
	log(res)
	curMvDetail = res;
	showCurDetail();
})

function showCurDetail() {
	var downLnks = ``
	for (let val of curMvDetail) {
		downLnks += `<div>
			<p>${getSizefromByte(val.size)} : ${val.quality+ (val.quality.includes("K")?"":" Px")}</p>
			<div class='subBtn' style="display: block;">
  			<button class="noBtn" onclick='checkAndDirectDownload("${val.directLink}");'>Download</button>
			</div>
		</div>
  	<div class="lineMargin" m="20px" w="100%" h="1px" bg="#fff"></div>
		
		`
	}

	document.title = document.title.replace("movie", curMvDetail[0].name + ' Movie');
	op('.workPan').insertAdjacentHTML("afterbegin", `
<div class="downBtn active flex c">
	<button class="noBtn" style="padding: 40px 20px;background: linear-gradient(90deg, #ff0077 50%, #00c8ff 50%);clip-path: polygon(50% 25%, 5% 0%, 0% 70%, 50% 100%, 100% 70%, 95% 0%);color: #fff;font-size: 1em;text-shadow: 0 2px 10px #000;font-weight: bold;">Install App</button>
	<p>0.8 MB App</p>
</div>

<div class="lineMargin" m="10px"></div>

<div class="posterPan flex">
  <div class="poster">
    <img src="${curMvDetail[0].img}" alt="">
    <div class="lineMargin" m="10px"></div>
    <h2 class="name">${curMvDetail[0].name}</h2>
    <div class="lineMargin" m="10px"></div>
  </div>
</div>

<div class="lineMargin" m="10px"></div>

<div class="movieImgBtn flex">
  <button class="flex c noBtn" onclick="window.open('https://www.google.com/search?q=${curMvDetail[0].name}+movie+scene&tbm=isch')"><img src="img/scene.svg" alt=""><p col="#fff">Scene</p></button>
  <button class="flex c noBtn" onclick="window.open('https://www.google.com/search?q=cast of ${curMvDetail[0].name}+movie')"><img src="img/actors.svg" alt=""><p col="#fff">Actors</p></button>
</div>

<div class="lineMargin" m="50px" w='50%' h='1px' bg="#666"></div>


<div class="linkPan flex c">
	<p class='texCen'>👇👇 Choose the link to download</p>
	<div class="lineMargin" m="5px"></div>

  <div class="chooseLink flex c texCen" col="#fff">
		${downLnks}

  </div>
</div>
`)
	resetFormat()
}


var curMvDetail = movies[mid], mainLnk = curMvDetail.src, downExp = Number(localStorage.getItem('downExp') || 0);


var exInc = false;
function getLink(elem, value) {
	if (!isDownLoaded() && downExp > 1) {
		alert("You need to open 'Ai Player' app to watch movies");
		op(".downBtn").click();
	} else {
		if (value == "alt") {
			location.assign('https://ai-player-downloader.netlify.app?lnk=' + JSON.stringify(getAltLnk(curMvDetail)));
		} else if (value.includes("download")) {
			location.assign('https://ai-player-downloader.netlify.app?lnk=' + JSON.stringify(getPxLnk(curMvDetail, elem.innerText.replace('px', ''))));
		} else if (value.includes("watch")) {
			location.assign('https://ai-playerx.netlify.app?mlnk="' + mainLnk.replaceAll('480', elem.innerText.replace('px', '')) + '"');
		}

		if (!exInc) {
			localStorage.setItem('downExp', ++downExp);
			exInc = true;
		}
		// window.open('https://www.highrevenuegate.com/z2yyd7d1?key=af770677dcffca4ead1cd93452352b57');
	}
}



function getVariableFromQuery() {
	var query = location.search.replace("?", "");

	query = query.split("&");
	for (let val of query) {
		val = decodeURI(val).split("=");
		window[val[0]] = val[1];
	}
}

function checkAndDirectDownload(lnk){
	fetch("https://api.coinsons.com/ai-kit/admin/php/checkFileExist.php?link=" + lnk).then(ret => ret.json()).then(res => {
		if(res.status){
			location.assign(res.lnk);
		}
	})
}
