mapOne.on('load', function () {


  mapOne.addSource('earthquakes', {
          "type": "geojson",
          "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
      });
    // add custom icon to the map (https://docs.mapbox.com/mapbox-gl-js/example/add-image/)
    mapOne.loadImage('img/icons/1.png', function(error, image) {
        if (error) throw error;
        mapOne.addImage('one', image);
        mapOne.addLayer({
            "id": "Friendly Infantry",
            "type": "symbol",
            "source": "earthquakes",
            "layout": {
                "icon-image": "one",
                "icon-size": 0.075,
                "visibility":"visible"
            }
        });
    });

    mapOne.loadImage('img/icons/2.png', function(error, image) {
        if (error) throw error;
        mapOne.addImage('two', image);
        mapOne.addLayer({
            "id": "Neutral Armor",
            "type": "symbol",
            "source": "earthquakes",
            "layout": {
                "icon-image": "two",
                "icon-size": 0.075,
                "visibility":"visible"
            }
        });
    });

    mapOne.loadImage('img/icons/3.png', function(error, image) {
        if (error) throw error;
        mapOne.addImage('three', image);
        mapOne.addLayer({
            "id": "Friendly Armor",
            "type": "symbol",
            "source": "earthquakes",
            "layout": {
                "icon-image": "three",
                "icon-size": 0.075,
                "visibility":"visible"
            }
        });
    });

    mapOne.loadImage('img/icons/4.png', function(error, image) {
        if (error) throw error;
        mapOne.addImage('four', image);
        mapOne.addLayer({
            "id": "Hostile Infantry",
            "type": "symbol",
            "source": "earthquakes",
            "layout": {
                "icon-image": "four",
                "icon-size": 0.075,
                "visibility":"visible"
            }
        });
    });



  });

var toggleableLayerIds = [ 'Friendly Infantry', 'Neutral Armor', 'Friendly Armor', 'Hostile Infantry' ];

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

var visibility = mapOne.getLayoutProperty(clickedLayer, 'visibility');

if (visibility === 'visible') {
mapOne.setLayoutProperty(clickedLayer, 'visibility', 'none');
this.className = '';
} else {
this.className = 'active';
mapOne.setLayoutProperty(clickedLayer, 'visibility', 'visible');
}
};

var layers = document.getElementById('layerToggleMenu');
layers.appendChild(link);
}

//add a handler for clicking/popups
//Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
mapOne.on('click', 'Earthquakes', function (e) {
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
              .addTo(mapOne);
});


// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
mapOne.on('click', 'Earthquakes', function (e) {
mapOne.flyTo({center: e.features[0].geometry.coordinates});
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
mapOne.on('mouseenter', 'Earthquakes', function () {
mapOne.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
mapOne.on('mouseleave', 'Earthquakes', function () {
mapOne.getCanvas().style.cursor = '';
});
