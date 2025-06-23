makeProTheme();
if(location.hash=="#pro"){
	proAlert();
}
function makeProTheme(){
	op("#aiHead").innerHTML+="*";
	op("body").style.setProperty("--stdBg","linear-gradient(45deg,#ff7979,#cb427b)");
}


function proAlert(){
	dialog.inside(`<div fs="1.4em" col="#f30">Enjoy Premium:</div>
<ul style="margin-left: 20px;">
	<li>No <b><u>PopUp ads</u></b>.</li>
	<li>No <u><b>sharing</b></u> in movie.</li>
	<li>No auto <u><b>open window</b></u>.</li>
	<li><b><u>No disturbance</u></b> & smooth exp...</li>
</ul>
		`);
	dialog.buttons("Sad","Wow");
	dialog.success=()=>{};
	dialog.show();
}