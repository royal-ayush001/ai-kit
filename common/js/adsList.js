var suffle=true,
adsList=
{
gadgets:[
`B08L5FM4JC&asins=B08L5FM4JC&linkId=a4cf5cd793c01c3e48e082a2e9626de1`,
`B08372ZPVS&asins=B08372ZPVS&linkId=5c1a72e75dedd37889d3b6caf082a311`,
`B073QQR2H2&asins=B073QQR2H2&linkId=36dde79ed303492810e326e339c525db`,
`B08L5FM4JC&asins=B08L5FM4JC&linkId=a4cf5cd793c01c3e48e082a2e9626de1`,
`B07RHSM19W&asins=B07RHSM19W&linkId=8054446ce5dadea3ec708ed253f74d4f`,
`B08537BKZG&asins=B08537BKZG&linkId=38e9a664250e036c820246b3eb4234a4`,
`B07B77BMKM&asins=B07B77BMKM&linkId=6f178b8aa3b07ec9daa5c8917c2a9737`,
],
shoes:[
`B074WBRN4X&asins=B074WBRN4X&linkId=8c8900ea4c617ae77f97428ea66d9e40`,
`B089QK4BTR&asins=B089QK4BTR&linkId=ddbf14c5f6aa965158f01e67ab3cc706`,
],
gloves:[
`B08L6QPD8N&asins=B08L6QPD8N&linkId=3d7db260bd675a49d5ff95fd7ec315b9`,
],
hoodie:[
`B08SCD1V6G&asins=B08SCD1V6G&linkId=fda65ec5a19319fad13ce965819d1a4b`,
`B091J1ZK77&asins=B091J1ZK77&linkId=8867cc870acf384bbe534d7d42b82d24`,
`B08XKGRCC1&asins=B08XKGRCC1&linkId=cbafd18749e897f324a612c6e4c4c3f4`,
`B08BLQKSJZ&asins=B08BLQKSJZ&linkId=8d2383b7f51e67b9ab8ac3fb1c440a74`,
],
earphones:[
`B09JCFSD4Z&asins=B09JCFSD4Z&linkId=424f4242d888c2d41cf795bdd2c619d3`,
`B09BNZLTDZ&asins=B09BNZLTDZ&linkId=4bcaa7276f5413e1894d607e7ec9b77f`,
`B09K5HBWVL&asins=B09K5HBWVL&linkId=8b9c8a9184e44ac974d71ee5271a724e`,
`B08XQQ1GM1&asins=B08XQQ1GM1&linkId=b3b4695ad1fb8be3e03879be1a632667`,
],
free_fire:[
`B09HL5R4SG&asins=B09HL5R4SG&linkId=85cdd31243189ef82bb0de1d1e1c8629`,
`B09LR11YBK&asins=B09LR11YBK&linkId=8584d44c6c4fb40422f8f282bd666f06`,
],
watches:[
`B08GSRCGRG&asins=B08GSRCGRG&linkId=7603316b9b3ec422a78b7b6068657550`,
`B08FTFYTN8&asins=B08FTFYTN8&linkId=13e51a897276465cf32d712c22f64659`,
`B07Q17WT6M&asins=B07Q17WT6M&linkId=2070b54221e50dd2f449b747aa6ff737`,
],
Mobile:[
`B09FKDH6FS&asins=B09FKDH6FS&linkId=ad31c52354666960fb81005ffda84c38`,
`B089MTJVLD&asins=B089MTJVLD&linkId=c366f10a4285ebf5192dde62b6e928e8`,
],
heaters:[
`B00ABMASXG&asins=B00ABMASXG&linkId=f030d3a2896fabe7bfc131c8c427afef`,
`B07WMS7TWB&asins=B07WMS7TWB&linkId=7a96fbce9c018b153411ba7e6c5d50a2`,
`B097R45BH8&asins=B097R45BH8&linkId=b073cf44b2fdf97101cd82f2e960adae`,
],
}


function setChoice(t){
	adChoice.fav=[t,adChoice.fav[0]];
	log("choice set:"+t)
	localStorage.setItem("adChoice",JSON.stringify(adChoice));
}

var adAry=[],priType=[],type=[],adChoice=JSON.parse(localStorage.getItem("adChoice"))||{},
choiced=adChoice.fav?true:false;
adChoice.fav=adChoice.fav?adChoice.fav:[];
for(let val in adsList){
	type.push(val);
}

if(adChoice.fav && suffle==true){
	for(let val of adChoice.fav){
		if(adsList[val]){
			priType.push(...type.splice(type.indexOf(val)-1,3));
		}
	}
}
priType.push(...type);

for(let val of priType){
	var aryx=adsList[val].map(v=>{
		return [`<iframe onclick="setChoice('${val}');" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=priyanshu002b-21&language=en_IN&marketplace=amazon&region=IN&placement=${v}&show_border=true&link_opens_in_new_window=true"></iframe>`,val]
	});
	adAry.push(...aryx);
}

if(!choiced){
	var randomx=[];
	while(adAry.length){
		randomx.push(...adAry.splice(Math.floor(Math.random()*adAry.length),1));
	}
	adAry=randomx;
}


/*<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=priyanshu002b-21&language=en_IN&marketplace=amazon&region=IN&placement=${lnk}&show_border=true&link_opens_in_new_window=true"></iframe>*/
