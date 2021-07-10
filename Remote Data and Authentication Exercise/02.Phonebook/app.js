function attachEvents() {
    document.querySelector('#btnCreate').addEventListener('click', onCreate);
    document.querySelector('#btnLoad').addEventListener('click', onLoad);
    let phonebook = document.querySelector('#phonebook');
    let person = document.querySelector('#person');
    let phone = document.querySelector('#phone');

    function onCreate() {
        let createdEntry = {
            person: document.querySelector('#person').value,
            phone: document.querySelector('#phone').value
        }
        fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createdEntry)
        })
            .then(() => {
                person.value = '';
                phone.value = '';
                Array.from(phonebook.children).forEach(x => x.remove());
                onLoad();
            })
    }

    function onLoad() {
        fetch('http://localhost:3030/jsonstore/phonebook')
            .then(res => res.json())
            .then(data => {
                Array.from(phonebook.children).forEach(x => x.remove());
                Object.values(data).forEach(x => {
                    let liElement = document.createElement('li');
                    liElement.textContent = `${x.person}: ${x.phone}`;
                    let delButton = document.createElement('button');
                    delButton.setAttribute('name', x._id);
                    delButton.textContent = 'Delete';
                    delButton.addEventListener('click', deleteHandler);
                    liElement.appendChild(delButton);
                    phonebook.appendChild(liElement);
                });
            })
    }

    function deleteHandler(e) {
        let id = e.target.name;
        fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            e.target.parentElement.remove();
        })
    }
}

attachEvents();