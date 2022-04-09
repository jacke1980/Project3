// TESLA

// VOLTA
// function createMap(Volta_EvStations) {

//   // Create the tile layer that will be the background of our map.
//   var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });


//   // Create a baseMaps object to hold the streetmap layer.
//   var baseMaps = {
//     "Street Map": streetmap
//   };

//   // Create an overlayMaps object to hold the Tesla Stations layer.
//   var Volta_overlayMaps = {
//     "Ev Stations": Volta_EvStations
//   };

 
//   // Create the map object with options.
//   var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [streetmap, Volta_EvStations]
//   });
//   // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//   L.control.layers(baseMaps, Volta_overlayMaps,
//      {
//   collapsed: false
//   }).addTo(map);
// }

d3.json("/API/tesla_stations_us_web").then(data => {
  function createMap(Tesla_EvStations) {

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the Tesla Stations layer.
    var Tesla_overlayMaps = {
      "Tesla Stations": Tesla_EvStations
    };

   
    // Create the map object with options.
    var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, Tesla_EvStations]
    });
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, Tesla_overlayMaps,
       {
    collapsed: false
    }).addTo(map);
  };

  function createMarkers(data) {

    // Pull the "stations" property from response.data.
     // Pull the "stations" property from response.data.
     var stations = data;
     // Initialize an array to hold bike markers.
     var EvStationMarkers = [];
     // Loop through the stations array.
     for (var index = 0; index < stations.length; index++) {
       var station = stations[index];
       // For each station, create a marker, and bind a popup with the station's name.
       var EvStationMarker = L.marker([station.latitude, station.longitude])
         .bindPopup("<h3>" + station.street_address + "<h3><h3>City: " + station.city + "</h3>"
         + "<h3><h3>State: " + station.state + "</h3>");
       // Add the marker to the bikeMarkers array.
       EvStationMarkers.push(EvStationMarker);
     }
     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
     createMap(L.layerGroup(EvStationMarkers));
   };
});