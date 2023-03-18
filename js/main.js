
// leafletkaart 
var leafletkaart = L.map('leafletkaart').setView([-41.67296, 173.22505], 3);
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
    // pinpoint leafletkaart
}).addTo(leafletkaart);
var marker = L.marker([-41.67296, 173.22505]).addTo(leafletkaart);
var popup = marker.bindPopup('<b>NEW ZEALAND</b><br'); 



// navigatie responsive maken
 function myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") { x.className += " responsive"; } else {
        x.className = "topnav"; }
    };
 

// openlayerskaart 

// extra laag toevoegen aan leafletkaart
let mijnGeojsonlaag = L.geoJSON().addTo(leafletkaart);


let woonplaatsen = [ 'Amersfoort', 'Almere', 'Soesterberg']
let woonplaatsNaam = woonplaatsen[1];

for (let i = 0; i < woonplaatsen.length; i++) {
    const element = woonplaatsen[i];
var mijnButton = document.createElement("button");
let textnode = document.createTextNode(woonplaatsen[i]);
mijnButton.appendChild(textnode);
mijnButton.onclick = function(){vraagWoonplaatsOp(woonplaatsen[i])}
document.getElementById('knopjes').appendChild(mijnButton);
}

function vraagWoonplaatsOp(woonplaatsNaam){
    console.log('Test')
    // met de free service een ID ophalen
fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${woonplaatsNaam}&rows=10`)
.then(response => response.json())
.then(data => { 
    // pak het id nr van het eerste object dat terug komt
    console.log(data.response.docs[0].id); 
    let id = data.response.docs[0].id

    // vraag de data op en zet op de kaart HIER GAAT HET FOUT, TEKENDATAOOPKAART IS NOG NIET GEDEFINIEERD! 
    tekenDataOpKaart(id)

})
}


// function tekenDataOpKaart(woonplaatsId){
//   console.log(woonplaatsId)
//     const mijneersteAPIrequest = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=${woonplaatsId}&wt=json&fl=*`
//      console.log( mijneersteAPIrequest)
//     fetch(mijneersteAPIrequest)    
//      .then(response => response.json())    
//      .then(data => {   
//          console.log(data)        
//         //  console.log(data.response.docs[0].geometrie_ll)    
//         //  let = geojsonFeature = Terraformer.wktToGeoJSON(data.response.docs[0].geometrie_ll)    
//         //  mijnGeojsonLaag.addData(geojsonFeature);    
//         //  let centerCoordinates = Terraformer.wktToGeoJSON (data.response.docs[0].centroide_ll)    
//         //  console.log(centerCoordinates)    
//         //  leafletkaart.flyTo(centerCoordinates.coordinates.reverse())   
//      })
//  }