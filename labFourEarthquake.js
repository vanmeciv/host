mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map = new mapboxgl.Map({
container: 'labFourEarthquake',
center: [-122.4443, 47.2529],
zoom: 1,
attributionControl: false,
style: 'mapbox://styles/isaacv/ck2wpjhhk0nr31dmrnv8v1p9a'
});
map.addControl(new mapboxgl.AttributionControl(), 'top-right');

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
map.on('load', function () {
window.setInterval(function() {
map.getSource('drone').setData(url);
}, 2000);

map.addSource('drone', { type: 'geojson', data: url });
map.addLayer({
"id": "drone",
"type": "symbol",
"source": "drone",
"layout": {
"icon-image": "rocket-15"
}
});
});
