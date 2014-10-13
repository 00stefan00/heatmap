

function initialize() {

}




function generateHeatMapData(json) {
    var median = getMedian(json);

    for (i = 0; i < json.length-1; i++){

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

initialize();