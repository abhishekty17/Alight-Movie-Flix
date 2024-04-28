import React from 'react'

function MovieList(props) {

    let [value, setvalue] = React.useState("");
    let [movies, setmovie] = React.useState("");
    let [Favourite, setFavourite] = React.useState([]);
    function setText(e) {
        let inputvalue = e.target.value;
        setvalue(inputvalue);
    }

    React.useEffect(function () {
        async function fn() {
            let response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=16e7df484a81f634d85b2f25f938585d&page=" + props.pageNo);
            console.log(props.pageNo);
            let data = await response.json();
            let movies = data.results;
            setmovie(movies);
        }
        fn();
    }, [props.pageNo]);


    let newMovieArray = searchArray(movies, value);

    function searchArray(movieArray, inputsearchvalue) {
        let newfilterarray = [];
        for (let i = 0; i < movieArray.length; i++) {
            let upprsearchtext = inputsearchvalue.toUpperCase();
            let movietext = movieArray[i].original_title;
            let upprmovietext = movietext.toUpperCase();
            if (upprmovietext.includes(upprsearchtext) == true)
                newfilterarray.push(movieArray[i]);
        }
        return newfilterarray;
    }

    function IfpresentHandler(movie_id) {
        for (let i = 0; i < Favourite.length; i++) {
            if (Favourite[i].id == movie_id)
                return true;
        }
        return false;
    }

    function setFavouriteHandler(movie) {
        let newFavArray = [...Favourite];
        newFavArray.push(movie)
        setFavourite(newFavArray);
    }

    function deleteFavHandler(movie) {
        let newFavArray = [...Favourite];
        for (let i = 0; i < newFavArray.length; i++) {
            if (newFavArray[i].id == movie.id) {
                newFavArray.splice(i, 1);
                setFavourite(newFavArray);
                break;
            }
        }
    }



    return (
        <>
            <h1>MOVIE LIST</h1>
            <input type="Text" onChange={setText} value={value} ></input>
            {movies == "" ? <h2>Loading movies...</h2> :
                <div className='allmovieflex'>
                    {newMovieArray.map((moviesObj, idx) => {
                        return (
                            <div key={idx} className="allmoviecontent">
                                <h2>{moviesObj.original_title}</h2>
                                <img src={"https://image.tmdb.org/t/p/original" + moviesObj.poster_path} className="allmovieimg"></img>
                                {IfpresentHandler(moviesObj.id) ? <i class="fa-sharp fa-solid fa-heart" onClick={function () { deleteFavHandler(moviesObj) }}></i> :
                                    <i class="fa-regular fa-heart" onClick={function () { setFavouriteHandler(moviesObj) }} ></i>}
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default MovieList