let initialZoomLevel = 10;
let initialCenter = [1588911.734653, 6026906.806230];

let mapObjectInput = {
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'map',
        view: new ol.View({
          center: initialCenter,
          zoom: initialZoomLevel
        })
      };

//allow the user to draw a line on the map
var map = new ol.Map(mapObjectInput);
var draw;
var source = new ol.source.Vector();

var vectorLayer = new ol.layer.Vector({
    source: source
});
map.addLayer(vectorLayer);

//measure distance function
function addMeasureInteraction() {
    draw = new ol.interaction.Draw({
        source: source,
        type: 'LineString'
    });
    map.addInteraction(draw);
    draw.on('drawend', function(event) {
        var line = event.feature.getGeometry();
        var length = ol.sphere.getLength(line);
        alert('Distance: ' + (length / 1000).toFixed(2) + ' kilometers');
        map.removeInteraction(draw);
    });
}

//function to show user location
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var userLocation = ol.proj.fromLonLat([longitude, latitude]);
    var view = map.getView();
    view.animate({center: userLocation, zoom: 12});
}

document.getElementById('measure-distance').onclick = function() {
    addMeasureInteraction();
};

//get user location and center the map on it
document.getElementById('my-location-btn')
.addEventListener ("click",function ()
{
    navigator.geolocation. getCurrentPosition(function(Position)
    {
        var latitude = Position.coords.latitude;
        var longitude = Position.coords.longitude;
        var userLocation = ol.proj.fromLonLat([longitude, latitude]);
        map.getView().animate({center: userLocation, zoom: 15, duration: 1000});
    });
});


document.getElementById('zoom-out').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function() {
    var view = map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
};

document.getElementById('reset').onclick = function() {
    var view = map.getView();
    view.animate({zoom: initialZoomLevel}, {center: initialCenter});
};

document.getElementById('left').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0] - 100000, currentCenter[1]]});
};

document.getElementById('right').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0] + 100000, currentCenter[1]]});
};

document.getElementById('up').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0], currentCenter[1] + 100000]});
};

document.getElementById('down').onclick = function() {
    var view = map.getView();
    var currentCenter = view.getCenter();
    view.animate({center: [currentCenter[0], currentCenter[1] - 100000]});
};

map.on('click', function(e) {
    console.log(e);
});