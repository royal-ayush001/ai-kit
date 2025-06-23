/*
bollywood=1
southMovies=2
engMovieHindiDubbed=3
*/
var movies=[]
fetch("https://api.coinsons.com/ai-kit/admin/php/getAllMovie.php").then(ret=>ret.json()).then(res=>{
	movies=res;
	log(movies)
	try{
		movieListLoadedSoStart();
	}catch(er){}
});
