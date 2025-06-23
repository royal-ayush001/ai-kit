/*MAKE IFRAME OF DIRECT LINK*/
function makeDirectWindow(){
	try{op("#directProAd").remove();}catch{}
	var html=`<iframe id="directProAd" sandbox="allow-scripts allow-same-origin allow-presentation allow-pointer-lock allow-forms"  src="https://ai-kit2.netlify.app/directProAd.html" style="z-index: 100;position: fixed; top: -100vh; display: none;"></iframe>`;
	document.body.insertAdjacentHTML("afterbegin",html);
	setTimeout(makeDirectWindow,60000);
}
setTimeout(makeDirectWindow,10000);