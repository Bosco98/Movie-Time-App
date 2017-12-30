$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
})

function getMovies(searchText) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
                $('#movies').append( `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}">
                            <h5>${movie.title}</h5>
                            <a onClick="movieSelected('${movie.id}')" class="btn btn-primary">Movie Details</a>
                        <div/>
                    </div>
                `);

                console.log(output);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}


function movieSelected(id) {
    console.log(id)
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId'); 
    
    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=fa155f635119344d33fcb84fb807649b')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="thumbnail">  
                </div>
                <div class="col-md-8">
                    <h2>${movie.title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"></strong>Genre : ${movie.genres[0]['name']}</li>
                        <li class="list-group-item"></strong>Released : ${movie.release_date}</li>
                        <li class="list-group-item"></strong>IMDB Rating : ${movie.vote_average}</li>
                        <li class="list-group-item"></strong>Status : ${movie.status}</li>
                        
                        <li class="list-group-item"></strong>Runtime : ${movie.runtime} mins</li>
                        <li class="list-group-item"></strong>Produced By : ${movie.production_companies[0]['name']}</li>
                        <li class="list-group-item"></strong>Production Country : ${movie.production_countries[0]['name']}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.overview}
                    <br>
                    <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View In IMDB</a>
                    <a href="index.html" class="btn btn-primary">Go Back &raquo;</a>
                </div>
            </div>
        `;

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}