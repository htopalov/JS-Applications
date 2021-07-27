import {html} from '../node_modules/lit-html/lit-html.js';

let teamTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${team.members} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`;


let browseTemplate = (teams, email) => html`
            <section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>
<article class="layout narrow">
    ${email ? html`<div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>` : '' }
</article>
${teams.map(teamTemplate)}
</section>`;


export async function browseView(context){
    let email = sessionStorage.getItem('email');
    let teamsResponse = await fetch('http://localhost:3030/data/teams');
    let teamsResult = await teamsResponse.json();

    let membersResponse = await fetch('http://localhost:3030/data/members?where=status%3D%22member%22');
    let membersResult = await membersResponse.json();

    teamsResult.forEach(team => {
        team['members'] = 0;
        for(let i = 0; i< membersResult.length; i++){
            if (team._id == membersResult[i].teamId) {
                team['members'] += 1;
            }
        }
    });

    context.render(browseTemplate(teamsResult,email));
}