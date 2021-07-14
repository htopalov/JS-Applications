//original part in order to change views-connected with steps in app.js
// let main;
// let section;

// export function setupHome(mainTarget,sectionTarget){
//     main = mainTarget;
//     section = sectionTarget;
// }

// export async function showHome(){
//     main.innerHTML = '';
//     main.appendChild(section);
// }


//2

import {showDetails} from './details.js';

async function getMovies(){
    let response = await fetch('http://localhost:3030/data/movies');
    let data = await response.json();
    if (!response.ok) {
        return alert('Error');
    }
    return data;
}


//3
function createMoviePreview(movie){
    let element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <button id="${movie._id}" type="button" class="btn btn-info movieDetailsLink">Details</button>
    </div>`;

    return element;
}


let main;
let section;
let container;

export function setupHome(mainTarget,sectionTarget){
    main = mainTarget;
    section = sectionTarget;
    container = section.querySelector('.card-deck.d-flex.justify-content-center');

    container.addEventListener('click', event => {
        if (event.target.classList.contains('movieDetailsLink')) {
            showDetails(event.target.id);
        }
    });
}

export async function showHome(){
    main.innerHTML = '';
    main.appendChild(section);

    let movies = await getMovies();
    let cards = movies.map(createMoviePreview);
    let fragment = document.createDocumentFragment();
    cards.forEach(c=> fragment.appendChild(c));
    container.innerHTML = '';
    container.appendChild(fragment);
}
