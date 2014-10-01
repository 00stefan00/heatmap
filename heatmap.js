
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
            center: new google.maps.LatLng(51.82968767262394, 5.82224328070879),
            zoom: 15,
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
            "radius": 0.00070,
            "scaleRadius": true,
            // "radius": 50,
            // "scaleRadius": false,
            "maxOpacity": 25,
            "useLocalExtrema": false,
            latField: 'lon',
            lngField: 'lat',
            valueField: 'triggers'
        }
    );

    heatmap.setData(data);
}

function getData() {
    jsonData = []
    dataMax = getMedian(json)*9;
    for (i = 0; i < json.length-1; i++){
        
        longitude = json[i].lon
        latitude = json[i].lat
        triggers_per_hour = json[i].triggers

        if(triggers_per_hour > dataMax){
            triggers_per_hour = dataMax;
        }

        jsonData.push({lon:longitude, lat:latitude, triggers:triggers_per_hour})
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
     return data[Math.round(json.length/2)];
}

var json = [
    {
        "lat": 5.825167894363403,
        "lon": 51.82756277593867,
        "triggers": 602
    },
    {
        "lat": 5.825597047805786,
        "lon": 51.82712846001199,
        "triggers": 1198
    },
    {
        "lat": 5.825709700584412,
        "lon": 51.82700578986968,
        "triggers": 808
    },
    {
        "lat": 5.825806260108948,
        "lon": 51.82689306566058,
        "triggers": 687
    },
    {
        "lat": 5.815863646566868,
        "lon": 51.83533168193748,
        "triggers": 499
    },
    {
        "lat": 5.815936401486397,
        "lon": 51.83535488553782,
        "triggers": 455
    },
    {
        "lat": 5.816103704273701,
        "lon": 51.83512719969251,
        "triggers": 427
    },
    {
        "lat": 5.816180482506752,
        "lon": 51.83515351103573,
        "triggers": 450
    },
    {
        "lat": 5.816356837749481,
        "lon": 51.83489806245497,
        "triggers": 483
    },
    {
        "lat": 5.81641249358654,
        "lon": 51.83491795144854,
        "triggers": 506
    },
    {
        "lat": 5.816597230732441,
        "lon": 51.8346871557229,
        "triggers": 414
    },
    {
        "lat": 5.816655233502388,
        "lon": 51.83471118836755,
        "triggers": 983
    },
    {
        "lat": 5.816841647028923,
        "lon": 51.83446858237966,
        "triggers": 425
    },
    {
        "lat": 5.816904678940773,
        "lon": 51.8344919936043,
        "triggers": 1065
    },
    {
        "lat": 5.817134343087673,
        "lon": 51.83428481420653,
        "triggers": 333
    },
    {
        "lat": 5.817068293690681,
        "lon": 51.83426347466835,
        "triggers": 579
    },
    {
        "lat": 5.817241631448269,
        "lon": 51.83409980220027,
        "triggers": 437
    },
    {
        "lat": 5.817293599247932,
        "lon": 51.83412259207429,
        "triggers": 396
    },
    {
        "lat": 5.81753097474575,
        "lon": 51.83384123991306,
        "triggers": 455
    },
    {
        "lat": 5.817594341933727,
        "lon": 51.83386340837329,
        "triggers": 411
    },
    {
        "lat": 5.817762650549412,
        "lon": 51.83362659893955,
        "triggers": 495
    },
    {
        "lat": 5.817824006080627,
        "lon": 51.83365083933264,
        "triggers": 309
    },
    {
        "lat": 5.817986279726028,
        "lon": 51.833419001194,
        "triggers": 459
    },
    {
        "lat": 5.818058028817177,
        "lon": 51.83344427761745,
        "triggers": 446
    },
    {
        "lat": 5.818207897245884,
        "lon": 51.83320062887709,
        "triggers": 274
    },
    {
        "lat": 5.818281322717667,
        "lon": 51.83322963474988,
        "triggers": 388
    },
    {
        "lat": 5.818290039896965,
        "lon": 51.8329097403953,
        "triggers": 476
    },
    {
        "lat": 5.818480141460896,
        "lon": 51.83270939089478,
        "triggers": 515
    },
    {
        "lat": 5.818702094256878,
        "lon": 51.83247174663978,
        "triggers": 563
    },
    {
        "lat": 5.818956568837166,
        "lon": 51.83226393638117,
        "triggers": 897
    },
    {
        "lat": 5.818962939083576,
        "lon": 51.83243196648581,
        "triggers": 397
    },
    {
        "lat": 5.819244906306267,
        "lon": 51.83218085344707,
        "triggers": 549
    },
    {
        "lat": 5.81930860877037,
        "lon": 51.83243010178847,
        "triggers": 1185
    },
    {
        "lat": 5.818880796432495,
        "lon": 51.83285877256137,
        "triggers": 676
    },
    {
        "lat": 5.818639732897282,
        "lon": 51.8330620219944,
        "triggers": 420
    },
    {
        "lat": 5.819743797183037,
        "lon": 51.83154892087396,
        "triggers": 516
    },
    {
        "lat": 5.81995502114296,
        "lon": 51.83127584038721,
        "triggers": 756
    },
    {
        "lat": 5.820179991424084,
        "lon": 51.831080249091,
        "triggers": 596
    },
    {
        "lat": 5.820358358323574,
        "lon": 51.83087284680596,
        "triggers": 641
    },
    {
        "lat": 5.820534713566303,
        "lon": 51.83062255386149,
        "triggers": 664
    },
    {
        "lat": 5.820740908384323,
        "lon": 51.83033454949886,
        "triggers": 545
    },
    {
        "lat": 5.820883736014366,
        "lon": 51.83008798314383,
        "triggers": 672
    },
    {
        "lat": 5.821040309965611,
        "lon": 51.82988057628869,
        "triggers": 516
    },
    {
        "lat": 5.821161679923534,
        "lon": 51.82956293735585,
        "triggers": 208
    },
    {
        "lat": 5.821326300501823,
        "lon": 51.82930041217321,
        "triggers": 202
    },
    {
        "lat": 5.821494273841381,
        "lon": 51.82901384978332,
        "triggers": 849
    },
    {
        "lat": 5.821753442287445,
        "lon": 51.82879276244184,
        "triggers": 452
    },
    {
        "lat": 5.822086706757545,
        "lon": 51.82833400792626,
        "triggers": 572
    },
    {
        "lat": 5.821479186415672,
        "lon": 51.82949124555175,
        "triggers": 461
    },
    {
        "lat": 5.821662247180939,
        "lon": 51.82922312546101,
        "triggers": 422
    },
    {
        "lat": 5.822070948779583,
        "lon": 51.82866160139743,
        "triggers": 300
    },
    {
        "lat": 5.822465568780899,
        "lon": 51.82815850304353,
        "triggers": 378
    },
    {
        "lat": 5.822691544890404,
        "lon": 51.82783815824736,
        "triggers": 274
    },
    {
        "lat": 5.823165625333786,
        "lon": 51.82724947212235,
        "triggers": 325
    },
    {
        "lat": 5.823433175683022,
        "lon": 51.82697408621431,
        "triggers": 330
    },
    {
        "lat": 5.823723860085011,
        "lon": 51.8266910316754,
        "triggers": 2398
    },
    {
        "lat": 5.824046395719051,
        "lon": 51.82643118355632,
        "triggers": 560
    },
    {
        "lat": 5.824399441480637,
        "lon": 51.82616884733172,
        "triggers": 395
    },
    {
        "lat": 5.825954787433147,
        "lon": 51.82510145883399,
        "triggers": 296
    },
    {
        "lat": 5.825108885765076,
        "lon": 51.82566841498852,
        "triggers": 385
    },
    {
        "lat": 5.825544744729996,
        "lon": 51.82539633494667,
        "triggers": 415
    },
    {
        "lat": 5.824741087853909,
        "lon": 51.82594007895028,
        "triggers": 219
    },
    {
        "lat": 5.826170705258846,
        "lon": 51.82493029303706,
        "triggers": 257
    },
    {
        "lat": 5.826388970017433,
        "lon": 51.82469737388617,
        "triggers": 311
    },
    {
        "lat": 5.826707482337952,
        "lon": 51.82445139835091,
        "triggers": 204
    },
    {
        "lat": 5.82594808191061,
        "lon": 51.82486543222011,
        "triggers": 283
    },
    {
        "lat": 5.826197192072868,
        "lon": 51.8246277465752,
        "triggers": 590
    },
    {
        "lat": 5.826515033841133,
        "lon": 51.82433721716993,
        "triggers": 401
    },
    {
        "lat": 5.826700106263161,
        "lon": 51.8240410907623,
        "triggers": 345
    },
    {
        "lat": 5.826878808438778,
        "lon": 51.82380961761027,
        "triggers": 236
    },
    {
        "lat": 5.82724928855896,
        "lon": 51.8236276710044,
        "triggers": 200
    },
    {
        "lat": 5.827395133674145,
        "lon": 51.82337422933254,
        "triggers": 255
    },
    {
        "lat": 5.827990584075451,
        "lon": 51.82022339323823,
        "triggers": 195
    },
    {
        "lat": 5.827926211059093,
        "lon": 51.8231093885421,
        "triggers": 200
    },
    {
        "lat": 5.827935263514519,
        "lon": 51.82343743447078,
        "triggers": 285
    },
    {
        "lat": 5.827947668731213,
        "lon": 51.82369087577305,
        "triggers": 160
    },
    {
        "lat": 5.827929228544235,
        "lon": 51.82396752511759,
        "triggers": 228
    },
    {
        "lat": 5.827883295714855,
        "lon": 51.82424437998905,
        "triggers": 120
    },
    {
        "lat": 5.827803499996662,
        "lon": 51.82447460755723,
        "triggers": 201
    },
    {
        "lat": 5.82769051194191,
        "lon": 51.82476845165505,
        "triggers": 239
    },
    {
        "lat": 5.827346853911877,
        "lon": 51.82493837472981,
        "triggers": 209
    },
    {
        "lat": 5.827156417071819,
        "lon": 51.82522910747952,
        "triggers": 68
    },
    {
        "lat": 5.826770514249802,
        "lon": 51.82557993216962,
        "triggers": 424
    },
    {
        "lat": 5.826471783220768,
        "lon": 51.82583273976228,
        "triggers": 320
    },
    {
        "lat": 5.826127454638481,
        "lon": 51.8261553782109,
        "triggers": 362
    },
    {
        "lat": 5.825842469930649,
        "lon": 51.82641129081554,
        "triggers": 355
    },
    {
        "lat": 5.825533010065556,
        "lon": 51.82670968100441,
        "triggers": 354
    },
    {
        "lat": 5.825196728110313,
        "lon": 51.82700910528324,
        "triggers": 190
    },
    {
        "lat": 5.824891626834869,
        "lon": 51.82730272563614,
        "triggers": 64
    },
    {
        "lat": 5.824586860835552,
        "lon": 51.82758950612346,
        "triggers": 292
    },
    {
        "lat": 5.824338085949421,
        "lon": 51.82781080658101,
        "triggers": 432
    },
    {
        "lat": 5.824034996330738,
        "lon": 51.82807354765976,
        "triggers": 172
    },
    {
        "lat": 5.82377951592207,
        "lon": 51.82832634125731,
        "triggers": 195
    },
    {
        "lat": 5.82345362752676,
        "lon": 51.828608556696,
        "triggers": 293
    },
    {
        "lat": 5.822947695851326,
        "lon": 51.82904803845052,
        "triggers": 120
    },
    {
        "lat": 5.823366455733776,
        "lon": 51.82891542771753,
        "triggers": 510
    },
    {
        "lat": 5.822860524058342,
        "lon": 51.82934827599566,
        "triggers": 585
    },
    {
        "lat": 5.822487697005272,
        "lon": 51.82968767262394,
        "triggers": 898
    },
    {
        "lat": 5.82224328070879,
        "lon": 51.82987995469095,
        "triggers": 593
    },
    {
        "lat": 5.821998193860054,
        "lon": 51.83010808147004,
        "triggers": 593
    },
    {
        "lat": 5.821735672652721,
        "lon": 51.83032709036139,
        "triggers": 457
    },
    {
        "lat": 5.821469128131866,
        "lon": 51.83056350275904,
        "triggers": 413
    },
    {
        "lat": 5.821224711835384,
        "lon": 51.83078209505764,
        "triggers": 608
    },
    {
        "lat": 5.820950455963612,
        "lon": 51.83101809067082,
        "triggers": 864
    },
    {
        "lat": 5.820697322487831,
        "lon": 51.83122880739616,
        "triggers": 840
    },
    {
        "lat": 5.820500515401363,
        "lon": 51.83140512907963,
        "triggers": 465
    },
    {
        "lat": 5.820154175162315,
        "lon": 51.83169913515896,
        "triggers": 187
    },
    {
        "lat": 5.819885954260826,
        "lon": 51.83175362656275,
        "triggers": 324
    },
    {
        "lat": 5.819534249603748,
        "lon": 51.83205985458566,
        "triggers": 392
    },
    {
        "lat": 5.824175477027893,
        "lon": 51.82822584561185,
        "triggers": 203
    },
    {
        "lat": 5.823880434036255,
        "lon": 51.82849107074805,
        "triggers": 407
    },
    {
        "lat": 5.828345976769924,
        "lon": 51.81938964065975,
        "triggers": 202
    },
    {
        "lat": 5.82843616604805,
        "lon": 51.81916415384178,
        "triggers": 158
    },
    {
        "lat": 5.828526690602303,
        "lon": 51.81890861456735,
        "triggers": 167
    },
    {
        "lat": 5.828764401376247,
        "lon": 51.81864022423101,
        "triggers": 182
    },
    {
        "lat": 5.828806981444359,
        "lon": 51.81838095143053,
        "triggers": 200
    },
    {
        "lat": 5.828788541257381,
        "lon": 51.81800665089526,
        "triggers": 162
    },
    {
        "lat": 5.828724503517151,
        "lon": 51.81774509463359,
        "triggers": 190
    },
    {
        "lat": 5.828619562089443,
        "lon": 51.81746115307429,
        "triggers": 206
    },
    {
        "lat": 5.828506574034691,
        "lon": 51.81726633082352,
        "triggers": 262
    },
    {
        "lat": 5.828377157449722,
        "lon": 51.81706902062152,
        "triggers": 248
    },
    {
        "lat": 5.82822360098362,
        "lon": 51.8168153348068,
        "triggers": 152
    },
    {
        "lat": 5.8279724791646,
        "lon": 51.81645926031443,
        "triggers": 68
    },
    {
        "lat": 5.828081108629704,
        "lon": 51.81625614322024,
        "triggers": 309
    },
    {
        "lat": 5.828224271535873,
        "lon": 51.81647480495221,
        "triggers": 240
    },
    {
        "lat": 5.828398615121841,
        "lon": 51.81670279235782,
        "triggers": 163
    },
    {
        "lat": 5.828508920967579,
        "lon": 51.81693886173807,
        "triggers": 166
    },
    {
        "lat": 5.828635655343533,
        "lon": 51.81715233869026,
        "triggers": 185
    },
    {
        "lat": 5.828767418861389,
        "lon": 51.81738654039713,
        "triggers": 182
    },
    {
        "lat": 5.828869342803955,
        "lon": 51.81764229556045,
        "triggers": 211
    },
    {
        "lat": 5.828929021954536,
        "lon": 51.81789804927968,
        "triggers": 122
    },
    {
        "lat": 5.828966908156872,
        "lon": 51.81817121087139,
        "triggers": 189
    },
    {
        "lat": 5.828960537910461,
        "lon": 51.81850737560436,
        "triggers": 168
    },
    {
        "lat": 5.828884094953537,
        "lon": 51.81881307193592,
        "triggers": 199
    },
    {
        "lat": 5.828785188496113,
        "lon": 51.81910695296223,
        "triggers": 156
    },
    {
        "lat": 5.828750319778919,
        "lon": 51.81930280349876,
        "triggers": 173
    },
    {
        "lat": 5.82865409553051,
        "lon": 51.81950963732074,
        "triggers": 214
    },
    {
        "lat": 5.827920511364937,
        "lon": 51.8166542933158,
        "triggers": 132
    },
    {
        "lat": 5.827780701220036,
        "lon": 51.81634920412497,
        "triggers": 231
    },
    {
        "lat": 5.827760584652424,
        "lon": 51.81611313165576,
        "triggers": 296
    },
    {
        "lat": 5.827826634049416,
        "lon": 51.81609655057551,
        "triggers": 242
    },
    {
        "lat": 5.827558077871799,
        "lon": 51.81598545717988,
        "triggers": 427
    },
    {
        "lat": 5.827584229409695,
        "lon": 51.81582420545796,
        "triggers": 295
    },
    {
        "lat": 5.82742128521204,
        "lon": 51.81544864008467,
        "triggers": 568
    },
    {
        "lat": 5.827360935509205,
        "lon": 51.81523246058331,
        "triggers": 237
    },
    {
        "lat": 5.827352218329906,
        "lon": 51.81498788425004,
        "triggers": 168
    },
    {
        "lat": 5.827348195016384,
        "lon": 51.81481398552408,
        "triggers": 224
    },
    {
        "lat": 5.827404856681824,
        "lon": 51.81458287950431,
        "triggers": 183
    },
    {
        "lat": 5.827487669885159,
        "lon": 51.81436358677701,
        "triggers": 253
    },
    {
        "lat": 5.827571488916874,
        "lon": 51.81416522750252,
        "triggers": 223
    },
    {
        "lat": 5.827640555799007,
        "lon": 51.81417704202929,
        "triggers": 240
    },
    {
        "lat": 5.82772471010685,
        "lon": 51.81394137272714,
        "triggers": 184
    },
    {
        "lat": 5.827785395085812,
        "lon": 51.81395961278751,
        "triggers": 1297
    },
    {
        "lat": 5.827494375407696,
        "lon": 51.81402552567128,
        "triggers": 118
    },
    {
        "lat": 5.83050649613142,
        "lon": 51.81160844960807,
        "triggers": 156
    },
    {
        "lat": 5.827810876071453,
        "lon": 51.81583767766772,
        "triggers": 219
    },
    {
        "lat": 5.830558463931084,
        "lon": 51.81162959259017,
        "triggers": 242
    },
    {
        "lat": 5.830693580210209,
        "lon": 51.81143474512616,
        "triggers": 330
    },
    {
        "lat": 5.830751247704029,
        "lon": 51.81145568090474,
        "triggers": 165
    },
    {
        "lat": 5.827513486146927,
        "lon": 51.81504840665269,
        "triggers": 261
    },
    {
        "lat": 5.827726051211357,
        "lon": 51.81568015619531,
        "triggers": 174
    },
    {
        "lat": 5.830132663249969,
        "lon": 51.81194466330212,
        "triggers": 293
    },
    {
        "lat": 5.830174908041954,
        "lon": 51.81197409742729,
        "triggers": 231
    },
    {
        "lat": 5.827442072331905,
        "lon": 51.81490870755928,
        "triggers": 69
    },
    {
        "lat": 5.82743838429451,
        "lon": 51.81514748082132,
        "triggers": 163
    },
    {
        "lat": 5.827493369579315,
        "lon": 51.81543910582363,
        "triggers": 251
    },
    {
        "lat": 5.827665366232395,
        "lon": 51.81580658794702,
        "triggers": 164
    },
    {
        "lat": 5.827750526368618,
        "lon": 51.81595208765503,
        "triggers": 210
    },
    {
        "lat": 5.828571952879429,
        "lon": 51.81977636450522,
        "triggers": 186
    },
    {
        "lat": 5.828462317585945,
        "lon": 51.82007583487008,
        "triggers": 229
    },
    {
        "lat": 5.828343965113163,
        "lon": 51.82033406169722,
        "triggers": 751
    },
    {
        "lat": 5.828253105282784,
        "lon": 51.82059373774471,
        "triggers": 235
    },
    {
        "lat": 5.82815520465374,
        "lon": 51.82083683295939,
        "triggers": 241
    },
    {
        "lat": 5.828083455562592,
        "lon": 51.82105091316616,
        "triggers": 303
    },
    {
        "lat": 5.828028805553913,
        "lon": 51.82125566656504,
        "triggers": 189
    },
    {
        "lat": 5.828147493302822,
        "lon": 51.81354900236872,
        "triggers": 822
    },
    {
        "lat": 5.828181356191635,
        "lon": 51.81356931533958,
        "triggers": 332
    },
    {
        "lat": 5.827896371483803,
        "lon": 51.81598421359555,
        "triggers": 151
    },
    {
        "lat": 5.828016065061092,
        "lon": 51.8214753402301,
        "triggers": 172
    },
    {
        "lat": 5.827984213829041,
        "lon": 51.8217594637301,
        "triggers": 203
    },
    {
        "lat": 5.827935598790646,
        "lon": 51.82202990785308,
        "triggers": 220
    },
    {
        "lat": 5.827945992350578,
        "lon": 51.822304909513,
        "triggers": 289
    },
    {
        "lat": 5.827929228544235,
        "lon": 51.82261099455155,
        "triggers": 321
    },
    {
        "lat": 5.827924199402332,
        "lon": 51.82285594396883,
        "triggers": 304
    },
    {
        "lat": 5.82754734903574,
        "lon": 51.82303250567264,
        "triggers": 133
    },
    {
        "lat": 5.828135088086128,
        "lon": 51.81996330056518,
        "triggers": 155
    },
    {
        "lat": 5.828249417245388,
        "lon": 51.8196785439962,
        "triggers": 114
    },
    {
        "lat": 5.829811133444309,
        "lon": 51.81238534403739,
        "triggers": 304
    },
    {
        "lat": 5.830037780106068,
        "lon": 51.81220044935243,
        "triggers": 304
    },
    {
        "lat": 5.829841643571854,
        "lon": 51.81207152009851,
        "triggers": 302
    },
    {
        "lat": 5.829582810401917,
        "lon": 51.81228191089347,
        "triggers": 337
    },
    {
        "lat": 5.829259939491749,
        "lon": 51.81252152719358,
        "triggers": 283
    },
    {
        "lat": 5.830320753157139,
        "lon": 51.81177552035157,
        "triggers": 214
    },
    {
        "lat": 5.828940756618977,
        "lon": 51.81279824512467,
        "triggers": 221
    },
    {
        "lat": 5.82793090492487,
        "lon": 51.82046151660851,
        "triggers": 193
    },
    {
        "lat": 5.827828645706177,
        "lon": 51.82069922423144,
        "triggers": 114
    },
    {
        "lat": 5.827735103666782,
        "lon": 51.82099640881405,
        "triggers": 135
    },
    {
        "lat": 5.827665030956268,
        "lon": 51.82118520497442,
        "triggers": 111
    },
    {
        "lat": 5.827628150582314,
        "lon": 51.8213901650024,
        "triggers": 152
    },
    {
        "lat": 5.827603675425053,
        "lon": 51.82163035458719,
        "triggers": 158
    },
    {
        "lat": 5.827575847506523,
        "lon": 51.82186784881024,
        "triggers": 131
    },
    {
        "lat": 5.827717334032059,
        "lon": 51.82218160452824,
        "triggers": 232
    },
    {
        "lat": 5.827700234949589,
        "lon": 51.82246924655637,
        "triggers": 160
    },
    {
        "lat": 5.827641226351261,
        "lon": 51.82275398548742,
        "triggers": 163
    },
    {
        "lat": 5.829494632780552,
        "lon": 51.8126262034647,
        "triggers": 295
    },
    {
        "lat": 5.82915835082531,
        "lon": 51.81291577200152,
        "triggers": 276
    },
    {
        "lat": 5.828859284520149,
        "lon": 51.8131549703775,
        "triggers": 228
    },
    {
        "lat": 5.828482769429684,
        "lon": 51.81345365564842,
        "triggers": 348
    },
    {
        "lat": 5.830880664288998,
        "lon": 51.81126021083197,
        "triggers": 307
    },
    {
        "lat": 5.830919556319714,
        "lon": 51.81127285526316,
        "triggers": 426
    },
    {
        "lat": 5.830503813922405,
        "lon": 51.8114942358774,
        "triggers": 201
    },
    {
        "lat": 5.828606821596622,
        "lon": 51.81305361177526,
        "triggers": 276
    },
    {
        "lat": 5.830698944628239,
        "lon": 51.81131659253059,
        "triggers": 289
    },
    {
        "lat": 5.830377414822578,
        "lon": 51.81180122348794,
        "triggers": 288
    },
    {
        "lat": 5.827458165585995,
        "lon": 51.81469749994743,
        "triggers": 183
    },
    {
        "lat": 5.827568471431732,
        "lon": 51.8148345051941,
        "triggers": 252
    },
    {
        "lat": 5.828289985656738,
        "lon": 51.81331374433491,
        "triggers": 312
    },
    {
        "lat": 5.827844738960266,
        "lon": 51.81363937429126,
        "triggers": 1407
    }
];


google.maps.event.addDomListener(window, 'load', initialize);/**
 * Created by Stefan Strijker on 9/30/2014.
 */