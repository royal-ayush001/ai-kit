let shareName=["Pathaan","Awesome Code","Chahat","Telegram","Prashant","AshishSharma","Sinchan","Aman","fb","insta","other","qr code","Atul","code viewer site","ai kit","WISH","User share","Spin&Win","MallQr","ShortShare","Down Share"];
try{
  if(sh && !localStorage.getItem('aiSharedBy')){
    localStorage.setItem('aiSharedBy',shareName[sh-1]);
  }
}catch(e){}
