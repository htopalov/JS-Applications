document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients');
    let steps = formData.get('steps');
    onSubmit(name, img, ingredients, steps)
});


async function onSubmit(name, img, ingredients, steps) {
    let token = sessionStorage.getItem('userToken');
    if (token == null) {
        alert('Unauthorized');
        return window.location.pathname = 'index.html';
    }

    let response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify({
            name: name,
            img: img,
            ingredients: ingredients.split('\n').map(x=>x.trim()).filter(x=> x!= ''),
            steps: steps.split('\n').map(x=>x.trim()).filter(x=> x!= '')
            })
    });
    let error = await response.json();
    if (response.ok) {
        window.location.pathname = 'index.html';
    } else {
        return alert(error.message);    
    }
}