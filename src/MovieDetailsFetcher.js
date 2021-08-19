import './MovieDetailsFetcher.css';
import { useState, useEffect } from 'react';

function MovieDetailsFetcher() {

    let [title, setTitle] = useState("Vedam");
    let [movieInfo, setMovieInfo] = useState(null);

    function searchTheDB() {
        fetchMovieInfoFromTitle();
    }

    useEffect(() => {
        fetchMovieInfoFromTitle();
    }, [])

    function fetchMovieInfoFromTitle() {
        let url = `https://omdbapi.com/?t=${title}&apikey=8bf44776`;
        fetch(url).then((data) => data.json()).then((movie) => setMovieInfo(movie))
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="movie-content">
            <h1>Movies/Series Database</h1>
            <div className="input-fields">
                <input type="text" placeholder="Enter Movie or Series Name" className="input-field input-types" onChange={(event) => { setTitle(event.target.value); }} />
                <button type="submit" className="submit-btn input-types" onClick={searchTheDB}>Seach Me</button>
            </div>
            {
                movieInfo?.Response === "True" ?
                    <div className="movie-body">
                        <div className="movie-poster">
                            <img src={movieInfo?.Poster} alt="poster" className="movie-poster-img" />
                        </div>
                        <div className="movie-details">
                            <p><strong>Title</strong> : {movieInfo?.Title}</p>
                            <p><strong>Release date</strong> : {movieInfo?.Released}</p>
                            <p><strong>Runtime</strong> : {movieInfo?.Runtime}</p>
                            <p><strong>Genre</strong> : {movieInfo?.Genre}</p>
                            <p><strong>Director</strong> : {movieInfo?.Director}</p>
                            <p><strong>Cast</strong> : {movieInfo?.Actors}</p>
                            <p><strong>Plot</strong> : {movieInfo?.Plot}</p>
                            <p><strong>Language</strong> : {movieInfo?.Language}</p>
                            <p><strong>Country</strong> : {movieInfo?.Country}</p>
                            <div className="ratings">
                                {movieInfo?.Ratings.map((rating, index) => (
                                    <div key={index}>
                                        <p>{rating.Source}</p>
                                        <h3>{rating.Value}</h3>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    :
                    <div className="movie-body">
                        <h1>Movie/Series Not Found</h1>
                    </div>
            }

        </div>
    );
}


export default MovieDetailsFetcher;