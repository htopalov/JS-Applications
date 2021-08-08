import {html} from '../../node_modules/lit-html/lit-html.js';

let singleBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href=${'/details/' + book._id}>Details</a>
</li>`;

let myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0 
        ? html`<ul class="my-books-list">
        ${books.map(singleBookTemplate)}
             </ul>` 
        : html`<p class="no-books">No books in database!</p>`}
</section>`;

export async function myBooksView(context){
    let userId = sessionStorage.getItem('userId');
    let response = await fetch(`http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    let result = await response.json();
    context.render(myBooksTemplate(result));
}