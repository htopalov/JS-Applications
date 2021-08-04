import {html, nothing} from '../../node_modules/lit-html/lit-html.js';


let detailsTemplate = (idea,onDelete) => html`
<div class="container home some">
    <!-- Note that second test will not pass when using substring method on image url.
    Method is used because of mistake in image url in backend api.
    In order to pass the test remove the method -->
    <img class="det-img" src=${(idea.img).substring(1)} /> 
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    ${sessionStorage.getItem('userId') == idea._ownerId && sessionStorage.getItem('userId') != null
        ? html`
        <div class="text-center">
          <a @click=${onDelete} class="btn detb" href="javascript:void(0)">Delete</a>
        </div>`
        : nothing }
</div>`;

export async function detailsView(context){
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/ideas/' + id);
    let result = await response.json();
    context.render(detailsTemplate(result,onDelete));

    async function onDelete(){
        let response = await fetch('http://localhost:3030/data/ideas/' + id, {
            method: 'delete',
            headers: {'X-Authorization': sessionStorage.getItem('authToken')}
        });
        if (response.ok) {
            context.page.redirect('/dashboard');
        }
    }
}