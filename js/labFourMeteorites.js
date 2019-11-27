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



//on map load, run function to load the geojson
map2.on('load', function(){
  //add a source layer for earthquakes
  map2.addSource('meteorites', {
        "type": "geojson",
        "data": "https://data.nasa.gov/resource/gh4g-9sfh.geojson"
    });

    // add the earthquakes to the map
    map2.addLayer({
      "id":"meteors",
      "type":"symbol",
      "source":"meteorites",
      "layout": {
          "icon-image": "fire-station-11",
          "icon-size":1.5,
      },
      "paint": {}
    });

});



//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
map2.on('click', 'meteors', function (e) {
      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      map2.flyTo({center: e.features[0].geometry.coordinates});
      //1. set the coordinates of the popup
      var coordinates = e.features[0].geometry.coordinates;
      //2. create the information that will display in the popup
      // var description = e.features[0].properties.title;
      var year = e.features[0].properties.year.slice(0,4);
      var description = "<h4>Meteorite</h4><p>Name: " + e.features[0].properties.name + "<br>Year of Fall: " + year + "<br> Size: " + e.features[0].properties.mass + "g </p>";
      //3. make the popup
      new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map2);
});

// style: function(feature){
//   var tsunami,
//     wave = feature.properties.tsunami;
//       if (wave === 0) polyColor = "#99d594";
//       else polyColor = "ffffff";
//     return {color: "#ffffff", weight: 1.5, fillColor: polyColor, fillOpacity: 0.6};
// }


// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map2.on('mouseenter', 'meteors', function () {
map2.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map2.on('mouseleave', 'meteors', function () {
map2.getCanvas().style.cursor = '';
});

document.getElementById('fit').addEventListener('click', function() {
map2.fitBounds([[
32.958984,
-5.353521
], [
43.50585,
5.615985
]]);
});
