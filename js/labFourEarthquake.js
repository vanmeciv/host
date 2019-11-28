mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map1 = new mapboxgl.Map({
container: 'labFourEarthquake',
center: [-122.4443, 47.2529],
zoom: 2,
attributionControl: false,
style: 'mapbox://styles/isaacv/ck2wpjhhk0nr31dmrnv8v1p9a'
});
map1.addControl(new mapboxgl.AttributionControl(), 'top-right');

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
map1.on('load', function(){
  //add a source layer for earthquakes
  map1.addSource('earthquakes', {
        "type": "geojson",
        "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
    });
    // add the icons to the map
    map1.addLayer({
      "id":"equakes",
      "type":"symbol",
      "source":"earthquakes",
      "layout": {
          "icon-image": "fire-station-11",
          "icon-size":1.5,
      },
      "paint": {}
    });
});




//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
map1.on('click', 'equakes', function (e) {
      //1. set the coordinates of the popup
      var coordinates = e.features[0].geometry.coordinates;
      //2. create the information that will display in the popup
      // var description = e.features[0].properties.title;
      var depth = e.features[0].geometry.depth;
      var description = "<h4>"+e.features[0].properties.title+"</h4>" + "<p>Depth: " + e.features[0].geometry.depth + "<br>Status: " + e.features[0].properties.status + "<br> Tsunami: " + e.features[0].properties.tsunami + "<br> More Details: " + "<a target='_blank' href=" + e.features[0].properties.url + ">Click Here</a>";
      //3. make the popup
      new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map1);
});





// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map1.on('click', 'equakes', function (e) {
map1.flyTo({center: e.features[0].geometry.coordinates});
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map1.on('mouseenter', 'equakes', function () {
map1.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map1.on('mouseleave', 'equakes', function () {
map1.getCanvas().style.cursor = '';
});
