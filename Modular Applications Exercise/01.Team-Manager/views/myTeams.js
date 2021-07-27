import { html } from '../node_modules/lit-html/lit-html.js';

let singleTeamTemplate = (data) => html`
             <article class="layout">
                    <img src=${data.team.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${data.team.name}}</h2>
                        <p>${data.team.description}</p>
                        <span class="details">${data.team.members} Members</span>
                        <div><a href=${'/details/'+ data.team._id} class="action">See details</a></div>
                    </div>
                </article>`;

let teamsListTemplate = (data) => html`
            <section id="my-teams">
                <article class="pad-med">
                    <h1>My Teams</h1>
                </article>
                ${data.length == 0 ? html`
                <article class="layout narrow">
                    <div class="pad-med">
                        <p>You are not a member of any team yet.</p>
                        <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                            team.</p>
                    </div>
                    <div class=""><a href="/create" class="action cta">Create Team</a></div>
                </article>` : ''}
                ${data.map(singleTeamTemplate)}
            </section>`;

export async function myTeamsView(context){
    let userId = sessionStorage.getItem('userId');
    let response = await fetch(`http://localhost:3030/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,{
        headers:{'X-Authorization': sessionStorage.getItem('authToken')}
    });
    let result = await response.json();

    let membersResponse = await fetch('http://localhost:3030/data/members?where=status%3D%22member%22');
    let membersResult = await membersResponse.json();

    result.forEach(obj => {
        obj.team['members'] = 0;
        for(let i = 0; i< membersResult.length; i++){
            if (obj.teamId == membersResult[i].teamId) {
                obj.team['members'] += 1;
            }
        }
    });

    context.render(teamsListTemplate(result));
}