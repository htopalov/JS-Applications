import {formCreator} from "./commentForm.js";

async function display(e){
    let main = document.querySelector('.container main');
    let id = e.target.parentElement.id;
    let timeParam = e.target.parentElement.parentElement.children[1].children[0].children[0].children[0].textContent;
    Array.from(main.children).forEach(x=>x.remove());

    let requestPost = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
    let result = await requestPost.json();
    let post = result.post;
    let name = result.username;
    main.appendChild(createHtmlContent(post,name,timeParam,id));
    main.appendChild(formCreator());
}

function createHtmlContent(post,name,timeParam,id){
    let divComment = document.createElement('div');
    divComment.id = id;
    divComment.className = 'comment';
    let divHeader = document.createElement('div');
    divHeader.className = 'header';
    let img = document.createElement('img');
    img.src = './static/profile.png';
    img.alt = 'avatar';
    let pNameDate = document.createElement('p');
    let spanName = document.createElement('span');
    spanName.textContent = name + ' posted on ';
    let time = document.createElement('time');
    time.textContent = timeParam;
    pNameDate.appendChild(spanName);
    pNameDate.appendChild(time);
    let pPost = document.createElement('p');
    pPost.textContent = post;
    divHeader.appendChild(img);
    divHeader.appendChild(pNameDate);
    divHeader.appendChild(pPost);
    divComment.appendChild(divHeader);
    return divComment;
}

export{display}