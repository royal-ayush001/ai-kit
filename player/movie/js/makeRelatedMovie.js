var relatedMvHtml="";

var showCat=curMvDetail.category,sameCatMids=[];

for(let val of movies){
  if(movies[val].type==showCat){
    sameCatMids.push(val);
  }
}
var len=sameCatMids.length;
for(var i=0; i<20; i++){
  var mid=sameCatMids.splice(Math.floor(Math.random()*sameCatMids.length),1)[0];
  relatedMvHtml+=`<a href="?mid=${mid}&m=${movies[mid].name}">
    <img src="${movies[mid].img}" alt="${movies[mid].name}">
  </a>`;
}

op(".relatedOne").insertAdjacentHTML("beforeend",relatedMvHtml)