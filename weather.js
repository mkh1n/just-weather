
window.onload = function(){
  var h =new Date.getHours();
	if ((h >= 19) || (h <= 8)){
    main.classList.remove('day')
    main.classList.add('night')
  }
  else{
    main.classList.add('day')
    main.classList.remove('night')
  }
};
var lat =0;
var lon = 0;
var days = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

function getCoordintes() {
  var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
  };
  function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lon = crd.longitude.toString();
      var coordinates = [lat, lon];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      getCity(coordinates);
      return;
  }
  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function getCity(coordinates) {
  var xhr = new XMLHttpRequest();
  var lat = coordinates[0];
  var lng = coordinates[1];
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.f38452ec70f1325f8ee69261d1d19835&normalizecity=1&lat=" +
  lat + "&lon=" + lng + "&format=json", true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var ad = response.address
          var city =  ad['city']
          var country = ad['country']
          console.log(ad)
          document.querySelector('.city').innerHTML = city;
          return;
      }
  }
}

function getWeather(){
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${'b5624ce86e106ad950186fe5bf8adf4b'}`;
    axios.get(url).then(res => {
    var date = new Date();
    document.querySelector('.today').innerHTML = days[date.getDay()]+' '+date.getDate();
    var h = date.getHours();
    var w_id = res.data.weather[0].id;
    var icon = document.getElementById('weather-icon');
    var bg = document.getElementById('bg')
    if ((w_id>=200) && (w_id<=232)) {icon.innerHTML = 'S'; bg.className = ''; bg.classList.add('lightning')} else
    if ((w_id>=300) && (w_id<=321)) {icon.innerHTML = 'U'; bg.className = ''; bg.classList.add('rain')} else
    if ((w_id>=500) && (w_id<=531)) {icon.innerHTML = 'K'; bg.className = ''; bg.classList.add('rain')} else
    if ((w_id>=600) && (w_id<=622)) {icon.innerHTML = 'I';} else
    if ((w_id>=701) && (w_id<=781)) {icon.innerHTML = 'Z';bg.className = '';bg.classList.add('fog')} else
    if (w_id==800) {icon.innerHTML = (h <= 9)?'6': '1'} else
    if (w_id==801) {icon.innerHTML = 'a'} else
    if ((w_id>=802) && (w_id<=804)) {icon.innerHTML = '3'; bg.className = '';bg.classList.add('clouds')}  

    document.querySelector('.temp').innerHTML = (String(res.data.main.temp)[0] === '-')? Number(res.data.main.temp).toFixed(0)+'°': '+'+Number(res.data.main.temp).toFixed(0)+'°';
    document.querySelector('.humidity').innerHTML = res.data.main.humidity
    document.querySelector('.humidity-line-fill').style['width'] = res.data.main.humidity+'%'
    document.querySelector('.wind').innerHTML = Number(res.data.wind.speed).toFixed(0)
    var wind = res.data.wind.speed;
    var arrow = document.querySelector('.arrow')
    if (wind >= 0 && wind <= 5) {arrow.style['transform'] = 'rotate(36deg)'} else
    if (wind > 5 && wind <= 10) {arrow.style['transform'] = 'rotate(72deg)'} else
    if (wind > 10 && wind <= 20) {arrow.style['transform'] = 'rotate(108deg)'} else
    if (wind > 20 && wind <= 30) {arrow.style['transform'] = 'rotate(146deg)'} else
    if (wind > 30 && wind <= 40) {arrow.style['transform'] = 'rotate(182deg)'}

    document.querySelector('.desc').innerHTML = String(res.data.weather[0].description)[0].toUpperCase()+String(res.data.weather[0].description).slice(1)
    document.querySelector('.clouds-block').innerHTML = res.data.clouds.all
    document.querySelector('.cloud-line-fill').style['width'] = res.data.clouds.all+'%'


    })
}

getCoordintes();
getWeather();
getCity()
    

 
