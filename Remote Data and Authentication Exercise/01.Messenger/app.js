function attachEvents() {
    document.querySelector('#submit').addEventListener('click', onSubmit);
    document.querySelector('#refresh').addEventListener('click', onRefresh);
    let textArea = document.querySelector('#messages');

    function onSubmit() {
        fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: document.querySelector('input[name="author"]').value,
                content: document.querySelector('input[name="content"]').value
            })
        })
        .then(res=>res.json())
        .then(data=> {
            textArea.value += `${data.author}: ${data.content}\n`;
            clearFields();
        })     
    }

    function onRefresh() {
        fetch('http://localhost:3030/jsonstore/messenger')
            .then(response => response.json())
            .then(data => {
                textArea.value = '';
                clearFields();
                Object.values(data).forEach(x => {
                    textArea.value += `${x.author}: ${x.content}\n`;
                });
                textArea.value.trim();
            });
    }

    function clearFields(){
        document.querySelector('input[name="author"]').value = '';
        document.querySelector('input[name="content"]').value = '';
    }
}

attachEvents();