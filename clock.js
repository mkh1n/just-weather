
function time() {
  main = document.getElementsByClassName('weather')[0]
  var d = new Date();
  var m = d.getMinutes();
  var h = d.getHours();
  var s = d.getSeconds();
  if(h < 10)
      h = "0" + h;
  if(m < 10)
    m = "0" + m;
    document.querySelector('.clock').innerHTML=
    (s%2==0)? h + ":" + m: h + " " + m;
  if ((h >= 19) || (h <= 8)){
    main.classList.remove('day')
    main.classList.add('night')
  }
  else{
    main.classList.add('day')
    main.classList.remove('night')
  }
}
time()
setInterval(time, 1000);