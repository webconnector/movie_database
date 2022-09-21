$(document).ready(function(){
    // An event for when the form is submitted
    $('#searchForm').on('submit', function(e) {
        let searchedText = $('#searchText').val();
        getMovies(searchedText);
        e.preventDefault();
    });
    
});
  
// Getting the movies for the query 
function getMovies(searchedText){
    let apiKey = 'dbf0c96f'

    // making request to the API for the searched movie
    axios.get('http://www.omdbapi.com?s='+searchedText+'&apikey='+apiKey)
    .then(function(response) {
        console.log(response);

        // set a variable to get the data array 
        let movies = response.data.Search;

        // outputting the array set initially to nothing
        let output = '';

        // jquery each loop  
        $.each(movies, function(index, movie){
            
            // creating the output 
            output += `
            <div class="col-md-3 mb-2">
                <div class="well text-center text-white bg-dark">
                    <img src="${movie.Poster}">
                    <h5 class=""><a onclick="movieSelected('${movie.imdbID}')" href="#">${movie.Title}</a></h5>
                </div>
            </div>
            `;
        });
        
        // displaying the output to the screen throught 'movie' div 
        $('#movies').html(output);

    })
    // handling  errors incase there is any
    .catch(function(err){
        console.log(err);
    })

}


// function to store the id of the click movie into sessionStorage 
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

//function to get the movie selected
function getMovie() {
    let SiglemovieId = sessionStorage.getItem('movieId');

    let apiKey = 'dbf0c96f'

    // make request to the API
    axios.get('http://www.omdbapi.com?i='+SiglemovieId+ '&apikey='+apiKey)
    .then(function(response) {
        console.log(response); 
        let movie = response.data;
        let output =` 
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre} </li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released} </li>
                    <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime} </li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated} </li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> <span class="badge text-bg-success">${movie.imdbRating}</span> </li>
                    <li class="list-group-item"><strong>Language:</strong> ${movie.Language} </li>
                    <li class="list-group-item"><strong>Country:</strong> ${movie.Country} </li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director} </li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer} </li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors} </li>
                </ul>
            </div>
        </div> 

        <div class="row">
            <div class="well">
                <h3>Plot:</h3>
                ${movie.Plot }
                <hr>
                <a href="index.html" class="btn btn-success">Go Back To Search</a>
                <a href="" class="btn btn-success">Stream</a>
            </div>
        </div>
        `;
        $('#movie').html(output);
    })
    // catching errors incase there is any
    .catch(function(err){
        console.log(err);
    });
}

