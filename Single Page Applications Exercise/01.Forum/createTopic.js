import {display} from "./comments.js";

async function createRequest(title, username, post) {
    let postRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            username,
            post
        })
    });

    let result = await postRequest.json();
    htmlPostComposer(result.title, result.username, result._id);
}

function htmlPostComposer(title, username, id) {
    let topicContainer = document.querySelector('.topic-container');
    let date = new Date();
    let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let divWrapper = document.createElement('div');
    divWrapper.className = 'topic-name-wrapper';
    let divTopicName = document.createElement('div');
    divTopicName.className = 'topic-name';
    let anchor = document.createElement('a');
    anchor.href = '#';
    anchor.className = 'normal';
    anchor.id = id;
    anchor.addEventListener('click', display);
    let h2 = document.createElement('h2');
    h2.textContent = title;
    let divColumns = document.createElement('div');
    divColumns.className = 'columns';
    let divDateUser = document.createElement('div');
    let pTime = document.createElement('p');
    let time = document.createElement('time');
    time.textContent = today;
    pTime.textContent = `Date: `;
    pTime.appendChild(time);
    let divUser = document.createElement('div');
    divUser.className = 'nick-name';
    let pName = document.createElement('p');
    pName.textContent = 'Username: ';
    let span = document.createElement('span');
    span.textContent = username;
    pName.appendChild(span);

    divUser.appendChild(pName);
    divDateUser.appendChild(pTime);
    divDateUser.appendChild(divUser);
    divColumns.appendChild(divDateUser);
    anchor.appendChild(h2);
    divTopicName.appendChild(anchor);
    divTopicName.appendChild(divColumns);
    divWrapper.appendChild(divTopicName);
    topicContainer.appendChild(divWrapper);
}

export { createRequest,htmlPostComposer}