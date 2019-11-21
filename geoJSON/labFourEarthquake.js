mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map = new mapboxgl.Map({
container: 'labFourEarthquake',
center: [-122.4443, 47.2529],
zoom: 2,
attributionControl: false,
style: 'mapbox://styles/isaacv/ck2wpjhhk0nr31dmrnv8v1p9a'
});
map.addControl(new mapboxgl.AttributionControl(), 'top-right');

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
map.on('load', function(){
  //add a source layer for earthquakes
  map.addSource('earthquakes', {
        "type": "geojson",
        "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
    });
    //add the earthquakes to the map
    map.addLayer({
      "id":"equakes",
      "type":"circle",
      "source":"earthquakes"
    });
});

//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
map.on('click', 'equakes', function (e) {
      //1. set the coordinates of the popup
      var coordinates = e.features[0].geometry.coordinates;
      //2. create the information that will display in the popup
      // var description = e.features[0].properties.title;
      var description = "<h3>"+e.features[0].properties.title+"</h3>"+"<p>Depth: " + e.features[0].geometry.depth + "<br>Status: " + e.features[0].properties.status + "<br> Tsunami: " + e.features[0].properties.tsunami + "</p>";
      //3. make the popup
      new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
});
