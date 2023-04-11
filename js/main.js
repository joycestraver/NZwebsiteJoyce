
// leafletkaart 
var leafletkaart = L.map('leafletkaart', { scrollWheelZoom: false}).setView([52.0603, 5.3846], 6);
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
    // pinpoint leafletkaart
}).addTo(leafletkaart);



// leafletkaart 2
var leafletkaart2 = L.map('leafletkaart2', { scrollWheelZoom: false}).setView([-41.67296, 173.22505], 3);
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
    // pinpoint leafletkaart
}).addTo(leafletkaart2);
var marker = L.marker([-41.67296, 173.22505]).addTo(leafletkaart2);
var popup = marker.bindPopup('<b>NIEUW ZEELAND</b><br');


// icoon leaflet kaart veranderen naar een huisje
var myIcon = L.icon({
    iconUrl: './img/home.png',
    iconSize: [50],
    iconAnchor: [22, 40],
});
var marker = L.marker([52.10083, 5.64611], { icon: myIcon }).addTo(leafletkaart);
var popup = marker.bindPopup('<b>NEDERLAND</b><br');




// // geoserver laag toevoegen aan leafletkaart
// L.tilelayer.wms('http://localhost:8080/geoserver/ows', {
//     'layers': 'hgav03:gemeente_2021_v1',
//     'styles': 'polygon',
//     'srs': 'EPSG:28992',
//     'format':'image/png',
//     'opacity': 0.5
// }) .addTo(leafletkaart2);



// navigatie responsive maken
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") { x.className += " responsive"; } else {
        x.className = "topnav";
    }
};



// maplibre
var start = [173.22505, -41.67296];
var end = [175.112792, -36.797887];
var end2 = [175.6111, -40.3564];
var maplibre = new maplibregl.Map({
    container: 'maplibre',
    style: 'https://api.maptiler.com/maps/21c132e6-5181-4de4-b3f4-8c1b2d404fe6/style.json?key=qKtcRYe4hlIkankR99EG', // stylesheet location
    center: start,
    zoom: 4
});

maplibre.scrollZoom.disable();
maplibre.addControl(new maplibregl.NavigationControl());

var isAtStart = true;
document.getElementById('fly').addEventListener('click', function () {
    var target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    maplibre.flyTo({
        center: target,
        zoom: 9,
        bearing: 0,
        speed: 1.5,
        curve: 1,
        easing: function (t) {
            return t;
        },
        essential: true
    });
});

// nog een fly to knop om naar palmerston te gaan 
var isAtStart = true;
document.getElementById('fly2').addEventListener('click', function () {
    var target = isAtStart ? end2 : start;
    isAtStart = !isAtStart;
    maplibre.flyTo({
        center: target,
        zoom: 9,
        bearing: 0,
        speed: 1.5,
        curve: 1,
        easing: function (t) {
            return t;
        },
        essential: true
    });
});

// nog een fly to knop om terug te gaan 
var isAtStart = true;
document.getElementById('fly3').addEventListener('click', function () {
    var target = isAtStart ? start : end;
    isAtStart = !isAtStart;
    maplibre.flyTo({
        center: target,
        zoom: 4,
        bearing: 0,
        speed: 1.5,
        curve: 1,
        easing: function (t) {
            return t;
        },
        essential: true
    });
});



//extra laag toevoegen aan maplibre kaart
maplibre.on('load', function () {
    maplibre.addSource('waiheke', {
        type: 'geojson',
        data: './data/Waiheke_Island.geojson'
    });

    maplibre.addLayer({
        'id': 'waiheke',
        'type': 'line',
        'source': 'waiheke',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#97A8C3',
            'line-width': 6
        }
    });
});


//nog een extra laag toevoegen aan maplibre kaart
maplibre.on('load', function () {
    maplibre.addSource('palmerston', {
        type: 'geojson',
        data: './data/palmerston.geojson'
    });

    maplibre.addLayer({
        'id': 'palmerston',
        'type': 'line',
        'source': 'palmerston',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#97A8C3',
            'line-width': 6
        }
    });
});

// maplibre 2
var topo = new maplibregl.Map({
    container: 'topo',
    style: 'https://api.maptiler.com/maps/21c132e6-5181-4de4-b3f4-8c1b2d404fe6/style.json?key=qKtcRYe4hlIkankR99EG', // stylesheet location
    center: start,
    zoom: 4,
    center: [173.22505, -41.67296]
});


