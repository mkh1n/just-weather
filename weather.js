
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
var mobValue = Number(getComputedStyle(document.getElementById('shortName')).zIndex)
if (mobValue){
  document.getElementById('mob-today').classList.add('today')
  document.getElementById('mob-clock').classList.add('clock')
} else{
  document.getElementById('pc-today').classList.add('today')
  document.getElementById('pc-clock').classList.add('clock')
}
var shortName = Number(getComputedStyle(document.getElementById('shortName')).zIndex)
var days = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб'
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
          document.querySelector('.city').innerHTML = city;
          return;
      }
  }
}
function getWeather(){
  let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${'b5624ce86e106ad950186fe5bf8adf4b'}`;
    axios.get(url).then(res => {
      console.log(res)
      for(let i=0; i<Number(res.data.cnt);i+=8){
        if (i != 0){
          let num = String(i/8);
          let date = new Date(String(res.data.list[i].dt_txt).replace(' ','T'));
          document.getElementById(num+'n').innerText = days[date.getDay()+7*mobValue]
          document.getElementById(num+'n').innerText = days[date.getDay()+shortName]

          document.getElementById(num+'t').innerText = (String(res.data.list[i].main.temp)[0] === '-')?
          Number(res.data.list[i].main.temp).toFixed(0)+'°': '+'+Number(res.data.list[i].main.temp).toFixed(0)+'°';

          let dayId = res.data.list[i].weather[0].id
          let dayIcon = ''
          if ((dayId>=200) && (dayId<=232)) {dayIcon = 'S'} else
          if ((dayId>=300) && (dayId<=321)) {dayIcon = 'U'} else
          if ((dayId>=500) && (dayId<=531)) {dayIcon = 'K'} else
          if ((dayId>=600) && (dayId<=622)) {dayIcon = 'I'} else
          if ((w_id>=701) && (dayId<=781)) {dayIcon = 'Z'} else
          if (dayId==800) {dayIcon = '1'} else
          if (dayId==801) {dayIcon = 'a'} else
          if ((dayId>=802) && (dayId<=804)) {dayIcon = '3'} 

          document.getElementById(num + 'i').innerText = dayIcon;
        }
      }
    
    var date = new Date();
    document.querySelector('.today').innerHTML = days[date.getDay()]+' '+date.getDate();
    var h = date.getHours();
    var w_id = res.data.list[0].weather[0].id;
    var icon = document.getElementById('weather-icon');
    var bg = document.getElementById('bg')
    if ((w_id>=200) && (w_id<=232)) {icon.innerHTML = 'S'; bg.className = ''; bg.classList.add('lightning')} else
    if ((w_id>=300) && (w_id<=321)) {icon.innerHTML = 'U'; bg.className = ''; bg.classList.add('rain')} else
    if ((w_id>=500) && (w_id<=531)) {icon.innerHTML = 'K'; bg.className = ''; bg.classList.add('rain')} else
    if ((w_id>=600) && (w_id<=622)) {icon.innerHTML = 'I'; bg.className = ''; bg.classList.add('snow')} else
    if ((w_id>=701) && (w_id<=781)) {icon.innerHTML = 'Z';bg.className = '';bg.classList.add('fog')} else
    if (w_id==800) {icon.innerHTML = (h <= 9)?'6': '1'; } else
    if (w_id==801) {icon.innerHTML = 'a'; bg.className = '';bg.classList.add('clouds'); bg.style.opacity=0.15} else
    if ((w_id>=802) && (w_id<=804)) {icon.innerHTML = '3'; bg.className = '';bg.classList.add('clouds')}  

    document.querySelector('.temp').innerHTML = (String(res.data.list[0].main.temp)[0] === '-')? Number(res.data.list[0].main.temp).toFixed(0)+'°': '+'+Number(res.data.list[0].main.temp).toFixed(0)+'°';
    document.querySelector('.humidity-value').innerHTML = res.data.list[0].main.humidity
    document.querySelector('.humidity-line-fill').style['width'] = res.data.list[0].main.humidity+'%'
    document.querySelector('.wind').innerHTML = Number(res.data.list[0].wind.speed).toFixed(0)
      
    var offset = new Date().getTimezoneOffset();  
    console.log(offset)

    var sunrise = new Date((res.data.city.sunrise* 1000))
    sunrise.setMinutes(sunrise.getMinutes() + offset);
    document.getElementById('sunrise').innerText = sunrise.getHours()+':'+ sunrise.getMinutes()

    var sunset = new Date((res.data.city.sunset * 1000))
    sunset.setMinutes(sunset.getMinutes() + offset);
    document.getElementById('sunset').innerText = sunset.getHours()+':'+ sunset.getMinutes()

    document.querySelector('.humidity').innerHTML = res.data.list[0].main.humidity
    document.querySelector('.humidity-line-fill').style['width'] = res.data.list[0].main.humidity+'%'
    document.querySelector('.wind').innerHTML = Number(res.data.list[0].wind.speed).toFixed(0)

    var wind = res.data.list[0].wind.speed;
    var arrow = document.querySelector('.arrow')
    if (wind >= 0 && wind <= 5) {arrow.style['transform'] = 'rotate(36deg)'} else
    if (wind > 5 && wind <= 10) {arrow.style['transform'] = 'rotate(72deg)'} else
    if (wind > 10 && wind <= 20) {arrow.style['transform'] = 'rotate(108deg)'} else
    if (wind > 20 && wind <= 30) {arrow.style['transform'] = 'rotate(146deg)'} else
    if (wind > 30 && wind <= 40) {arrow.style['transform'] = 'rotate(182deg)'}

    document.querySelector('.desc').innerHTML = String(res.data.list[0].weather[0].description)[0].toUpperCase()+String(res.data.list[0].weather[0].description).slice(1)
    document.querySelector('.clouds-value').innerHTML = res.data.list[0].clouds.all
    document.querySelector('.clouds-block').innerHTML = res.data.list[0].clouds.all
    document.querySelector('.cloud-line-fill').style['width'] = res.data.list[0].clouds.all+'%'


    })
}

getCoordintes();
getWeather();
getCity()
    

 
