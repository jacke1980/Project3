// Create a map object.
// var myMap = L.map("map", {
//   center: [37.09, -95.71],
//   zoom: 5
// });
// // Add a tile layer.
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);
var cities1 = [{
  _id: "6251860c80047eb41e4c2d32",
  access_code: "public",
  access_days_time: "24 hours daily; for Tesla use only",
  city: "Athens",
  ev_connector_types: "TESLA",
  ev_pricing: "$0.28 per kWh; $0.26 per minute above 60 kW and $0.13 per minute at or below 60 kW",
  facility_type: null,
  lat: 34.785416,
  lon: -86.942864,
  open_date: "2017-09-01",
  state: "AL",
  street_address: "22222 Athens-Limestone Blvd.",
  zip: 35613
},
{
  _id: "6251860c80047eb41e4c2d33",
  access_code: "public",
  access_days_time: "24 hours daily; for Tesla use only",
  city: "Auburn",
  ev_connector_types: "TESLA",
  ev_pricing: "$0.28 per kWh; $0.26 per minute above 60 kW and $0.13 per minute at or below 60 kW",
  facility_type: null,
  lat: 32.627837,
  lon: -85.445105,
  open_date: "2015-01-01",
  state: "AL",
  street_address: "1627 Opelika Road",
  zip: 36830
}];

var cities2 = [{
  _id: "6251860c80047eb41e4c2d32",
  access_code: "public",
  access_days_time: "24 hours daily; for Tesla use only",
  city: "Athens",
  ev_connector_types: "TESLA",
  ev_pricing: "$0.28 per kWh; $0.26 per minute above 60 kW and $0.13 per minute at or below 60 kW",
  facility_type: null,
  lat: 30.785416,
  lon: -86.942864,
  open_date: "2017-09-01",
  state: "AL",
  street_address: "1111 Athens-Limestone Blvd.",
  zip: 35613
},
{
  _id: "6251860c80047eb41e4c2d33",
  access_code: "public",
  access_days_time: "24 hours daily; for Tesla use only",
  city: "Auburn",
  ev_connector_types: "TESLA",
  ev_pricing: "$0.28 per kWh; $0.26 per minute above 60 kW and $0.13 per minute at or below 60 kW",
  facility_type: null,
  lat: 32.627837,
  lon: -80.445105,
  open_date: "2015-01-01",
  state: "AL",
  street_address: "4444 Opelika Road",
  zip: 36830
}];
// Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
// for (var i = 0; i < cities.length; i++) {
//   var city = cities[i];
//   L.marker([city.lat,city.lon])
//     .bindPopup(`<h1>${city.street_address}</h1> <hr> <h3>Population ${city.state}</h3>`)
//     .addTo(myMap);
// }
function createMap(bikeStations) {
  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };
  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "Stations1": bikeStations[0],
    "Stations2": bikeStations[1]
  };
  // Create the map object with options.
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 5,
    layers: [streetmap, bikeStations[0], bikeStations[1]]
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps,overlayMaps,  {
    collapsed: false
  }).addTo(map);
}

function createMarkers(stations) {
  // Pull the "stations" property from response.data.
  // var stations = cities;
  // console.log(stations)
  // Initialize an array to hold bike markers.
  var bikeMarkers = [];
  // Loop through the stations array.
  for (var index = 0; index < stations.length; index++) {
    var station = stations[index];
    console.log("stations:", station)
    // For each station, create a marker, and bind a popup with the station's name.
    var bikeMarker = L.marker([station.lat, station.lon])
      .bindPopup("<h3>" + station.street_address+ "<h3><h3>State: " + station.state + "</h3>");
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);
    console.log("bikeMarker:", bikeMarker)
  }
  console.log("bikeMarkers:", bikeMarkers)
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  // createMap(L.layerGroup(bikeMarkers));
  return bikeMarkers
}
// d3.json("response").then(createMarkers);

// createMarkers(cities1);

x = createMarkers(cities1);
console.log("x:", x)

y = createMarkers(cities2);
console.log("y:", y)

marker_layers = [L.layerGroup(x), L.layerGroup(y)];
createMap(marker_layers);

