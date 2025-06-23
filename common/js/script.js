var log=console.log;
function op(elem){return document.querySelector(elem)}
function opp(elem){return document.querySelectorAll(elem)}

function resetFormat(){
  let keys={
    col: "color",
    fs: "fontSize",
    ff: "fontFamily",
    fw: "fontWeight",
    bg: "background"
  }
  for(let val in keys){
    opp(`*[${val}]`).forEach(elem=>{
      elem.style[keys[val]]=elem.getAttribute(val);
      elem.removeAttribute(val);
    })
  }
  
  opp("*[ico]").forEach(val=>{
    val.insertAdjacentHTML("beforeend",elems[val.getAttribute("ico")]);
    val.removeAttribute("ico");
    val.style.fill=val.getAttribute("fill");
  })
}
resetFormat();
function copyToClipboard(txt){
  let elem=document.createElement("textarea");
  document.body.insertAdjacentElement("beforeend",elem)
  elem.value=txt;
  elem.select();
  elem.setSelectionRange(0, 99999999999999); 
  document.execCommand("copy");
  try{navigator.clipboard.writeText(elem.value);}catch{}
  elem.remove();
  return true;
}

if(self!=top){
  top.location=self.location;
}

function addStyle(url){
  document.body.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="${url}">`);
}
function addScript(url){
  var elem=document.createElement("script");
  elem.src=url;
  document.body.insertAdjacentElement("beforeend",elem);
}
function makeScript(obj){
  var elem=document.createElement('script');
  for(let val in obj){
    elem.setAttribute(val,obj[val]);
  }
  document.body.insertAdjacentElement("beforeend",elem);
}

function stored(varN,type=false){
  var toR=localStorage.getItem(varN) || false;
  if(type){toR=Number(toR)}
  return toR;
}
function makeForm(action,data){
  let html=`<form action="${action}">`
  for(let val in data){
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
  return dv;
}


/*BLUR FUNCTIONS*/
function checkBlur(after,fn){
  tim=setTimeout(()=>{
    eval(fn+"()");
  },after*1000);
}

function getAgo(time){
  var nowTime=new Date().getTime(),
  diff=Math.abs(Math.floor((nowTime - time))/1000);
  var pri={
    seconds: 0,
    minutes: 60,
    hours: 60*60,
    days: 60*60*24,
    months: 60*60*24*30,
  }
  var s="months";
  for(let val in pri){
    if(pri[val]>diff){
      s=oldT;
      break;
    }
    var oldT=val;
  }
  return [Math.floor(diff/pri[s]),s];
}

function getLongUrl(shortUrl){
  if(shortUrl.includes("imgur.")){
    return `https://i.imgur.com/${shortUrl.replace("imgur.","")}.jpg`;
  }else{
    return `https://bit.ly/${shortUrl}`;
  }
}