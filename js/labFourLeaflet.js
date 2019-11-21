var mymap = L.map('labFourLeaflet').setView([50.203528, 5.803528],7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g'
}).addTo(mymap);


// var smallIcon = new L.Icon.array({
//      iconSize: [27, 27],
//      iconAnchor: [13, 27],
//      popupAnchor:  [1, -24],
//      iconUrl: ['my-icon1.png', 'my-icon2.png', 'my-icon2.png', 'my-icon3.png', 'my-icon4.png', 'my-icon5.png', 'my-icon6.png', 'my-icon7.png', 'my-icon8.png', 'my-icon9.png', 'my-icon10.png', 'my-icon11.png', 'my-icon13.png', 'my-icon14.png', 'my-icon15.png', 'my-icon16.png', 'my-icon17.png']
//  });
//
// var SymbolID = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);


// Loads Mt. Rainier Marker from local file
  	$.getJSON("geoJSON/battleOfTheBulge.json",function(data){
			// add GeoJSON layer to the map once the file is loaded
			L.geoJson(data, {
				style: function(feature){
					return { color:"#a13d2d", weight: .5, fillColor:"green", fillOpacity: 0 };
				},
				onEachFeature: function(feature, marker) {
					marker.bindPopup(
					"This is " +
					feature.properties.Name
					);
				}
			}).addTo(mymap);
		});




// // Loads Evac Routes from local file or from an external file at http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
// 	$.getJSON("geoJSON/laharEvacRoutes.json",function(data){
// 		// add GeoJSON layer to the map once the file is loaded
// 		L.geoJson(data, {
// 			style: function(feature){
// 				return { color:"#000", weight: 2, fillColor:"black"};
// 			}
// 		}).addTo(mymap);
// 		});
//
//
//
// // loads Floodways from an internal file
// 		$.getJSON("geoJSON/floodways.json",function(data){
// 			// add GeoJSON layer to the map once the file is loaded
// 			L.geoJson(data, {
// 				style: function(feature){
// 					return { color:"#aad3e9", weight: 1, fillColor:"blue", fillOpacity: 3 };
// 				}
// 			}).addTo(mymap);
// 			});
//
// Loads Evac Routes from local file or from an external file at http://shpescape.com/mix/uploads/56c45ffcc7ab7606844b95e0d3579920.json/ - converted on http://shpescape.com/mix/
		// $.getJSON("geoJSON/rainier-pin.json",function(data){
		// 	// add GeoJSON layer to the map once the file is loaded
		// 	L.geoJson(data, {
		// 		style: function(feature){
		// 			return { color:"#000", weight: 2, fillColor:"black"};
		// 		},
		// 		onEachFeature: function(feature, marker) {
		// 			marker.bindPopup(
		// 			"This is " +
		// 			feature.properties.name
		// 			);
		// 		}
		// 	}).addTo(mymap);
		// });

//
// // loads Glaciers GeoJSON from an external file http://shpescape.com/mix/uploads/9e9490fc30b6045dc0d003db2680f381.json/ - converted on http://shpescape.com/mix/
// 	  $.getJSON("geoJSON/glaciers.json",function(data){
// 		  // add GeoJSON layer to the map once the file is loaded
// 		  L.geoJson(data, {
// 				style: function (feature){
// 					return { color:"#aad3e9", weight: 1, fillColor:"blue", fillOpacity: 1 };
// 				},
// 				onEachFeature: function(feature, layer) {
// 					layer.bindPopup(
// 							"This is " +
// 							feature.properties.NAME
// 							);
// 				}
// 			}).addTo(mymap);
// 		});




//popup on each JSON Layer (https://gis.stackexchange.com/questions/229723/displaying-properties-of-geojson-in-popup-on-leaflet/229743)
//var layerGroup = L.geoJSON(data, {
  //onEachFeature: function (feature, layer) {
    //layer.bindPopup('<h1>'+feature.properties.f1+'</h1><p>name: '+feature.properties.f2+'</p>');
	  //}
//}).addTo(map);

// testing glacier selection
	var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("This is " + e.latlng.toString())
				.openOn(mymap);
		}

	mymap.on('click', onMapClick);
