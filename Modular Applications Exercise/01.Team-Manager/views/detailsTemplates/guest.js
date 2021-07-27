import {html} from '../../node_modules/lit-html/lit-html.js'

let liTemplate = (member) => html`
<li>${member.user.username}</li>`;


let guestTemplate = (team,members) => html`
 <section id="team-home">
                <article class="layout">
                    <img src=${team.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${members.length} Members</span>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            ${members.map(liTemplate)}
                        </ul>
                    </div>
                </article>
                </section>`;

export {guestTemplate};