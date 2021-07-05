function solution() {
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(articles => {
            articles.forEach(obj => {
                buildArticle(obj._id, obj.title);
            });
        })

        function buildArticle(id,title){
            let accordionDiv = document.createElement('div');
            accordionDiv.className = 'accordion';
            let headDiv = document.createElement('div');
            headDiv.className = 'head';
            let spanTitle = document.createElement('span');
            spanTitle.textContent = title;
            let button = document.createElement('button');
            button.className = 'button';
            button.id = id;
            button.textContent = 'More';
            button.addEventListener('click', onClick);
            headDiv.appendChild(spanTitle);
            headDiv.appendChild(button);
            accordionDiv.appendChild(headDiv);
            let extraDiv = document.createElement('div');
            extraDiv.className = 'extra';
            extraDiv.style.display = 'none';
            accordionDiv.appendChild(extraDiv);
            document.querySelector('#main').appendChild(accordionDiv);
        }

        function onClick(e){
            if (e.target.textContent == 'More') {
                e.target.textContent = 'Less';
                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`)
                .then(res=> res.json())
                .then(data => {
                    let p = document.createElement('p');
                    p.textContent = data.content;
                    e.target.parentElement.parentElement.children[1].style.display = 'block';
                    e.target.parentElement.parentElement.children[1].appendChild(p);

                })
            } else {
                e.target.textContent = 'More';
                e.target.parentElement.parentElement.children[1].style.display = 'none';
                e.target.parentElement.parentElement.children[1].children[0].remove();
            }
        }
}

document.addEventListener('DOMContentLoaded', solution);