import {guestTemplate} from './detailsTemplates/guest.js';
import { ownerTemplate } from './detailsTemplates/owner.js';


export async function detailsView(context){
    let userId = sessionStorage.getItem('userId');
    let teamId = context.params.id;
    let response = await fetch('http://localhost:3030/data/teams/' + teamId);
    let result = await response.json(); //teamData
    let ownerId = result._ownerId;

    let membersResponse = await fetch(`http://localhost:3030/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
    let membersResult = await membersResponse.json();//membersData
    console.log(result);
    console.log(membersResult);
    if (userId == null) {
        context.render(guestTemplate(result,membersResult));
    }
    if (userId == ownerId) {
        context.render(ownerTemplate(result,membersResult,ownerId));
    } else if (userId != null) {
        //render logged in user
    }

    if (userId != null && userId != ownerId) {
        //render logged in user
    }
}

//not quite working logic for users....owner and guest are ok, but when it comes to logged in user things get ugly
//we have logged user which can be a member of a team, pending form membership, or just logged in without being member or pending for that
//so logic becomes confusing thats why I'm stoping here...gave to much time on this problem and this is my second approach to solve it
//using different templates for different users because if we use only one logic becomes quite nested and conditional.....
