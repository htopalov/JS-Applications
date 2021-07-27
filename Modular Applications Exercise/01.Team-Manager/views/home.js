import {html} from '../node_modules/lit-html/lit-html.js';

let homeTemplate = () => html`
            <section id="home">
                <article class="hero layout">
                    <img src="./assets/team.png" class="left-col pad-med">
                    <div class="pad-med tm-hero-col">
                        <h2>Welcome to Team Manager!</h2>
                        <p>Want to organize your peers? Create and manage a team for free.</p>
                        <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                        <a id="browse-guest" href="/register" class="action cta">Sign Up Now</a>
                        <a id="browse-user" href="/browse" class="action cta">Browse Teams</a>
                    </div>
                </article>
            </section>`;


export async function homeView(context){
    let userId = sessionStorage.getItem('userId');
    context.render(homeTemplate());
    if (userId != null) {
        document.getElementById('browse-guest').style.display = 'none';
    } else {
        document.getElementById('browse-user').style.display = 'none';
    }
}