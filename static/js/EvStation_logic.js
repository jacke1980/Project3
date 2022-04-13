function createMap(evstations) {
  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };
  // Create an overlayMaps object to hold the evstations layer.
  var overlayMaps = {
    "Greenlots": evstations[0],
    "Volta": evstations[1],
    "Tesla": evstations[2],
    "FLO": evstations[3]
  };
  // Create the map object with options.
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 5,
    layers: [streetmap, evstations[0]]
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps,overlayMaps,  {
    collapsed: false
  }).addTo(map);
}
function createMarkers(stations) {
  var evmarkers = [];
  // Loop through the stations array.
  for (var index = 0; index < stations.length; index++) {
    var station = stations[index];
    console.log("stations:", station)
    // For each station, create a marker, and bind a popup with the station's name.
    var evmarker = L.marker([station.latitude, station.longitude])
      .bindPopup("<h3>" + station.street_address+ "<h3><h3>State: " + station.state + "</h3>");
    evmarkers.push(evmarker);
    console.log("EV Marker:", evmarker)
  };
  console.log("evmarkers:", evmarkers)
  return evmarkers
};
var greenlots_gr
var volta_gr
var tesla_gr
var flo_gr
//#######################
Promise.all([
  d3.json("http://127.0.0.1:5000/API/greenlots_stations_us_web"),
  d3.json("http://127.0.0.1:5000/API/volta_stations_us_web"),
  d3.json("http://127.0.0.1:5000/API/tesla_stations_us_web"),
  d3.json("http://127.0.0.1:5000/API/flo_stations_us_web"),
]).then(function(data) {
  greenlots_gr = createMarkers(data[0]);
  volta_gr = createMarkers(data[1]);
  tesla_gr = createMarkers(data[2]);
  flo_gr = createMarkers(data[3])
  //console.log(greenlots_gr)  // first row of cities
  //console.log(volta_gr)  // first row of animals
  marker_layers = [L.layerGroup(greenlots_gr), L.layerGroup(volta_gr), L.layerGroup(tesla_gr), L.layerGroup(flo_gr)];
  createMap(marker_layers);
});