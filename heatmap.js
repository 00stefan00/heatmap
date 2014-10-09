

var map, pointArray, heatmap;

var heatMapData;
var heatMapSettings = {
    radius: null
};
var mapBounds = {
    longitudeLow: null,
    longitudeHigh: null,
    latitudeLow: null,
    latitudeHigh: null
}

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

    google.maps.event.addListener(map, 'dragend', mapViewChanged);
    google.maps.event.addListener(map, 'zoom_changed', mapViewChanged);

    // heatMapInit();
}

function heatMapInit(){    
    heatMapData = []

    if (heatmap != undefined) {
        heatmap.setMap(null);
    }
    if(map.getBounds() != undefined){
        mapBounds.latitudeLow = map.getBounds().va.j;
        mapBounds.latitudeHigh = map.getBounds().va.k;
        mapBounds.longitudeLow = map.getBounds().Ea.k;
        mapBounds.longitudeHigh = map.getBounds().Ea.j;
    }

    generateHeatMapData(triggers_nijmegen);
    generateHeatMapData(triggers_hoogeveen);
    generateHeatMapData(triggers_hoogkerk);

    pointArray = new google.maps.MVCArray(heatMapData);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.setMap(map);
    if(heatMapSettings.radius == null){
        heatMapSettings.radius = (document.getElementById("radiusSlider").value)*1
    }
    heatmap.set('radius', heatMapSettings.radius);
}

function check_bounds(){
        var ok = true;

        if (map.getBounds() === undefined)
            ok = false;

        if (! ok) 
            setTimeout(check_bounds, 100);
        else {
             return
        }   
    }

function generateHeatMapData(json) {
    var median = getMedian(json);

    for (i = 0; i < json.length-1; i++){
          //  console.log(mapBounds.longitudeLow + " < " + json[i].lon + " < " + mapBounds.longitudeHigh + " && " + mapBounds.latitudeLow  + " < " + json[i].lon + " < " + mapBounds.latitudeHigh)

        if(!((mapBounds.longitudeLow < json[i].lon && json[i].lon < mapBounds.longitudeHigh) && (mapBounds.latitudeLow < json[i].lat && json[i].lat < mapBounds.latitudeHigh))){
            
            continue;
        }
        longitude = json[i].lat;
        latitude = json[i].lon;
        triggers_per_hour = json[i].triggers;
        if(triggers_per_hour > median*7) {
            triggers_per_hour = median*7;
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

function mapViewChanged() {
    heatMapInit();
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

function changeRadius(r) {
      heatmap.set('radius', r*1);
      heatMapSettings.radius = r*1;
}

google.maps.event.addDomListener(window, 'load', initialize);