window.addEventListener('load', () => {

    const data = {
        branches: {},
        //branchName : '',
        branchList: [],
        stops: {},
        stopName : '',
        lat : '',
        long : '',
        branchId : ''
    }

    function updateTable() {
        console.log("updated")
        axios.get('/stop')
            .then(resp => data.stops = resp.data)
            .catch(error => console.error(error.response.data))
        axios.get('/branch')
            .then(resp => data.branches = resp.data)
            .catch(error => console.error(error.response.data))
    }

    function deleteStop(id) {
        console.log("del")
        axios.delete('/stop/' + id)
            .then(resp => {
                data.stops = resp.data
                updateTable()
            })
            .catch(error => console.error(error.response.data))
    }

    function createStop(stopName, lat, long, branchList) {
        console.log("crear " + stopName + " " + lat + " " + long + " " + branchList)
        /*const stop = {
            name: stopName,
            latitude: lat,
            longitude: long,
            branch_id: branchList
        }*/
        axios.post('/stop', {
            name: stopName,
            latitude: lat,
            longitude: long,
            branch_id: branchList
        })
            .then(resp => {
                data.stops = resp.data
                updateTable()
            })
            .catch(error => console.error(error.response.data))
    }

    function editStop(id, stopName, lat, long, branchList){
        console.log("editar " + id + " " + stopName + " " + lat + " " + long + " " + branchList)
        axios.put('/stop/' + id, {
            name: stopName,
            latitude: lat,
            longitude: long,
            branch_id: branchList
        })
            .then(resp => {
                data.stops = resp.data
                updateTable()
            })
            .catch(error => console.error(error.response.data))
    }

    const app = new Vue({
        data: data,
        el: '#appStop',
        methods: { deleteStop, createStop, editStop }
    })

    updateTable()
})
/*
function initMap() {
    // The location of Uluru
    var parada = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: parada });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: parada, map: map });
}
*/