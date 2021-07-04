function loadRepos() {
	Array.from(document.querySelector('#repos').children).forEach(x=>x.remove());
	let userName = document.querySelector('#username').value;
	let url = `https://api.github.com/users/${userName}/repos`;
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		data.forEach(repo => {
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.href = repo.html_url;
			a.textContent = repo.full_name;
			li.appendChild(a);
			document.querySelector('#repos').appendChild(li);
		});
	})
	  .catch(error => console.error(error))
	
}