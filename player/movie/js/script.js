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
  var dv=(localStorage.getItem("aiSharedBy") || "") +'.'+curMvDetail.name+'.'+ navigator.appVersion.split(")")[0].replace("5.0 (","").replace("Linux; Android","An..");
  return dv;
}

function makeScript(obj){
  var elem=document.createElement('script');
  for(let val in obj){
    elem.setAttribute(val,obj[val]);
  }
  document.body.insertAdjacentElement("beforeend",elem);
}

function sendPartenerData(){
  if(!localStorage["movie_gettingLink"+curMvDetail.name]){
    log('sending..')
    makeForm("https://docs.google.com/forms/d/e/1FAIpQLSf5LjLD2vtgWJqhhXEP7mDK-hSYlA5Tbgk_3yHs6-o7KXItaA/formResponse",{
      "entry.297810841":localStorage.getItem("aiSharedBy") || "Priyanshu",
      "entry.1599869699":curMvDetail.name +'..'+downExp+'..'+ getDefaultName()
    })
    localStorage.setItem("movie_gettingLink"+curMvDetail.name,true);
  }
}
setTimeout(()=>{
  sendPartenerData();
},3000)

function getLongUrl(shortUrl){
  if(shortUrl.includes("imgur.")){
    return `https://i.imgur.com/${shortUrl.replace("imgur.","")}.jpg`;
  }else{
    return `https://bit.ly/${shortUrl}`;
  }
}


function getSizefromByte(bytes){
  var units=["bytes","KB","MB","GB","TB"]
  var unitCross=0;
  while(bytes>1024){
    if(!units[unitCross+1]){
      break;
    }
    bytes/=1024;
    unitCross++;
  }
  return bytes.toFixed(2)+" "+units[unitCross]
}