getVariableFromQuery();
var curData=webseriesAry[sid],
lnkBtnHTML='',lnkBtns=1;
document.title=document.title.replace("this",curData.name);

for(let a of curData.alt){
	lnkBtnHTML+=`<a href="${a}" target="__blank"><button class="noBtn">Episode ${lnkBtns++}</button></a>`;
}

var html=`

<img src="${curData.img}" alt="${curData.name}">

<div class="lineMargin" m="10px"></div>

<h3>${curData.name} @ 720px</h3>

<div class="lineMargin" w="80%" h="1px" bg="#0006" m="50px"></div>

<div class="lnkPan flex">
${lnkBtnHTML}
</div>
`;

op(".content").insertAdjacentHTML("afterbegin",html);