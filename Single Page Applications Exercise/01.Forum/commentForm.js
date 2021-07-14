async function request(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let username = formData.get('username');
    let comment = formData.get('postText');
    let id = e.target.closest('div').parentElement.parentElement.children[0].id;
    let date = new Date();
    let creationDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (username == '') {
        return alert('You must provide username');
    }
    let topicRequest = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
    let topicResult = await topicRequest.json();
    let topicName = topicResult.title;

    let commentRequest = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments/${id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            comment,
            username,
            creationDate,
            topicName
        })
    });
    e.target.reset();
    let commentResult = await commentRequest.json();
    let newNode = commentBodyCreator(commentResult.username, commentResult.creationDate, commentResult.comment);
    let referenceNode = document.querySelector('.answer-comment');
    let parentNode = document.querySelector('main');
    parentNode.insertBefore(newNode, referenceNode);
}

async function listComments(postId) {
    try {
        let commentsListRequest = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments/${postId}`);
        let commentsListResult = await commentsListRequest.json();
        Object.values(commentsListResult).forEach(c => {
            let newNode = commentBodyCreator(c.username, c.creationDate, c.comment);
            let referenceNode = document.querySelector('.answer-comment');
            let parentNode = document.querySelector('main');
            parentNode.insertBefore(newNode, referenceNode);
        });
    } catch (e) {
        return;
    }
}


function formCreator() {
    let id = document.querySelector('.comment').id;
    listComments(id);
    let divAnswerComment = document.createElement('div');
    divAnswerComment.className = 'answer-comment';
    let divAnswer = document.createElement('div');
    divAnswer.className = 'answer';
    let answerForm = document.createElement('form');
    answerForm.addEventListener('submit', request);
    let postTextInput = document.createElement('textarea');
    postTextInput.name = 'postText';
    postTextInput.id = 'comment';
    postTextInput.cols = 30;
    postTextInput.rows = 10;
    answerForm.appendChild(postTextInput);
    let divContainer = document.createElement('div');
    let labelUser = document.createElement('label');
    labelUser.setAttribute('for', 'username');
    labelUser.textContent = 'Username ';
    let span = document.createElement('span');
    span.className = 'red';
    span.textContent = '*';
    labelUser.appendChild(span);
    let usernameInput = document.createElement('input');
    usernameInput.name = 'username';
    usernameInput.id = 'username';
    usernameInput.type = 'text';
    divContainer.appendChild(labelUser);
    divContainer.appendChild(usernameInput);
    answerForm.appendChild(divContainer);
    let postButton = document.createElement('button');
    postButton.textContent = 'Post';
    answerForm.appendChild(postButton);
    let spanCurrent = document.createElement('span');
    spanCurrent.textContent = 'currentUser';
    let pCurrent = document.createElement('p');
    pCurrent.appendChild(spanCurrent);
    let spanComment = document.createElement('span');
    spanComment.textContent = ' comment:';
    pCurrent.appendChild(spanComment);
    divAnswer.appendChild(answerForm)
    divAnswerComment.appendChild(pCurrent);
    divAnswerComment.appendChild(divAnswer);
    return divAnswerComment;
}

function commentBodyCreator(user, time, content) {
    let divComment = document.createElement('div');
    divComment.className = 'user-comment';
    let divTopicNameWrapper = document.createElement('div');
    divTopicNameWrapper.className = 'topic-name-wrapper';
    let divTopicName = document.createElement('div');
    divTopicName.className = 'topic-name';
    let pNameDate = document.createElement('p');
    pNameDate.innerHTML = `<p><strong>${user}</strong> commented on <time>${time}</time></p>`;
    let divContent = document.createElement('div');
    divContent.className = 'post-content';
    let pContent = document.createElement('p');
    pContent.textContent = content;
    divContent.appendChild(pContent);
    divTopicName.appendChild(pNameDate);
    divTopicName.appendChild(divContent);
    divTopicNameWrapper.appendChild(divTopicName);
    divComment.appendChild(divTopicNameWrapper);
    return divComment;
}

export { formCreator }