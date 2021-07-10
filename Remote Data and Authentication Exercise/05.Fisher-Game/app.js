let loadButton = document.querySelector('.load');
loadButton.addEventListener('click', loadCatches);
let catches = document.getElementById('catches');
catches.querySelectorAll('.catch').forEach(x => x.remove());
let addButton = document.querySelector('.add')
addButton.addEventListener('click', addCatch);
if (localStorage.getItem('token') === null) {
    addButton.disabled = true;
} else {
    addButton.disabled = false;
}

function loadCatches(){
    fetch('http://localhost:3030/data/catches')
    .then(res=>res.json())
    .then(data=>{
        catches.querySelectorAll('.catch').forEach(x => x.remove());
        catches.append(...data.map(x => catchComposer(x)));
    });
}

function addCatch(){
    let angler = document.querySelector('#addForm .angler');
    let weight = document.querySelector('#addForm .weight');
    let species = document.querySelector('#addForm .species');
    let location = document.querySelector('#addForm .location');
    let bait = document.querySelector('#addForm .bait');
    let captureTime = document.querySelector('#addForm .captureTime');

    fetch('http://localhost:3030/data/catches',{
        method: 'post',
        headers: {'Content-type': 'application/json', 'X-Authorization': localStorage.getItem('token')},
        body: JSON.stringify({
            angler: angler.value,
            weight: Number(weight.value),
            species: species.value,
            location: location.value,
            bait: bait.value,
            captureTime: Number(captureTime)
        })
    })
    .then(res=>res.json())
    .then(data=>{
        let catchElement = catchComposer(data);
        catches.appendChild(catchElement);
    });
}

function deleteCatch(e){
    let catch_ = e.target.parentElement;
    let id = catch_.dataset.id;
    fetch(`http://localhost:3030/data/catches/${id}`,{
        method: 'delete',
        headers: { 'X-Authorization': localStorage.getItem('token')}
    })
    .then(res=>res.json())
    .then(data=> {
        if (data.status == 200) {
            catch_.remove();
        }
    });
}

function updateCatch(e){
    let catch_ = e.target.parentElement;
    let id = catch_.dataset.id;
    let angler = catch_.querySelector('.angler').value;
    let weight = Number(catch_.querySelector('.weight').value);
    let species = catch_.querySelector('.species').value;
    let location = catch_.querySelector('.location').value;
    let bait = catch_.querySelector('.bait').value;
    let captureTime = Number(catch_.querySelector('.captureTime').value);
  
    fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'Put',
        headers: {'Content-Type': 'application/json', 'X-Authorization': localStorage.getItem('token')},
        body: JSON.stringify({
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        })
    });
}

function catchComposer(data) {
    let anglerLable = createElement('label', undefined, 'Angler');
    let anglerInput = createElement('input', {type: 'text', class:'angler'}, data.angler);
    let hr1 = createElement('hr');
    let weightLabel = createElement('label', undefined, 'Weight');
    let weightInput = createElement('input', {type:'number', class:'weight'}, data.weight);
    let hr2 = createElement('hr');
    let speciesLabel = createElement('label', undefined, 'Species');
    let speciesInput = createElement('input', {type:'text', class:'species'}, data.species);
    let hr3 = createElement('hr');
    let locationLabel = createElement('label', undefined, 'Location');
    let locationInput = createElement('input', {type:'text', class:'location'}, data.location);
    let hr4 = createElement('hr');
    let baitLabel = createElement('label', undefined, 'Bait');
    let baitInput = createElement('input', {type:'text', class:'bait'}, data.bait);
    let hr5 = createElement('hr');
    let captureTimeLabel = createElement('label', undefined, 'Capture Time');
    let captureTimeInput = createElement('input', {type:'number', class:'captureTime'}, data.captureTime);
    let hr6 = createElement('hr');
    let updateBtn = createElement('button', {disabled:true, class:'update'}, 'Update');
    updateBtn.addEventListener('click', updateCatch);
    updateBtn.disabled = localStorage.getItem('id') !== data._ownerId;
    let deleteBtn = createElement('button', {disabled:true, class:'delete'}, 'Delete');
    deleteBtn.addEventListener('click', deleteCatch);
    deleteBtn.disabled = localStorage.getItem('id') !== data._ownerId;

    let catchDiv = createElement('div', {class:'catch'},
    anglerLable, anglerInput, hr1, weightLabel, weightInput, hr2, speciesLabel, speciesInput,
    hr3, locationLabel, locationInput, hr4, baitLabel, baitInput, hr5, captureTimeLabel,
    captureTimeInput, hr6, updateBtn, deleteBtn);
    catchDiv.dataset.id = data._id;
    catchDiv.dataset.ownerId = data._ownerId;
    return catchDiv;
}


function createElement(tag, attributes, ...params) {
    let element = document.createElement(tag);
    let firstValue = params[0];
    if (params.length === 1 && typeof (firstValue) !== 'object') {
        if (['input', 'textarea'].includes(tag)) {
            element.value = firstValue;
        } else {
            element.textContent = firstValue;
        }
    } else {
        element.append(...params);
    }

    if (attributes !== undefined) {
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        })
    }

    return element;
}