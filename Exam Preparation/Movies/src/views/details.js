import {html, nothing} from '../../node_modules/lit-html/lit-html.js';

let detailsTemplate = (movie, likes,onDelete,onLike) => html`
<section id="movie-example">
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src=${movie.img}
                 alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${sessionStorage.getItem('userId') == movie._ownerId 
            ? html`<a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
            <a class="btn btn-warning" href=${'/edit/'+ movie._id}>Edit</a>
            <span class="enrolled-span">Liked ${likes}</span>` 
            : nothing}
            ${sessionStorage.getItem('userId') != movie._ownerId && sessionStorage.getItem('userId') != null
            ? html`<span class="enrolled-span">Liked ${likes}</span>
                   <a @click=${onLike} class="btn btn-primary" href="javascript:void(0)">Like</a>`
            : nothing}
            ${sessionStorage.getItem('userId') == null 
            ? html`<span class="enrolled-span">Liked ${likes}</span>` 
            : nothing}
   
        </div>
    </div>
</div>
</section>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch(`http://localhost:3030/data/movies/${id}`);
    let result = await response.json();
    let responseLikes = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    let likes = await responseLikes.json();
    context.render(detailsTemplate(result, likes, onDelete,onLike));

    async function onDelete(){
        try{
            let response = await fetch('http://localhost:3030/data/movies/' + id,{
                method: 'delete',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });
            if (!response.ok) {
                let error = await response.json();
                throw new Error(error.message);
            } else {
                context.page.redirect('/');
            }
        } catch (err){
            return alert(err.message);
        }
    }

    async function onLike(e){
        //like functionality not implemented because of lack of information about likes endpoints of server
        //it is not clear what is the content of the body of post request...
        //all other logic for likes is simple




        // let userId = sessionStorage.getItem('userId');
        // let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`);
        // let result = await response.json();
        // if (result.length == 0) {
        //     let response = await fetch('http://localhost:3030/data/likes/'+id, {
        //         method: 'post',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'X-Authorization': sessionStorage.getItem('authToken')
        //         },
        //         body: JSON.stringify({ movieId: movie._id }) //????????
        //     });
        // } else {
        //     e.target.disabled == true;
        // }

    }
}