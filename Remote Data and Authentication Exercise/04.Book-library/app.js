document.querySelector('#loadBooks').addEventListener('click', loadAllBooks);
document.querySelector('form').addEventListener('submit', chooseAction);
let bookTable = document.querySelector('tbody');

async function chooseAction(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let title = formData.get('title');
    let author = formData.get('author');
    let editId = e.target.dataset.idToEdit; //pass id to editbook    

    if (e.target.getAttribute('id') == 'editMode') {
        editBook(author, title, editId);
    } else {
        createBook(author,title);
    }
    e.target.reset();
}

async function createBook(author, title) {
    let bookBody = {
        author,
        title
    };
    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookBody)
    });
    loadAllBooks();


}

async function editBook(author, title, id) {
    let bookBody = {
        author,
        title
    };
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookBody)
    });

    document.querySelector('form').setAttribute('id', 'createMode');
    document.querySelector('form').dataset.idToEdit = '';
    document.querySelector('form h3').textContent = 'FORM';
    document.querySelector('form button').textContent = 'Submit';
    loadAllBooks();
}

function editForm(e) {
    let titleToEdit = e.target.closest('tr').children[0].textContent;
    let authorToEdit = e.target.closest('tr').children[1].textContent;
    let bookIdToEdit = e.target.closest('tr').id;
    document.querySelector('form').setAttribute('id', 'editMode');
    document.querySelector('form').dataset.idToEdit = bookIdToEdit;
    document.querySelector('form h3').textContent = 'Edit FORM';
    document.querySelector('form button').textContent = 'Save';
    document.querySelector('input[name="title"]').value = titleToEdit;
    document.querySelector('input[name="author"]').value = authorToEdit;
}

async function loadAllBooks() {
    Array.from(bookTable.children).forEach(tr => tr.remove());
    let booksRequest = await fetch('http://localhost:3030/jsonstore/collections/books');
    let books = await booksRequest.json();
    tableBookEntryComposer(books);
}

function tableBookEntryComposer(books) {
    Object.entries(books).forEach(book => {
        let bookId = book[0];
        let title = book[1].title;
        let author = book[1].author;
        let bookEntry = document.createElement('tr');
        bookEntry.setAttribute('id', bookId);
        bookEntry.appendChild(tdComposer(title));
        bookEntry.appendChild(tdComposer(author));
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteEntry);
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', editForm);
        let buttonTd = tdComposer();
        buttonTd.appendChild(editButton);
        buttonTd.appendChild(deleteButton);
        bookEntry.appendChild(buttonTd);
        bookTable.appendChild(bookEntry);
    });


}

async function deleteEntry(e) {
    let id = e.target.closest('tr').id;
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete'
    });
    loadAllBooks();
}

function tdComposer(content) {
    let td = document.createElement('td');
    if (content === undefined) {
        return td;
    } else {
        td.textContent = content;
        return td;
    }
}