

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
};
var view = "Normal";
var dataArray = [];
var loop = 0;
var loopin = false;

function initialize() {
    var hoogeveen = new google.maps.LatLng(52.73400225036641, 6.47296751087904);
    var hoogkerk = new google.maps.LatLng(53.1982171153152, 6.512751840054989);
    var nijmegen = new google.maps.LatLng(51.82730272563614, 5.824586860835552);

    var mapOptions = {
        zoom: 10,
        center: hoogeveen,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    dataArray.push(triggers_0); 
    dataArray.push(triggers_1); 
    dataArray.push(triggers_2);
    dataArray.push(triggers_3);
    dataArray.push(triggers_4);
    dataArray.push(triggers_5);
    dataArray.push(triggers_6);
    dataArray.push(triggers_7);
    dataArray.push(triggers_8);
    dataArray.push(triggers_9);
    dataArray.push(triggers_10);
    dataArray.push(triggers_11);
    dataArray.push(triggers_12);
    dataArray.push(triggers_13);
    dataArray.push(triggers_14);
    dataArray.push(triggers_15);
    dataArray.push(triggers_16);
    dataArray.push(triggers_17);
    dataArray.push(triggers_18);
    dataArray.push(triggers_19);
    dataArray.push(triggers_20);
    dataArray.push(triggers_21);
    dataArray.push(triggers_22);
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    google.maps.event.addListener(map, 'dragend', mapViewChanged);
    google.maps.event.addListener(map, 'zoom_changed', mapViewChanged);

    // heatMapInit();
}

function heatMapInit(){
    heatMapData = []

    if(map.getBounds() != undefined){
        mapBounds.latitudeLow = map.getBounds().va.j;
        mapBounds.latitudeHigh = map.getBounds().va.k;
        mapBounds.longitudeLow = map.getBounds().Ea.k;
        mapBounds.longitudeHigh = map.getBounds().Ea.j;
    }

    generateHeatMapData()

    pointArray = new google.maps.MVCArray(heatMapData);

    if (heatmap == undefined) {
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });
        heatmap.setMap(map);
    }
    else{
        heatmap.setData(pointArray);
    }

    if(heatMapSettings.radius == null){
        heatMapSettings.radius = (document.getElementById("radiusSlider").value)*1
    }
    heatmap.set('radius', heatMapSettings.radius);    
}

function generateHeatMapData(){
        console.log(loop);
    
    if(view == "Normal"){
        //addHeatmapData(triggers_nijmegen);
        addHeatmapData(triggers_hoogeveen);
        //addHeatmapData(triggers_hoogkerk);
    }
    if(view == "Loop"){
        if (dataArray[loop] == undefined){
            loopIt();
            loop = 0;
            return
        }
        addHeatmapData(dataArray[loop]);
    }
}

function addHeatmapData(json) {
    var median = getMedian(json);
    // https://blogs.oracle.com/greimer/entry/best_way_to_code_a
    var i = json.length-1
    while(i--){
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

function loopIt() {
    if(loopin){
        loopin = false;
        window.clearInterval(interval);
    }else{
        loopin = true;
        interval = setInterval(function () {playData()}, 2500);
    }
        
}

function playData() {
    var oldView = view;
    view = "Loop";  
    
    loop += 1;
    heatMapInit();
    view = oldView;  
}

google.maps.event.addDomListener(window, 'load', initialize);