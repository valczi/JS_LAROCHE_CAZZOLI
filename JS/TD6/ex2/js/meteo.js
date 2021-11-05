let infoTemp = $('#temp');
//document.getElementById("temp");
let infoFelt = $('#felt');
let infoMin =  $('#min');
let infoMax =  $('#max');
let infoTime =  $('#time');
let infoHumidity =  $('#humidity');
let titre =  $('#ville');
let commune = JSON.parse(localStorage.getItem("CommuneChoisis"));

let mymap = L.map('mapid').setView([10,10],13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmFsY3ppIiwiYSI6ImNrdXp0dDljZTJiZGQyb28wbmw4cXd6Y2MifQ.weSy4AQF_66BX5BjjXIp8g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


let getMeteo = async(center)=>{
  $.get( "https://api.openweathermap.org/data/2.5/weather?lat="+center[1]+"&lon="+center[0]+"&appid=0a7f4f67df74b7d6b295839cc37a08f4&units=metric&lang=fr", function( response ) {
    showWeather(response);
    });
}

let setSurface = async()=>{
  $.get( "https://geo.api.gouv.fr/communes?code="+commune.code+"&fields=code,nom,contour,centre", function( response ) {
    showOnMap(response[0]["centre"]["coordinates"],response[0]["contour"]);
    });
}



let showOnMap=(centre,contour)=>{
  mymap.panTo(new L.LatLng(centre[1], centre[0]));
  L.geoJson(contour).addTo(mymap);
  getMeteo(centre);
}

let showWeather=(ville)=>{
  titre.text("Pour la ville de " + commune.nom+ " : " );
  infoTemp.text("Température : " + ville.main.temp+"c°");
  infoFelt.text("Température ressenti : " +ville.main.feels_like+"c°");
  infoMin.text("Température minimale : " + ville.main.temp_min+"c°");
  infoMax.text("Température maximale : " + ville.main.temp_max+"c°");
  infoFelt.text("Température ressentie : " + ville.main.feels_like+"c°");
  infoTime.text("Description du temps : " + ville.weather[0].description);
  infoHumidity.text("Humidité : " + ville.main.humidity+"%");
}



setSurface();


