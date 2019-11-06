var mymap = L.map('mapid').setView([47.19, -122.2], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMmdqMmVpMDBnYmczYnBoaHhzbDJybGgifQ.5_1sNMFnGpLHtF5fv_Yxuw'
}).addTo(mymap);



	var states = [{
		"type": "Feature",
		"properties": {"party": "Parks"},
		"geometry": {
			"type": "Polygon",
			"coordinates": [[
				[-104.05, 48.99],
				[-97.22,  48.98],
				[-96.58,  45.94],
				[-104.03, 45.94],
				[-104.05, 48.99]
			]]
		}
	}, {
		"type": "Feature",
		"properties": {"party": "Glaciers"},
		"geometry": {
			"type": "Polygon",
			"coordinates": [[
				[-109.05, 41.00],
				[-102.06, 40.99],
				[-102.03, 36.99],
				[-109.04, 36.99],
				[-109.05, 41.00]
			]]
		}
	}];
	L.geoJSON(states, {
		style: function(feature) {
			switch (feature.properties.party) {
				case 'Parks': return {color: "#ff0000"};
				case 'Glaciers':   return {color: "#0000ff"};
			}
		}
	}).addTo(mymap);



	// load Mt. Rainier Glaciers GeoJSON from an external file http://shpescape.com/mix/uploads/9e9490fc30b6045dc0d003db2680f381.json/ - converted on http://shpescape.com/mix/
	  $.getJSON("geoJSON/glaciers.json",function(data){
	    // add GeoJSON layer to the map once the file is loaded
	    L.geoJson(data).addTo(mymap);
	  });

// load Pierce County Parks GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/parks.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data).addTo(mymap);
		});

// load GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/laharEvacRoutes.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data).addTo(mymap);
		});



// testing glacier selection
		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("This is " + e.latlng.toString())
				.openOn(mymap);
		}



		mymap.on('click', onMapClick);
