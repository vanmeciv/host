mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var battlesMap = new mapboxgl.Map({
container: 'battlesMap',
center: [6.01,41.65],
zoom: 4.3,
pitch: 60,
bearing: 33,
attributionControl: false,
style: 'mapbox://styles/isaacv/ck4063rrs2rs11crt2k4tozrm'
});
battlesMap.addControl(new mapboxgl.AttributionControl(), 'top-right');






var size = 200;

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
width: size,
height: size,
data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
onAdd: function() {
var canvas = document.createElement('canvas');
canvas.width = this.width;
canvas.height = this.height;
this.context = canvas.getContext('2d');
},

// called once before every frame where the icon will be used
render: function() {
var duration = 10000000;
var t = (performance.now() % duration) / duration;

var radius = size / 2 * 0.3;
var outerRadius = size / 2 * 0.7 * t + radius;
var context = this.context;

// draw outer circle
context.clearRect(0, 0, this.width, this.height);
context.beginPath();
context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
context.fill();

// draw inner circle
context.beginPath();
context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
context.fillStyle = 'rgba(255, 100, 100, 1)';
context.strokeStyle = 'white';
context.lineWidth = 2 + 4 * (1 - t);
context.fill();
context.stroke();

// update this image's data with data from the canvas
this.data = context.getImageData(0, 0, this.width, this.height).data;

// continuously repaint the map, resulting in the smooth animation of the dot
battlesMap.triggerRepaint();

// return `true` to let the map know that the image was updated
return true;
}
};
//on map load, run function to load the geojson
battlesMap.on('load', function(){



  battlesMap.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

battlesMap.addLayer({
  "id":"bulgeDot",
  "type":"symbol",
      "source": {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": [{
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [5.443726,
                      50.04303]
                    }
              }]
          }
      },
    "layout": {
        "icon-image": "pulsing-dot"
    }
  });
});

  battlesMap.on('load', function(){

  //add a source layer for battles
  battlesMap.addSource('wWII_Battles', {
        "type": "geojson",
        "data": "geoJSON/wWII_Battles.geojson"
    });


  // add the icons to the map
  battlesMap.addLayer({
    "id":"wWII_Battles",
    "type":"symbol",
    "source":"wWII_Battles",
    "layout": {
        "icon-image": "fire-station-11",
        "icon-size":1.5,
    },
    "paint": {}
  });

});





//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
battlesMap.on('click', 'wWII_Battles', function (e) {
      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      battlesMap.flyTo({center: e.features[0].geometry.coordinates});
      //1. set the coordinates of the popup
      var coordinates = e.features[0].geometry.coordinates;
      //2. create the information that will display in the popup
      // var description = e.features[0].properties.title;
      // var year = e.features[0].properties.name.slice(-4);
      var brief = e.features[0].properties.description.slice(0,50);

      //parsing URLs from descriptions using REGEX
      function urlify(text) {
          var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/ig
          return text.replace(urlRegex, function(url) {
              return '<a href="' + url + '">' + url + '</a>';
          })
          // or alternatively
          // return text.replace(urlRegex, '<a href="$1">$1</a>')
      }

      var text = e.features[0].properties.description;
      var html = urlify(text);

      // var url = e.features[0].properties.description.slice("/",-1)
      var description = "<h4>Battle Name: </h4>" + "<br>" + e.features[0].properties.name + "<br>Description: " + brief + "..." + "<br>More Details: " + "<a target='_blank' href=" + text + ">Click Here</a>";
      //3. make the popup
      new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(battlesMap);
});


// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
battlesMap.on('mouseenter', 'wWII_Battles', function () {
battlesMap.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
battlesMap.on('mouseleave', 'wWII_Battles', function () {
battlesMap.getCanvas().style.cursor = '';
});

// Reset the extent of the map to the original center/zoom (Button Click)
document.getElementById('fit').addEventListener('click', function() {
battlesMap.fitBounds([[ 5.443726,50.04303 ], [ 5.443726,50.04303 ]]);
});
