function startBnrMaking() {
	var mvtoshow = movies.length > 5 ? 5 : movies.length;
	var posPan = op(".posPan");

	var html = "";
	for (let i = 0; i < mvtoshow; i++) {

		let mid = movies[i]['mid'], valx = movies[i];
		html += `<div class="pos" mid="${mid}" onclick="location.assign('movie?mid=${valx.mid}&m=${valx.name}')">
		  		<img src="${valx.img}" alt="${valx.name}">
		  	 </div>`;
	}
	posPan.innerHTML = html;
	var fistImgxx = op(".posPan img");
	var tosub = (posPan.offsetWidth % fistImgxx.offsetWidth) / 2 - 8;

	var psLeft = [];
	opp(".posPan .pos").forEach(val => {
		psLeft.push(val.offsetLeft);
	})

	var scrNum = 0;
	posPan.addEventListener('scroll', userScroll);
	autoscroll();
	var scrInt = setInterval(autoscroll, 2000);
	function autoscroll() {
		posPan.removeEventListener('scroll', userScroll);
		posPan.scrollTo(psLeft[scrNum] - tosub, 0);
		scrNum++;
		if (scrNum == mvtoshow) { scrNum = 0 }
		setTimeout(() => {
			posPan.addEventListener('scroll', userScroll);
		}, 1000)
	}

	function userScroll() {
		clearInterval(scrInt);
	}
}

