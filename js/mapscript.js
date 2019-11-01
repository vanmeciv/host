var mymap = L.map('mapid').setView([47.19, -122.2], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMmdqMmVpMDBnYmczYnBoaHhzbDJybGgifQ.5_1sNMFnGpLHtF5fv_Yxuw'
}).addTo(mymap);

// load GeoJSON from an external file http://shpescape.com/mix/uploads/9e9490fc30b6045dc0d003db2680f381.json/ - converted on http://shpescape.com/mix/
  $.getJSON("geoJSON/glaciers.json",function(data){
    // add GeoJSON layer to the map once the file is loaded
    L.geoJson(data).addTo(mymap);
  });
// load GeoJSON from an external file http://shpescape.com/mix/uploads/348fe11277684b1eddbe1c813fdc3696.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/floodways.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data).addTo(mymap);
	});
// load GeoJSON from an external file http://shpescape.com/mix/uploads/9e9490fc30b6045dc0d003db2680f381.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/laharEvacRoutes.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data).addTo(mymap);
	});
// load GeoJSON from an external file http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
	$.getJSON("geoJSON/parks.json",function(data){
		// add GeoJSON layer to the map once the file is loaded
		L.geoJson(data).addTo(mymap);
		});
