document.querySelector('#form').addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        return alert('All fields are required');
    }
    if (isNaN(grade)) {
        return alert('Grade must be a number')
    }
    if (isNaN(facultyNumber)) {
        return alert('Faculty Number contains only numbers')
    }
    fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName,lastName,facultyNumber,grade: Number(grade)})
    })
    fillTable();
    
    document.querySelector('input[name="firstName"]').value = '';
    document.querySelector('input[name="lastName"]').value = '';
    document.querySelector('input[name="facultyNumber"]').value = '';
    document.querySelector('input[name="grade"]').value = '';

}

function fillTable(){
    let table = document.querySelector('tbody');
    fetch('http://localhost:3030/jsonstore/collections/students')
    .then(res=>res.json())
    .then(data=> {
        Array.from(Object.values(data)).forEach(x=>{
            let row = document.createElement('tr');
            row.appendChild(tdCreator(x.firstName));
            row.appendChild(tdCreator(x.lastName));
            row.appendChild(tdCreator(x.facultyNumber));
            row.appendChild(tdCreator(x.grade));
            table.appendChild(row);
        })
    })
}

function tdCreator(data){
    let td = document.createElement('td');
    td.textContent = data;
    return td;
}