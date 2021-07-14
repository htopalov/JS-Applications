import { createRequest, htmlPostComposer } from "./createTopic.js";

let form = document.getElementById('formPost');
form.addEventListener('submit', createPostHandler);
document.querySelector('.cancel').addEventListener('click', clearFields);
window.onload = () => { topicsListing() };

function clearFields(e) {
    e.preventDefault();
    form.reset();
}

function createPostHandler(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let title = formData.get('topicName');
    let username = formData.get('username');
    let post = formData.get('postText');
    if (title == '' || username == '' || post == '') {
        return alert('Fields can\'t be empty');
    }
    createRequest(title, username, post);
    e.target.reset();
}

async function topicsListing() {
    try {
        let topicsRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        let topicsResult = await topicsRequest.json();
        Array.from(document.querySelector('.topic-container').children).forEach(x => x.remove());
        Object.values(topicsResult).forEach(topic => {
            htmlPostComposer(topic.title, topic.username, topic._id);
        });
    } catch (e) {
        return;
    }
}
