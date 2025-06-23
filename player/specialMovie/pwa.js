let readyToDownload=false;
if ('serviceWorker' in navigator) {
   window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').then(function (registration) {log(registration)}, function (err) {
   	log(err)
   }); });
}
let deferredPrompt;
var downBtn=op(".downBtn");
log(downBtn)
downBtn.classList.remove("active")

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); deferredPrompt = e;
  downBtn.classList.add("active")
  readyToDownload=true;
})
downBtn.onclick=(e) => {
  deferredPrompt.prompt(); deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      log('downloadedNOe '+downloadedNow);
      downloadedNow=true;
    } else {}
  });
};
/*
class disableBackBtn{
  static nchange=0;
  disable(n){
    if(n){
      for(var i=1; i<n; i++){location.hash+="dis_"+n;disableBackBtn.nchange++;}
    }else{
      location.hash+=this.preHash="dis_"+disableBackBtn.nchange;
      disableBackBtn.nchange++;
      setTimeout(()=>{
        window.addEventListener("hashchange",back.repeatHash);
      },200)
    }
  }
  repeatHash(){
    if(!location.hash.includes(this.preHash)){
      console.log(disableBackBtn.nchange)
      location.hash+=this.preHash="dis_"+disableBackBtn.nchange;
    }
  }
  pressAgainToExit(fn){
    if(fn){
      location.hash+=this.pressedAgainHash="dis_"+1;

      setTimeout(()=>{
        window.addEventListener("hashchange",()=>{
          if(!location.hash.includes(this.pressedAgainHash)){
            fn();
          }
        }); 
      },200)
    }
  }
  enable(){
    window.removeEventListener("hashchange",back.repeatHash);
    history.go(-disableBackBtn.nchange);
  }
}
var back=new disableBackBtn();
*/