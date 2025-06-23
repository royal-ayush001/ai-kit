var log=console.log;
function op(elem){return document.querySelector(elem)}
function opp(elem){return document.querySelectorAll(elem)}

function resetFormat(){
  let keys={
    col: "color",
    fs: "fontSize",
    ff: "fontFamily",
    fw: "fontWeight",
  }
  for(let val in keys){
    opp(`*[${val}]`).forEach(elem=>{
      elem.style[keys[val]]=elem.getAttribute(val);
      elem.removeAttribute(val);
    })
  }

  opp(`*[ico]`).forEach(elem=>{
    elem.innerHTML=elems[elem.getAttribute('ico')];
    elem.removeAttribute('ico');
  })
  
  opp(".lineMargin").forEach(val=>{
    val.style.margin=val.getAttribute("m") || 0;
    val.style.height=val.getAttribute("h") || 0;
    val.style.width=val.getAttribute("w") || 0;
    val.style.background=val.getAttribute("bg") || 0;
  })
}

resetFormat();

function getVariableFromQuery(){
  var query=location.search.replace("?","");

  query=query.split("&");
  for(let val of query){
    val=decodeURI(val).split("=");
    log(val);
    window[val[0]]=val[1];
  }
}
function getLongUrl(shortUrl){
  if(shortUrl.includes("imgur.")){
    return `https://i.imgur.com/${shortUrl.replace("imgur.","")}.jpg`;
  }else{
    return `https://bit.ly/${shortUrl}`;
  }
}