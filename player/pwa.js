// op("head").insertAdjacentHTML("beforeend",`<link rel="manifest" href="pwa/manifest.json">`)
let readyToDownload=false;
if ('serviceWorker' in navigator) {
   window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').then(function (registration) {}, function (err) {}); });
}
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); deferredPrompt = e;
  downBtn1.classList.add("active");
  downBtn2.classList.add("active");
  readyToDownload=true;

  makeDown(true);
})
makeDown(false)
function makeDown(f=true){
  downBtn.forEach(val=>{
    val.classList[f?"add":"remove"]("exact");
    if(f){
      val.onclick=(e) => {
      deferredPrompt.prompt(); deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // console.log('User accepted the install prompt');
        } else { /*console.log('User dismissed the install prompt');*/ }
      });
    };
    }else{
      val.onclick=()=>{
        shareApp({title: "Ai Player",text: "Watch here all new movies",url:getURI()+"?sh=17"})
      };
    }
  })
}
function shareApp(data){
  log(data)
  try{
    navigator.share(data)
  }catch{
    copy(data.url);
    dialog.inside("Link Copied! <br>Now you can paste the link and share.");
    dialog.show();
    dialog.success=()=>{dialog.hide()}
  }
  /*data={ title,text,url }*/
}