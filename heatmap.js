

var map, pointArray, heatmap;

var heatMapData = [];

function initialize() {
    var hoogeveen = new google.maps.LatLng(52.73400225036641, 6.47296751087904);
    var hoogkerk = new google.maps.LatLng(53.1982171153152, 6.512751840054989);
    var nijmegen = new google.maps.LatLng(51.82730272563614, 5.824586860835552);

    var mapOptions = {
        zoom: 10,
        center: hoogeveen,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    console.log("nijmegen");
    generateHeatMapData(triggers_nijmegen);
    console.log("hoogeveen");
    generateHeatMapData(triggers_hoogeveen);
    console.log("hoogkerk");
    generateHeatMapData(triggers_hoogkerk);

    pointArray = new google.maps.MVCArray(heatMapData);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.setMap(map);
}

function generateHeatMapData(json) {
    var median = getMedian(json);

    for (i = 0; i < json.length-1; i++){
        
        longitude = json[i].lat
        latitude = json[i].lon
        triggers_per_hour = json[i].triggers
        if(triggers_per_hour > median*8) {
            console.log(triggers_per_hour + " > " + median*8);
            triggers_per_hour = median*8;

        }

        var dataObject = {
            location: new google.maps.LatLng(latitude, longitude), 
            weight: triggers_per_hour
        }
        heatMapData.push(dataObject);
    }
}

function getMedian(json) {
     data = []
     for (i = 0; i < json.length-1; i++){
         data.push(json[i].triggers);
     }
     data = data.sort(function(a, b){return a-b});
     return data[Math.round(json.length/2)];
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function getRadius(value, change) {
    console.log(">" + value);
    if(value == undefined){
        value = null;
    }
    var radius = [
        5,
        null,
        20,
        40,
        60,
        80,
        100
    ];
    var i = radius.indexOf(value) + change;
    
    if(i >= 0 && i <= radius.length-1){
        console.log(radius[i]);

        return radius[i];
    }
    else{
        console.log(value);

        return value;
    }
}

function changeRadius() {
  heatmap.set('radius', getRadius(heatmap.get('radius'), 1));
}

function changeOpacity() {
  heatmap.set('radius', getRadius(heatmap.get('radius'), -1));
}

google.maps.event.addDomListener(window, 'load', initialize);