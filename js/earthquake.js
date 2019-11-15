mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWN2IiwiYSI6ImNrMnpqYnVxaTA1b3IzbXBnaG5zY3o3eTEifQ.kMdIcXYBFKHTorj3Hxgi7g';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/isaacv/ck2wpjhhk0nr31dmrnv8v1p9a'
});




var url = 'https://wanderdrone.appspot.com/';
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
