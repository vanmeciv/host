mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-65.017, -16.457],
    zoom: 5
});

map.on('load', function(){
  map.addSource('contours', {
    type: 'geojson',
    data: 'geoJSON/cats.json'
    });

  var geojson = map.addLayer({
    id: 'Contours',
    type: 'circle',
    source: 'contours'
  });
});

// add markers to map
geojson.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://vanmeciv.github.io/host/img/icons/' + marker.properties.SymbolID  '.png)';


    el.addEventListener('click', function() {
        window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});
