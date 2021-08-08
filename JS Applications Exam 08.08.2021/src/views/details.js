import {html, nothing} from '../../node_modules/lit-html/lit-html.js';

let detailsTemplate = (book,likesCount,onDelete,addLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${sessionStorage.getItem('userId') == book._ownerId
              ? html`
               <a class="button" href=${'/edit/' + book._id}>Edit</a>
               <a @click=${onDelete} id="deleteBtn" class="button" href="javascript:void(0)">Delete</a>`
              : nothing }

            ${sessionStorage.getItem('userId') != book._ownerId && sessionStorage.getItem('userId') != null
               ? html`<a @click=${addLike} id="likeBtn" class="button" href="javascript:void(0)">Like</a>`
               : nothing}

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likesCount}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsView(context){
    let bookId = context.params.id;
    // let userId = sessionStorage.getItem('userId');
    // let isLiked = false;

    // let likedResponse = await fetch(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    // let likedResult = await likedResponse.json();
    // if (likedResult == 1) {
    //     isLiked = true;
    // }

    //implementing check for already liked book from same user causes test failure with 'show catalog' test,
    //although is working, but since its optional functionality I prefer to have working mandatory tests rather bonus ones...
    //couldn't find the reason for the test fail...

    let bookResponse = await fetch('http://localhost:3030/data/books/' + bookId);
    let bookResult = await bookResponse.json();

    let likesResponse = await fetch(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
    let likesResult = await likesResponse.json();
    context.render(detailsTemplate(bookResult,likesResult,onDelete, addLike));

    async function onDelete(){
        let confirmed = confirm('Are you sure you want to delet this book?');
        if (confirmed) {
            let response = await fetch('http://localhost:3030/data/books/' + bookId, {
                method: 'delete',
                headers: {'X-Authorization': sessionStorage.getItem('authToken')}
            });
            if (response.ok) {
                context.page.redirect('/');
            }
        }
    }

    async function addLike(e){
       let response = await fetch('http://localhost:3030/data/likes', {
           method: 'post',
           headers: {
               'Content-Type': 'application/json',
               'X-Authorization': sessionStorage.getItem('authToken')
           },
           body: JSON.stringify({bookId})
       });
       if (response.ok) {
           e.target.remove();
       }
    }
}