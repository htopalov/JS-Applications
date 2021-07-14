import { e } from './dom.js';
import { showHome } from './home.js';
import {showEdit} from './edit.js';

async function onEdit(event, id){
    event.preventDefault();
    showEdit(id);
}

async function getLikesByMovieId(id){
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    let data = await response.json();
    return data;
}

async function getOwnLikes(id){
    let userId = sessionStorage.getItem('userId');
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`);
    let data = await response.json();
    return data;
}


async function getMovieById(id) {
    let response = await fetch(`http://localhost:3030/data/movies/${id}`);
    let data = await response.json();
    return data;
}

async function onDelete(event,id){
    event.preventDefault();
    let response = await fetch(`http://localhost:3030/data/movies/${id}`,{
        method: 'delete',
        headers: {'X-Authorization': sessionStorage.getItem('authToken')}
    });
    if (response.ok) {
        alert('Deleted');
        showHome();
    } else {
        let error = await response.json();
        alert(error.message);
    }
}

function createMovieCard(movie, likes, ownLike) {
    let controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, 'Movie Description'),
        e('p', {}, movie.description)
    );

    let userId = sessionStorage.getItem('userId');

    if (userId !== null) {
        if (userId == movie._ownerId) {
            controls.appendChild(e('a', { className: 'btn btn-danger', href: '#', onClick: (e)=> onDelete(e, movie._id) }, 'Delete'));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: '#', onClick: (e)=> onEdit(e,movie._id) }, 'Edit'));
        } else if(ownLike.length == 0){
            controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: likeMovie }, 'Like'));
        }
    }
    let likesSpan = e('span', { className: 'enrolled-span' }, likes + ' like' +  (likes == 1 ? '' : 's'));
    controls.appendChild(likesSpan);


    let element = document.createElement('div');
    element.className = 'container';
    element.appendChild(e('div', { className: 'row bg-light text-dark' },
        e('h1', {}, `Movie title: ${movie.title}`),
        e('div', { className: 'col-md-8' }, e('img', { className: 'img-thumbnail', src: movie.img })),
        controls
    ));

    return element;

    async function likeMovie(event) {
        let response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ movieId: movie._id })
        });
        if (response.ok) {
            event.target.remove();
            likes++;
            likesSpan.textContent = likes + ' like' +  (likes == 1 ? '' : 's');
        }
    }
}



let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetails(id) {
    section.innerHTML = '';
    main.innerHTML = '';
    main.appendChild(section);
    let [movie,likes, ownLike]= await Promise.all([getMovieById(id),getLikesByMovieId(id),getOwnLikes(id)]); 
    let card = createMovieCard(movie, likes, ownLike);
    section.appendChild(card);
}