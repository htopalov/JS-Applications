function solve() {
    let spanInfo = document.querySelector('#info');
    let departButton = document.querySelector('#depart');
    let arriveButton = document.querySelector('#arrive');
    let nextId = 'depot';
    let nextStop = '';

    function requestData(){
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextId}`)
        .then(res => res.json())
        .then(data => {
            nextId = data.next;
            nextStop = data.name;
            spanInfo.textContent = `Next stop ${nextStop}`;
        })
        .catch(() => {
            departButton.disabled = true;
            arriveButton.disabled = true;
            spanInfo.textContent = 'Error';
        })
    }

    function depart() {
        requestData();
        departButton.disabled = true;
        arriveButton.disabled = false;
        spanInfo.textContent = `Next stop ${nextStop}`;
        
    }

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;
        spanInfo.textContent = `Arriving at ${nextStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();