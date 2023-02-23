const emptyWatchlist = document.getElementById('empty-watchlist')
const movieWatchlist = document.getElementById('my-container')
let watchlistArray = JSON.parse(localStorage.getItem('myWatchlist'))

document.addEventListener('click', removeMovieObj)
function removeMovieObj(e) {
    watchlistArray.forEach(function(movie) {
        if (e.target.id === movie.imdbID) {
            const movieObj = watchlistArray.findIndex(function(item) {
                return item === movie
            })
            watchlistArray.splice(movieObj, 1)
            localStorage.setItem('myWatchlist', JSON.stringify(watchlistArray))
            getMyWatchlistHtml()
        }
    })
}

function getMyWatchlistHtml() {
    if (watchlistArray.length > 0) {
        movieWatchlist.innerHTML = ``
        watchlistArray.forEach(function(movie) {
            movieWatchlist.innerHTML += `
            <div class="movie-container"        id="movie-container">
                <div class="movie">
                    <div class="movie-image">
                        <img src="${movie.Poster}" alt="movie-image">
                    </div>
                    <div class="movie-info">
                        <h3>${movie.Title} <span>⭐ ${movie.imdbRating}</span></h3>
                        <p class="movie-sub">
                            <span>${movie.Runtime}</span> 
                            <span>${movie.Genre}</span> 
                            <span>
                                <i class="fa-solid fa-circle-minus" id="${movie.imdbID}"></i> Remove
                            </span>
                        </p>
                        <p class="text">${movie.Plot}</p>
                        <input class="expand-btn" type="checkbox">
                    </div>
                </div>
                <hr>
            </div>
            `
    })
    } else {
        movieWatchlist.innerHTML = `
        <div class="empty-watchlist" id="empty-watchlist">
			<p>Your watchlist is looking a little empty...</p>
			<a href="index.html">
				<i class="fa-solid fa-circle-plus"></i> Let's add some movies!
			</a>
		</div>
        `
    }
}
getMyWatchlistHtml()