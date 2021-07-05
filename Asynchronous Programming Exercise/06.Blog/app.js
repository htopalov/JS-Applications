function attachEvents() {
    document.querySelector('#btnLoadPosts').addEventListener('click', onLoadClick);
    document.querySelector('#btnViewPost').addEventListener('click', onViewClick);

    function onViewClick(){
        Array.from(document.querySelector('#post-comments').children).forEach(li => {
            li.remove();
        });
        
        let currentPostIdOption = document.querySelector('#posts').value;
        fetch(`http://localhost:3030/jsonstore/blog/posts/${currentPostIdOption}`)
        .then(res=> res.json())
        .then(data => {
            document.querySelector('#post-title').textContent = data.title;
            document.querySelector('#post-body').textContent = data.body;
        })

        fetch('http://localhost:3030/jsonstore/blog/comments')
        .then(res => res.json())
        .then(allComments => {
            let commentsValues = Object.values(allComments);
            for (const comment of commentsValues) {
                if (comment.postId == currentPostIdOption) {
                    let commentLiElement = document.createElement('li');
                    commentLiElement.textContent = comment.text;
                    commentLiElement.id = comment.id;
                    document.querySelector('#post-comments').appendChild(commentLiElement);
                }
            }
        })
    }

    function onLoadClick(){
        fetch('http://localhost:3030/jsonstore/blog/posts')
        .then(res=>res.json())
        .then(data => {
            for (const key in data) {
                createOption(key, data[key].title);
            }
        })
    }

    function createOption(key, title){
        let newOption = document.createElement('option');
        let optionText = document.createTextNode(title.toUpperCase());
        newOption.appendChild(optionText);
        newOption.setAttribute('value', key);
        document.querySelector('#posts').appendChild(newOption);
    }
}

attachEvents();