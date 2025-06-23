function send(data,name=getDefaultName()){
	makeForm("https://docs.google.com/forms/u/0/d/e/1FAIpQLSe7MJPJV9JjHwBqSQWEVzRd0ZKUTUeEA4mq03l-AtAy9I3YHQ/formResponse",{
		"entry.996459346" : name,
		"entry.735282255" : data
	});
}

function sendEmail(em){
	makeForm("https://docs.google.com/forms/u/0/d/e/1FAIpQLSc72ngEcOXuvd4qm8aKynkoMUawwzE3d9RAxTehZ_r0iKM5Yw/formResponse",{"entry.894406503":em});
}
function makeForm(action,data){
	let html=`<form action="${action}">`
	for(val in data){
		html+=`<input name="${val}" value="${data[val]}">`;
	}
	html+=`<button>Submit</button></form>`

	op("body").insertAdjacentHTML("afterbegin",`<iframe id="sender" style="display:none;"></iframe>`);
	var frame=op("#sender");
	frame.contentWindow.document.querySelector("body").innerHTML=html;
	frame.contentWindow.document.querySelector("button").click();
}

function getDefaultName(name){
	var dv=navigator.appVersion.split(")")[0].replace("5.0 (","").replace("Linux; Android","An..");
	return dv
}