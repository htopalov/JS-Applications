import {html} from '../node_modules/lit-html/lit-html.js';

let teamMembersListTemplate = (member) => html`
 <li>${member.name}<a href="javascript:void(0)" class="tm-control action">Remove from team</a></li>`;

let detailsTemplate = (data,teamMembers,id,userId,ownerId,teamMembersListTemplate) => html`
            <section id="team-home">
                <article class="layout">
                    <img src=${data.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <span class="details">${teamMembers.length} Members</span>
                        ${userId != null && userId == ownerId ? html`
                        <div>
                            <a href=${'/edit/'+ id} class="action">Edit team</a>
                        </div>` :
                        html`
                        <div>
                        <a href="#" class="action">Join team</a>
                        <a href="#" class="action invert">Leave team</a>
                        Membership pending. <a href="#">Cancel request</a>
                        </div>`}
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            ${teamMembers.map(teamMembersListTemplate)}
                            <li>My Username</li>
                            <li>James ${userId != null && userId == ownerId ? html`<a href="#" class="tm-control action">Remove from team</a>` : ''}</li>
                            <!-- this will be another template for listing users and logic should be put there??? -->
                        </ul>
                    </div>
                    ${userId != null ? html`
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            <!-- this will be another template for listing users with buttons only if user is creator???check again?? -->
                            <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                        </ul>
                    </div>` : ''}
                </article>
            </section>`;

export async function detailsView(context){
    let userId = sessionStorage.getItem('userId');
    let id = context.params.id;
    let response = await fetch('http://localhost:3030/data/teams/' + id);
    let result = await response.json();
    let ownerId = result._ownerId;
    console.log(result);

    let membersResponse = await fetch('http://localhost:3030/data/members?where=status%3D%22member%22');
    let membersResult = await membersResponse.json();
    let teamMembers = membersResult.filter(x=> x.teamId == id);
    context.render(detailsTemplate(result,teamMembers,id,userId,ownerId,teamMembersListTemplate));
    //when rendering have to check if user is logged in(done), if user is logged in and is creator(modify buttons should appear)
    //and if it is just log user which is not creator and just wants to join or leave team
}

//I'm leaving this problem with everything solved except details view implemented at about 40-40%.
//In order to solve the problems with this view I have to either nest many functions or templates in order to work
//because of too many conditions about users.I'm not sure but there might be something wrong with the task itself.
//It won't be the first time. So I'm not going to waste any more time....