topo.on('load', function () {
    topo.addSource('wms', {
        'type': 'raster',
        'tiles': [
            'https://maps.scinfo.org.nz/cached/?LAYERS=lri_phys_sustain&FORMAT=png8&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256
    });
    topo.addLayer(
        {
            'id': 'wms',
            'type': 'raster',
            'source': 'wms',
            'paint': {}
        },
        'aeroway_fill'
    );
});

topo.scrollZoom.disable();
topo.addControl(new maplibregl.NavigationControl());

// legenda nog toevoegen: https://maps.scinfo.org.nz/lri/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=lri_phys_sustain&FORMAT=png8

// https://maps.scinfo.org.nz/cached/?request=getCapabilities&service=wms



// extra laag toevoegen aan openlayerskaart door geojson bestand
const openlayers2 = new ol.Map({
    target: 'openlayers2',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                url: './data/map4.geojson',
                format: new ol.format.GeoJSON(),
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([173.22505, -41.67296]),
        zoom: 5,
        scrollWheelZoom: false
    }),
});


//Kleur openlayers kaart veranderen
openlayers2.on('postcompose', function (e) {
    let kaarten2 = document.querySelector("#openlayers2").style.filter = 'grayscale(100%) invert(100%)';
});




// arcgis kaart
require([
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend",
    "esri/widgets/Legend"
], function (esriConfig, WebMap, MapView, ScaleBar, Legend) {
    esriConfig.apiKey = "AAPKf3f5d54938c94eb3a75eda1e5eb8f9bdGRuEKfaviyDtEDl0TM4D4ZZF4zcMDL5RLnFt94rG7eJsM566phL0TNODM-0-Z6I9";
    const hoogtekaart2 = new WebMap({
        portalItem: {
            id: "b5d84179338f4d3290a1486d81f8483b"
        }
    });
    const view = new MapView({
        container: "hoogtekaart2",
        map: hoogtekaart2,
        zoom: 5,
        navigation: {
            mouseWheelZoomEnabled: false,
            browserTouchPanEnabled: false
          }
    });
    const legend = new Legend({
        view: view
    });
    view.ui.add(legend, "bottom-left");
});



// extra laag toevoegen aan leafletkaart
let mijnGeojsonlaag = L.geoJSON().addTo(leafletkaart);


let woonplaatsen = ['Heino', 'Nieuwveen', 'Roelofarendsveen']
let woonplaatsNaam = woonplaatsen[1];

for (let i = 0; i < woonplaatsen.length; i++) {
    const element = woonplaatsen[i];
    var mijnButton = document.createElement("button");
    mijnButton.className = "mijnknopjes"
    let textnode = document.createTextNode(woonplaatsen[i]);
    mijnButton.appendChild(textnode);
    mijnButton.onclick = function () { vraagWoonplaatsOp(woonplaatsen[i]) }
    document.getElementById('knopjes').appendChild(mijnButton);
}

function vraagWoonplaatsOp(woonplaatsNaam) {
    console.log('Test')
    // met de free service een ID ophalen
    fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${woonplaatsNaam}&rows=10`)
        .then(response => response.json())
        .then(data => {
            // pak het id nr van het eerste object dat terug komt
            console.log(data.response.docs[0].id);
            let id = data.response.docs[0].id

            // vraag de data op en zet op de kaart 
            tekenDataOpKaart(id)

        })
};


function tekenDataOpKaart(woonplaatsId) {
    console.log(woonplaatsId)
    const mijneersteAPIrequest = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=${woonplaatsId}&wt=json&fl=*`
    console.log(mijneersteAPIrequest)
    fetch(mijneersteAPIrequest)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.response.docs[0].geometrie_ll)
            let = geojsonFeature = Terraformer.wktToGeoJSON(data.response.docs[0].geometrie_ll)
            mijnGeojsonlaag.addData(geojsonFeature);
            let centerCoordinates = Terraformer.wktToGeoJSON(data.response.docs[0].centroide_ll)
            console.log(centerCoordinates)
            leafletkaart.flyTo(centerCoordinates.coordinates.reverse(), 12)
        })
};

