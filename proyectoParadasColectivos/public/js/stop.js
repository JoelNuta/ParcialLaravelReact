function initStopApp(){

    const data = {
        branch : {},
        //branches : {},
        //stops: {},
        stopToCreate : {
            name :"",
            latitude : 0,
            longitude : 0
        }
    }

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var bsas = {lat: -34.6037, lng: -58.3816};


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: bsas
    })
    directionsDisplay.setMap(map);

    map.addListener("click", (e) => {
        const latLng = e.latLng
        data.stopToCreate.latitude = latLng.lat()
        data.stopToCreate.longitude = latLng.lng()
    })

    let markers = []

    function updateMarkers (stops){

        markers.forEach(m=> m.setMap(null))
        markers = []

        const points = stops.map( s => ({lat:s.latitude,lng:s.longitude, id : s.id, title: s.name}))

        points.forEach( p => {    
            const marker = new google.maps.Marker({
                position: p,
                map: map,
                draggable: true,
                label: "" + p.id,
                title: "" + p.title
            })
            marker.addListener("dragend",()=> {
                axios.put(`/stop/${p.id}`,{latitude: marker.position.lat() , longitude: marker.position.lng()})
                    .then( r => updatePage() )
                    .catch(error => console.error(error.response ? error.response.data : error))
            })

            markers.push(marker)

        })

        const waypoints =  points.slice(1, -1).map( p => ({ location : p , stopover : false}))

        directionsService.route({
            origin: points[0],
            destination: points[points.length - 1],
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
          },function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              directionsDisplay.setOptions({
                    suppressMarkers: true
                });
            } else {
                console.error(response);
            }
        })

    }

    const searchParams = new URLSearchParams(window.location.search.substring(1));
    const branchId = searchParams.get("branch_id")
    function updatePage(){
        axios.get(`/branch/${branchId}`)
            .then(resp => { 
                data.branch = resp.data
                updateMarkers(data.branch.stops)
            })
            .catch(error => console.error(error.response ? error.response.data : error))
    }

    function saveStop (stop){
        stop.branchId = branchId
        axios.post("/stop",stop)
            .then(resp => { 
                data.stopToCreate =  {
                    name :"",
                    latitude : 0,
                    longitude : 0
                }
                updatePage()
            })
            .catch(error => console.error(error.response.data))
    } 


    function deleteStop(id) {
        console.log("del")
        axios.delete('/stop/' + id)
            .then(resp => updatePage())
            .catch(error => console.error(error.response.data))
    }

   new Vue({
        el: "#appStops",
        data : data,
        methods : {saveStop, deleteStop}
    })

    updatePage()
}