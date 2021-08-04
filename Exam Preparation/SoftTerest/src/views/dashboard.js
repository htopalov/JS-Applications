import {html} from '../../node_modules/lit-html/lit-html.js';

let ideaCardTemplate = (idea) =>html`
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src=${idea.img} alt="Card image cap">
        <a class="btn" href=${'/details/'+idea._id}>Details</a>
    </div>`;

let dashboardTemplate = (ideas) =>html`
<div id="dashboard-holder">
    ${ideas.length > 0 ? ideas.map(ideaCardTemplate) : html` <h1>No ideas yet! Be the first one :)</h1>`}
</div>`;


export async function dashboardView(context){
    let response = await fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    let result = await response.json();
    context.render(dashboardTemplate(result));
}