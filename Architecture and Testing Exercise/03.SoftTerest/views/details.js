import { getIdeaById ,deleteIdeaById} from "../src/api/data.js";
import {e} from '../src/dom.js';


function createIdeaCard(idea, isOwner, goTo){
    const result = document.createDocumentFragment();
    result.appendChild(e('img', {className: 'det-img', src: idea.img}));
    result.appendChild(e('div', {className: 'desc'},
    e('h2', {className: 'display-5'}, idea.title),
    e('p', {className: 'infoType'}, 'Description:'),
    e('p', {className: 'idea-description'}, idea.description),
    ));
    if (isOwner) {
        result.appendChild(e('div', {className: 'text-center'},
        e('a', {className: 'btn detb', href: '', onClick: onDelete}, 'Delete')
        ));  
    }

    async function onDelete(e){
        e.preventDefault();
        await deleteIdeaById(idea._id);
        goTo('dashboard');
    }

    return result;
}



export function setupDetails(section,navigation){
    return showDetails;

    async function showDetails(id){
        section.innerHTML = '';
        const idea = await getIdeaById(id);
        const userId = sessionStorage.getItem('userId');
        const card = createIdeaCard(idea,userId == idea._ownerId, navigation.goTo);
        section.appendChild(card);
        return section;
    }
}