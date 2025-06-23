document.body.style.display='none';
try{
    fetch('php/logincheck.php',{
        'content-type': 'application/json',
        'method':'get'
    }).then(ret=>ret.json()).then(res=>{
        if(res.status){
          document.body.style.display='';
        }else{
            location.replace('../admin/login.html')
        }
    })
}catch(err){
    alert("An error occured! Try again later")
}