let infoTemp = document.getElementById("temp");
let infoFelt = document.getElementById("felt");
let infoMin = document.getElementById("min");
let infoMax = document.getElementById("max");
let infoTime = document.getElementById("time");
let infoHumidity = document.getElementById("humidity");
let titre = document.getElementById("ville");
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
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+center[1]+"&lon="+center[0]+"&appid=0a7f4f67df74b7d6b295839cc37a08f4&units=metric&lang=fr", {
      "method": "GET",
    }).then(async response => {
        response.json().then(response=>{
            showWeather(response);
        })
    })
    .catch(err => {
      console.log(err);
    });
}


let setSurface = async()=>{
  //Obligé de récupérer le centre car l'api openweather se trompe sur la commune 
  fetch("https://geo.api.gouv.fr/communes?code="+commune.code+"&fields=code,nom,contour,centre", {
    "method": "GET",
  }).then(response => {
      response.json().then(response=>{
        showOnMap(response[0]["centre"]["coordinates"],response[0]["contour"]);
      })
  })
  .catch(err => {
    console.log(err);
  });
}



let showOnMap=(centre,contour)=>{
  console.log(centre);
  mymap.panTo(new L.LatLng(centre[1], centre[0]));
  L.geoJson(contour).addTo(mymap);
  getMeteo(centre);


}

let showWeather=(ville)=>{
  titre.innerText="Pour la ville de " + commune.nom+ " : " ;
  infoTemp.innerText="Température : " + ville.main.temp+"c°";
  infoFelt.innerText="Température ressenti : " +ville.main.feels_like+"c°";
  infoMin.innerText="Température minimale : " + ville.main.temp_min+"c°";
  infoMax.innerText="Température maximale : " + ville.main.temp_max+"c°";
  infoFelt.innerText="Température ressentie : " + ville.main.feels_like+"c°";
  infoTime.innerText="Description du temps : " + ville.weather[0].description;
  infoHumidity.innerText="Humidité : " + ville.main.humidity+"%";
}




await setSurface();


