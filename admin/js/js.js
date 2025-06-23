var autoPaste = opp(".autoPaste"),
	lnkIn = opp(".lnkIn"),
	nameIn = opp(".name");

class Movie {

	addMovies(){
		this.movieData.name=this.movieName;
		this.movieData.img=this.movieImg;
		this.movieData.movieQ=this.movieQ;
		this.movieData.type=op("#type").value;

		log(this.movieData);
		fetch("php/addMovie.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(this.movieData)
		}).then(response => response.json()).then(data => {
			if (data.status == true) {
				alert("Movie added successfully");
				this.movieData = {};

				op("#movieDataPan").remove();
			} else {
				alert("Error adding movie: " + data.message);
			}
		}).catch(error => {
			alert("Error: " + error);
		});
	}

	onHubDrivePaste(elem) {
		log("came pase")
		var movieData = {}
		fetch("php/getDirectLinkFromHubdrive.php?link=" + elem.value.trim(), {
			method: "GET",
		}).then(response => response.json()).then(data => {
			movieData = data.data;
			delete movieData.direct_dl;
			log(movieData)
			this.showMovieData(movieData);
			this.movieData = movieData;
		})
	}

	showMovieData(movieData) {
		var html = "<div id='movieDataPan'>";
		for (let key in movieData) {
			html+=`<div>
				<span class="key">${key}:</span>
				<span class="value">${movieData[key]}</span>
			</div>`
		}
		html+="</div>"
		document.querySelector(".workPan[panfor='movie']").insertAdjacentHTML('beforeend',html)
	}
	getSize(bytes){
		if (bytes < 1024) return bytes + " B";
		else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
		else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
		else return (bytes / 1073741824).toFixed(2) + " GB";
	}
}
var movie = new Movie();


autoPaste.forEach(val => {
	val.addEventListener("focus", () => {
		if (val.value == "") {
			navigator.clipboard.readText().then(ret => {
				val.value = ret || " ";
				val.blur();
				eval(val.getAttribute("onchange").replace("this","val") || "");
			});
		}
	});

	val.addEventListener("focus", () => {
		if (val.value.startsWith("http") && !val.getAttribute("tried")) {
			val.setAttribute("tried", 1);
			document.body.click();
		}
	})
})

function copy(txt) {
	let elem = document.createElement("textarea");
	document.body.insertAdjacentElement("beforeend", elem)
	elem.value = txt;
	elem.select();
	elem.setSelectionRange(0, 99999999999999);
	document.execCommand("copy");
	navigator.clipboard.writeText(elem.value);
	elem.remove();
}
