mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map = new mapboxgl.Map({
container: 'labFourEarthquake',
center: [-122.4443, 47.2529],
zoom: 1,
attributionControl: false,
style: 'mapbox://styles/isaacv/ck2wpjhhk0nr31dmrnv8v1p9a'
});
map.addControl(new mapboxgl.AttributionControl(), 'top-right');

map.on('load', function () {


map.addSource('earthquakes', {
        "type": "geojson",
        "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
    });
  // add custom icon to the map (https://gis.stackexchange.com/questions/179255/mapbox-gl-addlayer-where-are-the-icon-images-coming-from)
  map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Antu_earthquake.svg/512px-Antu_earthquake.svg.png', function(error, image) {
      if (error) throw error;
      map.addImage('quake', image);
      map.addLayer({
          "id": "Earthquakes",
          "type": "symbol",
          "source": "earthquakes",
          "layout": {
              "icon-image": "quake",
              "icon-size": 0.075,
              "visibility":"visible"
          }
      });
  });

map.addSource('contours', {
type: 'vector',
url: 'mapbox://mapbox.mapbox-terrain-v2'
});
map.addLayer({
'id': 'Contours',
'type': 'line',
'source': 'contours',
'source-layer': 'contour',
'layout': {
'visibility': 'visible',
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#877b59',
'line-width': 1
}
});
});

var toggleableLayerIds = [ 'Contours', 'Earthquakes' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
var id = toggleableLayerIds[i];

var link = document.createElement('a');
link.href = '#';
link.className = 'active';
link.textContent = id;

link.onclick = function (e) {
var clickedLayer = this.textContent;
e.preventDefault();
e.stopPropagation();

var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

if (visibility === 'visible') {
map.setLayoutProperty(clickedLayer, 'visibility', 'none');
this.className = '';
} else {
this.className = 'active';
map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
}
};

var layers = document.getElementById('layerToggleMenu');
layers.appendChild(link);
}

//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
map.on('click', 'Earthquakes', function (e) {
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
              .addTo(map);
});


// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'Earthquakes', function (e) {
map.flyTo({center: e.features[0].geometry.coordinates});
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on('mouseenter', 'Earthquakes', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Earthquakes', function () {
map.getCanvas().style.cursor = '';
});


// mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
// var map1 = new mapboxgl.Map({
// container: 'labFourEarthquake',
// center: [-122.4443, 47.2529],
// zoom: 1,
// attributionControl: false,
// style: 'mapbox://styles/isaacv/ck2wpjhhk0nr31dmrnv8v1p9a'
// });
// map1.addControl(new mapboxgl.AttributionControl(), 'top-right');
//
//
// //on map load, run function to load the geojson
// map1.on('load', function() {
//   //add a source layer for earthquakes
//   map1.addSource('earthquakes', {
//           "type": "geojson",
//           "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
//       });
//     // add custom icon to the map (https://gis.stackexchange.com/questions/179255/mapbox-gl-addlayer-where-are-the-icon-images-coming-from)
//     map1.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Antu_earthquake.svg/512px-Antu_earthquake.svg.png', function(error, image) {
//         if (error) throw error;
//         map1.addImage('cat', image);
//         map1.addLayer({
//             "id": "equakes",
//             "type": "symbol",
//             "source": "earthquakes",
//             "layout": {
//                 "icon-image": "cat",
//                 "icon-size": 0.075,
//             }
//         });
//     });
// });
//
//
// //add a handler for clicking/popups
// //Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
// map1.on('click', 'equakes', function (e) {
//       //1. set the coordinates of the popup
//       var coordinates = e.features[0].geometry.coordinates;
//       //2. create the information that will display in the popup
//       // var description = e.features[0].properties.title;
//       var depth = e.features[0].geometry.depth;
//       var description = "<h4>"+e.features[0].properties.title+"</h4>" + "<p>Depth: " + e.features[0].geometry.depth + "<br>Status: " + e.features[0].properties.status + "<br> Tsunami: " + e.features[0].properties.tsunami + "<br> More Details: " + "<a target='_blank' href=" + e.features[0].properties.url + ">Click Here</a>";
//       //3. make the popup
//       new mapboxgl.Popup()
//               .setLngLat(coordinates)
//               .setHTML(description)
//               .addTo(map1);
// });
//
//
// // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
// map1.on('click', 'equakes', function (e) {
// map1.flyTo({center: e.features[0].geometry.coordinates});
// });
//
// // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
// map1.on('mouseenter', 'equakes', function () {
// map1.getCanvas().style.cursor = 'pointer';
// });
//
// // Change it back to a pointer when it leaves.
// map1.on('mouseleave', 'equakes', function () {
// map1.getCanvas().style.cursor = '';
// });
