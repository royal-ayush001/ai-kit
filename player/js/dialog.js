var dgbx=op('.dgBx');
var dialog={
	show:()=>{
		dgbx.classList.add("active");
		resetFormat();
	},
	hide:()=>{
		dgbx.classList.remove("active");
	},
	success:()=>{
		elem.click();
	},
	inside: (txt)=>{
		op('.dgBx .dg p').innerHTML=txt;
	},
	buttons:(no="No",yes="Yes")=>{
		op(".dgBx .btp button span").innerText=no;
		op(".dgBx .btp .yes span").innerText=yes;
	},
	activateYesBtn: ()=>{
		op(".dgBx .btp .yes span").classList.toggle("notWorking");
	}
}
op(".dg").onclick=(e)=>{e.stopPropagation();}