const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to Fetch moviedetail using OMDB API

const  getMovieInfo = async(movie) =>{
try{
const myApikey = "af743ad7";
const url =`https://www.omdbapi.com/?apikey=${myApikey}&t=${movie}`;

const response = await fetch(url); // fetch return karta hai promise object ko or usse store kiya hai response me

if (!response.ok){
    throw new Error("Unable to fetch movie data.")
}


const data = await response.json();

showMovieData(data);
} 
catch(error){
showErrorMessage("No movie found !!!")

}

}

// function to show movie data on screen

const showMovieData = (data)=>{

    movieContainer.innerHTML=" ";
    movieContainer.classList.remove('noBackground');


//  use destructURING Assignment To extract properties fro data object 

const {Title , imdbRating , Genre , Released , Runtime , Actors ,Plot,  Poster} =data;

const movieElement = document.createElement('div');
movieElement.classList.add('movie-info');
movieElement.innerHTML  =`<h2>${Title}</h2>
<p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;


const movieGenreElement = document.createElement('div');
movieGenreElement.classList.add('movie-genre');

Genre.split(",").forEach(element =>{
const p = document.createElement('p');
p.innerText = element;
movieGenreElement.appendChild(p);
});

movieElement.appendChild(movieGenreElement);

movieElement.innerHTML  +=`<p><strong>Released Date:</strong>${Released}</p> <p><strong>Duration:</strong>${Runtime}</p><p><strong>Caste :</strong>${Actors}</p><p><strong>Plot :</strong>${Plot}</p>`;

//creating  a Poster 
const moviePosterElement = document.createElement('div');
moviePosterElement.classList.add('movie-poster');
moviePosterElement.innerHTML = `<img src="${Poster}" alt="Movie Poster">`;
movieContainer.appendChild(moviePosterElement);



movieContainer.appendChild(movieElement);
}
// function to display error message

const showErrorMessage = (message)=>{
    movieContainer.innerHTML= `<h2> ${message} </h2>`;
    movieContainer.classList.add('noBackground');
}


// function to handle form submission

const handleFormSubmission = (e)=>{
    console.log(inputBox.value)
    e.preventDefault(); //auto submit hone se rokega form console par dikhega
    
    const movieName = inputBox.value.trim();
    if(movieName !== ""){
        showErrorMessage("Fetching Movie Information....")
        getMovieInfo(movieName);
    }
    else {
       showErrorMessage("Frist enter the movie name to Get the movie information ");
    }

}
// Adding event Listner to search fORM


searchForm.addEventListener('submit',handleFormSubmission,);
