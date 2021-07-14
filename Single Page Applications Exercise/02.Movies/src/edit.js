import { showDetails } from "./details.js";

async function getMovieById(id) {
    let response = await fetch(`http://localhost:3030/data/movies/${id}`);
    let movie = await response.json();
    return movie;
}

let main;
let section;
let movieId;

async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    };

    let response = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    });
    if (response.ok) {
        alert('Updated');
        showDetails(movieId);     
    } else {
        let error = await response.json();
        alert(error.message);
    }
}

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    let form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showEdit(id) {
    main.innerHTML = '';
    main.appendChild(section);
    movieId = id;
    let movie = await getMovieById(id);
    section.querySelector('input[name="title"]').value = movie.title;
    section.querySelector('textarea[name="description"]').value = movie.description;
    section.querySelector('input[name="imageUrl"]').value = movie.img;
}

