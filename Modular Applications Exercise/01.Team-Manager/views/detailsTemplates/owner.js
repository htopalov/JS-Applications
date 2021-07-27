import {html} from '../../node_modules/lit-html/lit-html.js';

let membersLiTemplate = (member) => html`
<li>${member.user.username}<a href="#" class="tm-control action">Remove from team</a></li>`;


let membersWithButtonsLiTemplate = (member) => html`
<li>${member.user.username}<a href="#" class="tm-control action">Approve</a><a href="#" class="tm-control action">Decline</a></li>`;

let ownerTemplate = (team,members,ownerId) => html`
            <section id="team-home">
                <article class="layout">
                    <img src=${team.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${members.length} Members</span>
                        <div>
                            <a href=${`/edit/${team._id}`} class="action">Edit team</a>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                        ${members.filter(member=> member._id != ownerId).map(membersLiTemplate)}
                        </ul>
                    </div>
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            ${members.filter(member => member.status != 'pending').map(membersWithButtonsLiTemplate)}
                        </ul>
                    </div>
                </article>
            </section>`;

export {ownerTemplate};