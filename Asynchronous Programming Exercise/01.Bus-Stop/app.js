function getInfo() {
    let stopId = document.querySelector('#stopId').value;
    Array.from(document.querySelector('#buses').children).forEach(x=>x.remove());
    document.querySelector('#stopName').textContent = '';
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    .then(response => response.json())
    .then(busStopData => {
        document.querySelector('#stopName').textContent = busStopData.name;
        Object.entries(busStopData.buses).forEach(x=> {
        document.querySelector('#buses').appendChild(createLi(x[0],x[1]));
        });
    })
    .catch(()=> {
        document.querySelector('#stopName').textContent = 'Error';
    });

    function createLi(busId,time){
        let liElement = document.createElement('li');
        liElement.textContent = `Bus ${busId} arrives in ${time}`;
        return liElement;
    }
}