function loadCommits() {
    let userName = document.querySelector('#username').value;
    let repo = document.querySelector('#repo').value;
    let url = `https://api.github.com/repos/${userName}/${repo}/commits`;
    fetch(url)
        .then(response => response.json())
        .then(commits => {
            commits.forEach(commit => {
                let li = document.createElement('li');
                li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
                document.querySelector('#commits').appendChild(li);
            });
        })
        .catch(err =>{
            let li = document.createElement('li');
            li.textContent = err.message;
            document.querySelector('#commits').appendChild(li);
        });
}