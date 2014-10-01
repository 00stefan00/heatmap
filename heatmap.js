
//
//      Heatmap javascript
//
//
var heatLayer;

function initialize() {
    var map = getMap(getMapOptions());
    heatLayer = getNewHeatLayer(map);
}

function getMapOptions() {
    var mapOptions = {
            center: new google.maps.LatLng(52.73400225036641, 6.47296751087904),
            zoom: 18,
            minZoom: 14,
            maxZoom: 20
        };
    
    return mapOptions;
}

function getMap() {
    return new google.maps.Map(document.getElementById("map-canvas"), getMapOptions());
}

function getNewHeatLayer(map) {
    if(heatLayer == undefined){
        heatLayer = createHeatLayer(map, getData());
        return heatLayer;
    }
    else{
        return heatLayer;
    }
}
    

function createHeatLayer(map, data){
    heatmap = new HeatmapOverlay(map,
        {
            "radius": 0.00020,
            "scaleRadius": true,
            // "radius": 50,
            // "scaleRadius": false,
            "maxOpacity": 25,
            "useLocalExtrema": false,
            latField: 'lat',
            lngField: 'lon',
            valueField: 'triggers'
        }
    );

    heatmap.setData(data);
}

function getData() {
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

var json = [
    {
        "lat": 6.473382711410522,
        "lon": 52.73406342189094,
        "triggers": 40
    },
    {
        "lat": 6.473531574010849,
        "lon": 52.73416675632591,
        "triggers": 44
    },
    {
        "lat": 6.473712623119354,
        "lon": 52.73426318804346,
        "triggers": 30
    },
    {
        "lat": 6.473852097988129,
        "lon": 52.73434439353482,
        "triggers": 26
    },
    {
        "lat": 6.474002301692963,
        "lon": 52.73444021582007,
        "triggers": 22
    },
    {
        "lat": 6.47418200969696,
        "lon": 52.73455390300384,
        "triggers": 26
    },
    {
        "lat": 6.474342942237854,
        "lon": 52.73466109350564,
        "triggers": 23
    },
    {
        "lat": 6.474533379077911,
        "lon": 52.73476503555864,
        "triggers": 23
    },
    {
        "lat": 6.474670171737671,
        "lon": 52.73486248100835,
        "triggers": 26
    },
    {
        "lat": 6.474798917770386,
        "lon": 52.73493069269349,
        "triggers": 17
    },
    {
        "lat": 6.473209708929062,
        "lon": 52.73372438577682,
        "triggers": 106
    },
    {
        "lat": 6.47324625402689,
        "lon": 52.73362308046236,
        "triggers": 71
    },
    {
        "lat": 6.473118849098682,
        "lon": 52.73365089376857,
        "triggers": 85
    },
    {
        "lat": 6.475340723991394,
        "lon": 52.73508376257465,
        "triggers": 20
    },
    {
        "lat": 6.475204937160015,
        "lon": 52.73498022730271,
        "triggers": 24
    },
    {
        "lat": 6.475069485604763,
        "lon": 52.73489536879844,
        "triggers": 27
    },
    {
        "lat": 6.474956162273884,
        "lon": 52.73481741251491,
        "triggers": 25
    },
    {
        "lat": 6.474791876971722,
        "lon": 52.73470413204203,
        "triggers": 27
    },
    {
        "lat": 6.474633626639843,
        "lon": 52.73462739348991,
        "triggers": 22
    },
    {
        "lat": 6.474498510360718,
        "lon": 52.73454436141231,
        "triggers": 24
    },
    {
        "lat": 6.474342606961727,
        "lon": 52.73444204293775,
        "triggers": 22
    },
    {
        "lat": 6.474203132092953,
        "lon": 52.73436753707212,
        "triggers": 34
    },
    {
        "lat": 6.472987420856953,
        "lon": 52.7336230804622,
        "triggers": 83
    },
    {
        "lat": 6.472734287381172,
        "lon": 52.73345295196947,
        "triggers": 60
    },
    {
        "lat": 6.472586765885353,
        "lon": 52.73335022489694,
        "triggers": 35
    },
    {
        "lat": 6.472858339548111,
        "lon": 52.7333412920966,
        "triggers": 50
    },
    {
        "lat": 6.472463048994541,
        "lon": 52.73327835641834,
        "triggers": 31
    },
    {
        "lat": 6.472315192222595,
        "lon": 52.73319491572092,
        "triggers": 29
    },
    {
        "lat": 6.471942365169525,
        "lon": 52.73296672188872,
        "triggers": 10
    },
    {
        "lat": 6.474951133131981,
        "lon": 52.73501230296226,
        "triggers": 14
    },
    {
        "lat": 6.472423486411572,
        "lon": 52.73344361315469,
        "triggers": 23
    },
    {
        "lat": 6.471843793988228,
        "lon": 52.73308569142001,
        "triggers": 19
    },
    {
        "lat": 6.471692249178886,
        "lon": 52.73300225036641,
        "triggers": 14
    },
    {
        "lat": 6.47196751087904,
        "lon": 52.73317177156114,
        "triggers": 10
    },
    {
        "lat": 6.472108326852322,
        "lon": 52.73326109982962,
        "triggers": 22
    },
    {
        "lat": 6.472248807549477,
        "lon": 52.73335611242349,
        "triggers": 20
    },
    {
        "lat": 6.4726672321558,
        "lon": 52.733565423625,
        "triggers": 48
    },
    {
        "lat": 6.472744010388851,
        "lon": 52.73361455375171,
        "triggers": 102
    },
    {
        "lat": 6.472709812223911,
        "lon": 52.73364175801294,
        "triggers": 107
    },
    {
        "lat": 6.472850292921066,
        "lon": 52.73371728020136,
        "triggers": 71
    },
    {
        "lat": 6.472897231578827,
        "lon": 52.73376904936777,
        "triggers": 7
    },
    {
        "lat": 6.472945846617222,
        "lon": 52.73373534866254,
        "triggers": 71
    },
    {
        "lat": 6.473082639276981,
        "lon": 52.73382264561662,
        "triggers": 48
    },
    {
        "lat": 6.47304005920887,
        "lon": 52.73385005276381,
        "triggers": 13
    },
    {
        "lat": 6.473184563219547,
        "lon": 52.73389349813227,
        "triggers": 51
    },
    {
        "lat": 6.473140977323055,
        "lon": 52.73391217556703,
        "triggers": 10
    },
    {
        "lat": 6.473251953721046,
        "lon": 52.73376458301076,
        "triggers": 73
    },
    {
        "lat": 6.473328396677971,
        "lon": 52.73381107370476,
        "triggers": 67
    },
    {
        "lat": 6.473399139940739,
        "lon": 52.73385756434934,
        "triggers": 56
    },
    {
        "lat": 6.473479941487312,
        "lon": 52.7339022278037,
        "triggers": 61
    },
    {
        "lat": 6.473563089966774,
        "lon": 52.73395663595012,
        "triggers": 52
    },
    {
        "lat": 6.473628133535385,
        "lon": 52.73400129930299,
        "triggers": 54
    },
    {
        "lat": 6.473706588149071,
        "lon": 52.73405570732593,
        "triggers": 32
    },
    {
        "lat": 6.473792754113674,
        "lon": 52.73410118263621,
        "triggers": 42
    },
    {
        "lat": 6.473848074674606,
        "lon": 52.73413894334883,
        "triggers": 35
    },
    {
        "lat": 6.473910436034203,
        "lon": 52.73417406484255,
        "triggers": 26
    },
    {
        "lat": 6.47207111120224,
        "lon": 52.73303859089363,
        "triggers": 44
    },
    {
        "lat": 6.472302787005901,
        "lon": 52.7328948527655,
        "triggers": 171
    },
    {
        "lat": 6.471895761787891,
        "lon": 52.7328656178337,
        "triggers": 285
    },
    {
        "lat": 6.472486853599548,
        "lon": 52.73308569142011,
        "triggers": 937
    },
    {
        "lat": 6.472730934619904,
        "lon": 52.73325135492006,
        "triggers": 1337
    },
    {
        "lat": 6.472398340702057,
        "lon": 52.73314253676931,
        "triggers": 366
    },
    {
        "lat": 6.472159624099731,
        "lon": 52.73298336955546,
        "triggers": 878
    },
    {
        "lat": 6.472135484218597,
        "lon": 52.73299473869543,
        "triggers": 38
    },
    {
        "lat": 6.472237408161163,
        "lon": 52.73294114132276,
        "triggers": 558
    },
    {
        "lat": 6.47258073091507,
        "lon": 52.73302884594843,
        "triggers": 1066
    }
];


google.maps.event.addDomListener(window, 'load', initialize);/**
 * Created by Stefan Strijker on 9/30/2014.
 */
