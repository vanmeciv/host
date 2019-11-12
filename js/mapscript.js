var mymap = L.map('mapid').setView([47.10, -122.1], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMmdqMmVpMDBnYmczYnBoaHhzbDJybGgifQ.5_1sNMFnGpLHtF5fv_Yxuw'
}).addTo(mymap);




// load Mt. Rainier Glaciers GeoJSON from an external file http://shpescape.com/mix/uploads/9e9490fc30b6045dc0d003db2680f381.json/ - converted on http://shpescape.com/mix/
  $.getJSON("geoJSON/glaciers.json",function(data){
	  // add GeoJSON layer to the map once the file is loaded
	  L.geoJson(data, {
			style: function(feature){
				return { color:"#c9dfe3", weight: 2, fillColor:"blue", fillOpacity: .3 };
			}
		}).addTo(mymap);
	});

// load Pierce County Parks GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/rainier-pin.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data, {
			style: function(feature){
				return { color:"#a13d2d", weight: 3, fillColor:"green",};
			}
		}).addTo(mymap);
		});

// load GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/laharEvacRoutes.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data, {
			style: function(feature){
				return { color:"#000", weight: 2, fillColor:"black"};
			}
		}).addTo(mymap);
		});

// load GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
		$.getJSON("geoJSON/2019-flood-review.json",function(data){
			// add GeoJSON layer to the map once the file is loaded
			L.geoJson(data, {
				style: function(feature){
					return { color:"#006994", weight: .5, fillColor:"blue"};
				}
			}).addTo(mymap);
			});


<<<<<<< HEAD





// testing glacier selection
		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("This is " + e.latlng.toString())
				.openOn(mymap);
		}

	mymap.on('click', onMapClick);
=======
// load GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
		$.getJSON("geoJSON/floodways.json",function(data){
			// add GeoJSON layer to the map once the file is loaded
			L.geoJson(data, {
				style: function(feature){
					return { color:"#000", weight: .5, fillColor:"black"};
				}
			}).addTo(mymap);
			});
>>>>>>> ccb76c7bbbc87361dcd6a413180618cb23e761f6
