let readyToDownload=false,
downloadedNow=false;

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

function isDownLoaded() {
  return (window.matchMedia('(display-mode: standalone)').matches) || !deferredPrompt || downloadedNow;
}