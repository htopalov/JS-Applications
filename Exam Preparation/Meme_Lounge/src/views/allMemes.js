import { html } from '../../node_modules/lit-html/lit-html.js';

let memeCardTemplate = (meme) => html`
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">${meme.title}</p>
                        <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
                    </div>
                    <div id="data-buttons">
                        <a class="button" href=${`/details/${meme._id}`}>Details </a> </div> </div> </div>`;

let allMemesTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length > 0 ? memes.map(memeCardTemplate) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

export async function allMemesView(context) {
    let response = await fetch('http://localhost:3030/data/memes?sortBy=_createdOn%20desc');
    let result = await response.json();
    context.render(allMemesTemplate(result));
}