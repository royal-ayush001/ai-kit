op("#errPan").innerHTML=`Due to technical error. You need to <b>Dowload</b> the Movies and WebSeries, You can't play it online.`;
function tempPreventPlay() {
	stopPlaying();
	dialog.inside("Due to technical error. You need to <b>Dowload</b> the Movies and WebSeries, You can't play it online.");
	dialog.buttons("Close","Ok");
	dialog.show();
}