
mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [31.4606, 20.7927],
zoom: 0.5
});

var months = [
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December',
];


// [
// 'December 16, 1944',
// 'December 18, 1944',
// 'December 19, 1944',
// 'December 21, 1944',
// 'December 23, 1944',
// 'December 25, 1944',
// 'December 27, 1944',
// 'January 1, 1945',
// 'January 3, 1945',
// 'January 15, 1945',
// 'January 18, 1945'
// ];

// var days = [
//   '1944-12-16',
//   '1944-12-18',
//   '1944-12-19',
//   '1944-12-21',
//   '1944-12-23',
//   '1944-12-25',
//   '1944-12-27',
//   '1945-01-01',
//   '1945-01-03',
//   '1945-01-15',
//   '1945-01-18',
// ];



function filterBy(month) {

var filters = ['==', 'month', month];
map.setFilter('earthquake-circles', filters);
map.setFilter('earthquake-labels', filters);

// Set the label to the month
document.getElementById('month').textContent = months[month];
}


// testing filter of campaign day
// function filterBy(day) {
// var filters = ['==', 'day', day];
// map.setFilter('unit-circles', filters);
// map.setFilter('unit-labels', filters);
// document.getElementById('day').textContent = days[day];
// }



// // Set the label to the day
// document.getElementById('month').textContent = days[month];
// }


map.on('load', function() {

// Data courtesy of http://earthquake.usgs.gov/
// Query for significant earthquakes in 2015 URL request looked like this:
// http://earthquake.usgs.gov/fdsnws/event/1/query
//    ?format=geojson
//    &starttime=2015-01-01
//    &endtime=2015-12-31
//    &minmagnitude=6'
//
// Here we're using d3 to help us make the ajax request but you can use
// Any request method (library or otherwise) you wish.
d3.json('https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson', function(err, data) {
if (err) throw err;

// // Here we're using d3 to help us make the ajax request but you can use
// // Any request method (library or otherwise) you wish.
// d3.json('geojson/battleOfTheBulge', function(err, data) {
// if (err) throw err;

// Create a month property value based on time
// used to filter against.
data.features = data.features.map(function(d) {
d.properties.month = new Date(d.properties.time).getMonth();
return d;
});

map.addSource('earthquakes', {
'type': 'geojson',
data: data
});

map.addLayer({
'id': 'earthquake-circles',
'type': 'circle',
'source': 'earthquakes',
'paint': {
'circle-color': [
'interpolate',
['linear'],
['get', 'mag'],
6, '#FCA107',
8, '#7F3121'
],
'circle-opacity': 0.75,
'circle-radius': [
'interpolate',
['linear'],
['get', 'mag'],
6, 20,
8, 40
]
}
});

map.addLayer({
'id': 'earthquake-labels',
'type': 'symbol',
'source': 'earthquakes',
'layout': {
'text-field': ['concat', ['to-string', ['get', 'mag']], 'm'],
'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
'text-size': 12
},
'paint': {
'text-color': 'rgba(0,0,0,0.5)'
}
});

// Set filter to first month of the year
// 0 = January
filterBy(0);

document.getElementById('slider').addEventListener('input', function(e) {
var month = parseInt(e.target.value, 10);
filterBy(month);
});
});
});
