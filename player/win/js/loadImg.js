var imgAry=[];

for(let i=1; i<=9; i++){
	imgAry.push(`win/img/product/${i}.png`);
}

var html="";
for(let val of imgAry){
	html+=`<img src="${val}" hidden onload="loaded();">`;
}
document.body.insertAdjacentHTML("afterbegin",html);

var loadedN=0;
function loaded(){
	loadedN++;
}