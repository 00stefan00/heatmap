
//
//      Heatmap javascript
//
//
var heatLayers = [];

function initialize() {
    var map = getMap(getMapOptions());
    google.maps.event.addListener(map, 'idle', onIdle);
    heatLayer = getNewHeatLayer(map, triggers_hoogeveen);
    heatLayer = getNewHeatLayer(map, triggers_hoogkerk);
    //getController();
}

function onIdle(){
    //alert("idle");
}

function getMapOptions() {
    var hoogeveen = new google.maps.LatLng(52.73400225036641, 6.47296751087904);
    var hoogkerk = new google.maps.LatLng(53.1982171153152, 6.512751840054989);
    var nijmegen = new google.maps.LatLng(51.82730272563614, 5.824586860835552);

    var mapOptions = {
            center: hoogkerk,
            zoom: 17,
            minZoom: 14,
            maxZoom: 20,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
    
    return mapOptions;
}

function getMap() {
    return new google.maps.Map(document.getElementById("map-canvas"), getMapOptions());
}

// function getController(){
//     var btn = document.createElement("Left_Button");
//     var t = document.createTextNode("<");
//     btn.appendChild(t);
//     document.body.appendChild(btn)
// }

function getNewHeatLayer(map, data) {
    var heatLayer = createHeatLayer(map, getData(data));
    heatLayers.push(heatLayer);
    return heatLayer
}
    

function createHeatLayer(map, data){
    heatmap = new HeatmapOverlay(map,
        {
            "radius": 0.00020,
            "scaleRadius": true,
            "maxOpacity": 60,
            "useLocalExtrema": false,
            latField: 'lat',
            lngField: 'lon',
            valueField: 'triggers'
        }
    );

    heatmap.setData(data);
    return heatmap;
}

function getData(json) {
    jsonData = []
    dataMax = getMedian(json)*6;
    for (i = 0; i < json.length-1; i++){
        
        longitude = json[i].lon
        latitude = json[i].lat
        triggers_per_hour = json[i].triggers

        if(triggers_per_hour > dataMax){
            triggers_per_hour = dataMax;
        }

        jsonData.push({lat:longitude, lon:latitude, triggers:triggers_per_hour})
    }
    var testData = {
        min: 0,
        max: dataMax,
        data: jsonData
    };
    return testData;
}

function getMedian(json) {
     data = []
     for (i = 0; i < json.length-1; i++){
         data.push(json[i].triggers);
     }
     data = data.sort(function(a, b){return a-b});
     return data[Math.round(json.length/2)];
}

google.maps.event.addDomListener(window, 'load', initialize);


/**
 * Created by Stefan Strijker on 9/30/2014.
 */
