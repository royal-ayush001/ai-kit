var html="",seriesN=0;

for(let val of webseriesAry){
	html+=`
	<a class="flex c" href="seriesPage/index.html?sid=${seriesN++}&name=${val.name}">
		<img src="${val.img}" alt="${val.name}">
		<span>${val.name}</span>
	</a>`
}

op('.content').insertAdjacentHTML("afterbegin",html);