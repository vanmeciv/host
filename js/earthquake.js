mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMmdqMmVpMDBnYmczYnBoaHhzbDJybGgifQ.5_1sNMFnGpLHtF5fv_Yxuw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
});


// var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
// map.on('load', function () {
// 	window.setInterval(function() {
// 	mapbox.getSource('drone').setData(url);
// 	}, 2000);
//
// 	map.addSource('drone', { type: 'geojson', data: url });
// 	map.addLayer({
// 		"id": "drone",
// 		"type": "symbol",
// 		"source": "drone",
// 		"layout": {
// 	  "icon-image": "rocket-15"
// 	}
// 	});
// });
