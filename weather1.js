
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
    var apikey =
  fetch("http://api.openweathermap.org/data/2.5/weatherlat=${lat}&lon=${lon}&lang=ru&appid=${'b5624ce86e106ad950186fe5bf8adf4b'}").then(function (resp) {return resp.json() }).then(function (data) {
    console.log(data)
    })
    .catch(function () {
        //Обрабатываем ошибки
    });
  }
  getCoordintes();
  getWeather();
  getCity()
      
  
   
  