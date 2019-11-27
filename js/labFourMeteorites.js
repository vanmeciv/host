mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map2 = new mapboxgl.Map({
container: 'labFourMeteorites',
center: [-122.4443, 47.2529],
zoom: 3,
pitch: 55,
bearing: 45,
attributionControl: false,
style: 'mapbox://styles/isaacv/ck3f64eev0mam1cpd002nl27y'
});
map2.addControl(new mapboxgl.AttributionControl(), 'top-right');

//PREVIOUS CODE
// var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
// map.on('load', function () {
// window.setInterval(function() {
// map.getSource('drone').setData(url);
// }, 2000);
//
// map.addSource('drone', { type: 'geojson', data: url });
// map.addLayer({
// "id": "drone",
// "type": "symbol",
// "source": "drone",
// "layout": {
// "icon-image": "rocket-15"
// }
// });
// });



//on map load, run function to load the geojson
map2.on('load', function(){
  //add a source layer for earthquakes
  map2.addSource('meteorites', {
        "type": "geojson",
        "data": "https://data.nasa.gov/resource/gh4g-9sfh.geojson"
    });
    //add the earthquakes to the map
    map2.addLayer({
      "id":"meteors",
      "type":"circle",
      "source":"meteorites"
    });
});

//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
map2.on('click', 'meteors', function (e) {
      //1. set the coordinates of the popup
      var coordinates = e.features[0].geometry.coordinates;
      //2. create the information that will display in the popup
      // var description = e.features[0].properties.title;
      var description = "<h3>Meteorite"+"</h3>"+"<p>Name: " + e.features[0].properties.name + "<br>Date of Fall: " + e.features[0].properties.year + "<br> Size: " + e.features[0].properties.mass + "g" + "</p>";
      //3. make the popup
      new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map2);
});


// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map2.on('click', 'meteors', function (e) {
map2.flyTo({center: e.features[0].geometry.coordinates});
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map2.on('mouseenter', 'meteors', function () {
map2.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map2.on('mouseleave', 'meteors', function () {
map2.getCanvas().style.cursor = '';
});
