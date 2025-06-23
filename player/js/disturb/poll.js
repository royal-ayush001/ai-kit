var pollQ={
age:{q:"What is your age group?",type: "opt",opt:["Less than 10","10 - 20 Years","20 - 30 Years","More than 30"]},
gender:{q:"What is your gender?",type: "opt",opt:["Male","Female","Other"]},
}

function loadPollInStart(toPollFor){
	loadShowCont.innerHTML=getPollHtml(pollQ[toPollFor]);
	resetFormat();
}

function getPollHtml(val){
	var ansHtml=`<p class="ans"><input type="text" onchange="savePoll(this.value)"></p>`;
	if(val.type=="opt"){
		ansHtml="";
		for(let i of val.opt){
			ansHtml+=`<p onclick="savePoll(this.innerText)" class="ans">${i}</p>`;
		}
	}
	var html=`<div class="poll">
		<p class="q">${val.q}</p>
		<div class="optPan">
		 	${ansHtml}
		</div>
	</div>`;
	return html;
}

function savePoll(toSave){
	localStorage.setItem(toPollFor,toSave);
	skipLoad();
	send("/..."+toPollFor+" : "+toSave);
}
