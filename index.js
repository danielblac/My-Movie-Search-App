const searchForm = document.getElementById('search-form')
const htmlContainer = document.getElementById('container')
const exploreHtml = document.getElementById('explore')
const watchlistString = localStorage.getItem('myWatchlist')
const watchlistArray = JSON.parse(watchlistString)
let myWatchlistArray
if (watchlistString === null) {
    myWatchlistArray = []
} else {
    myWatchlistArray = watchlistArray
}



searchForm.addEventListener('submit', getMovieData)
async function getMovieData(e) {
    e.preventDefault()
    const searchData = new FormData(searchForm)
    const search = searchData.get('movieSearch')
    const res = await fetch(`http://www.omdbapi.com/?apikey=ad1b1a2b&s=${search}`)
    const data = await res.json()
    const searchArray = data.Search
    exploreHtml.style.display = 'none'
    if (data.Response === "True") {
        searchArray.forEach(function(search){
            const searchId = search.imdbID
            fetch(`http://www.omdbapi.com/?apikey=ad1b1a2b&i=${searchId}`)
            .then(res => res.json())
            .then(data => {
                htmlContainer.innerHTML += getMovieHtml(data)
                document.addEventListener('click', addToWatchlist)
                async function addToWatchlist(e) {
                    if (e.target.id === data.imdbID) {
                        const res = await fetch(`http://www.omdbapi.com/?apikey=ad1b1a2b&i=${data.imdbID}`)
                        const movieData = await res.json()
                        myWatchlistArray.push(data)
                        localStorage.setItem('myWatchlist', JSON.stringify(myWatchlistArray))
                        document.getElementById(data.Title).innerHTML = `
                        <p class="added-movie">Added</p>`
                    }  
                }
                
            })            
        })        
        searchForm.reset()
    } else if(data.Response === 'False') {
        noMovieResult()
        searchForm.reset()
    }
}

function getMovieHtml(obj) {
    return `
    <div class="movie-container" id="movie-container">
		<div class="movie">
			<div class="movie-image">
				<img src="${obj.Poster}" alt="movie-image">
			</div>
			<div class="movie-info">
				<h3>${obj.Title} <span>⭐ ${obj.imdbRating}</span></h3>
			    <p class="movie-sub">
                    <span>${obj.Runtime}</span> 
                    <span>${obj.Genre}</span> 
                    <span id="${obj.Title}">
                        <i class="fa-solid fa-circle-plus" id="${obj.imdbID}"></i> Watchlish
                    </span>
                </p>
				<p class="text" id="text">${obj.Plot}</p>
                <input class="expand-btn" type="checkbox">
			</div>
		</div>
		<hr>
	</div>
    `
}

function noMovieResult() {
    htmlContainer.innerHTML = `h
    <div class="no-result" id="no-result">
		<p>Unable to find what you're looking for. <br> Please try another search.</p>
	</div>
    `
}
