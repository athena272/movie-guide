import { key } from './key.js'

const inputSearch = document.querySelector("#movie-name")
const searchBtn = document.querySelector("#search-btn")
const result = document.querySelector("#result")
const searchContainer = document.querySelector(".search-container")


const getMovie = () => {
    const movieName = inputSearch.value
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`

    // case input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg>Please enter a movie name</h3>`
    } else {
        fetch(url).then((response) => response.json()).then((data) => {
            if (data.Response === "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster"/>
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <div>
                                <img src="img/star-filled-48.png" alt="">
                                <img src="img/star-filled-48.png" alt="">
                                <img src="img/star-filled-48.png" alt="">
                                <img src="img/star-filled-48.png" alt="">
                                </div>
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>  
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <div class="datasheet">
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    </div>
                `
            }
            // case the movie doesn't exist in the database
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
            }
        })
            // Case a error occurred
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`
            })
    }
}

searchBtn.addEventListener("click", getMovie)

window.addEventListener("load", getMovie)
window.addEventListener("keypress", (ev) => {
    // If the user presses the "Enter" key on the keyboard
    if (ev.key === "Enter") {
        // Cancel the default action, if needed
        ev.preventDefault();
        // Trigger the button element with a click
        getMovie()
    }
})



