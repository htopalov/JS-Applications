import {html} from '../../node_modules/lit-html/lit-html.js';

let singleMemeTemplate = (meme) => html`
                <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
                    <a class="button" href=${`/details/${meme._id}`}>Details</a>
                </div>`;

let profileTemplate = (memes) => html`
  <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src=${sessionStorage.getItem('gender') == 'female' ? "/images/female.png" : "/images/male.png"}>
                <div class="user-content">
                    <p>Username: ${sessionStorage.getItem('username')}</p>
                    <p>Email: ${sessionStorage.getItem('email')}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${memes.length > 0 ? memes.map(singleMemeTemplate) : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>`;


export async function profileView(context){
    let userId = sessionStorage.getItem('userId');
    let response = await fetch(`http://localhost:3030/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    let result = await response.json();
    context.render(profileTemplate(result));
}