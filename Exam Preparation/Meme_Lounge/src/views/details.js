import {html} from '../../node_modules/lit-html/lit-html.js';

let detailsTemplate = (meme,onDelete) => html`
        <section id="meme-details">
            <h1>Meme Title: ${meme.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                     ${meme.description}
                    </p>
                    ${meme._ownerId == sessionStorage.getItem('userId') ? html`<a class="button warning" href=${`/edit/${meme._id}`}>Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>` : ''}    
                </div>
            </div>
        </section>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/memes/' + id);
    let result = await response.json();
    context.render(detailsTemplate(result,onDelete));
    
    async function onDelete(){
        let confirmed = confirm('Are you sure you want to delete this meme?');
        if (confirmed) {
            await fetch('http://localhost:3030/data/memes/' + id, {
                method:'delete',
                headers: {'X-Authorization': sessionStorage.getItem('authToken')}
            });
            context.page.redirect('/all-memes');
        }
    }
}