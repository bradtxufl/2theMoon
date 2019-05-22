document.addEventListener('DOMContentLoaded', function () {

  var setLocation = document.querySelector('#setLocation')
  var zipcodeField = document.querySelector('#zip')
  var cityField = document.querySelector('#city')
  var stateField = document.querySelector('#state')
  var cityStateDisplay = document.querySelector('.cityStateDisplay')
  var splash = document.querySelector('.splash')
  var changeLocation = document.querySelector('#changeLocation')
  var temperatures = document.querySelector('#temperatures')
  var weatherImage = document.querySelector('#weatherImage')
  var zipcode = 00000
  var clearWorkouts = document.querySelector('#clearWorkouts')
  var totalDistance = document.querySelector('#totalDistance')
  var hikeDistance = document.querySelector('#hikeDistance')
  var swimDistance = document.querySelector('#swimDistance')
  var bikeDistance = document.querySelector('#bikeDistance')
  var runDistance = document.querySelector('#runDistance')
  var footballFields = document.querySelector('#footballFields')
  var grandCanyon = document.querySelector('#grandCanyon')
  var niagaraFalls = document.querySelector('#niagaraFalls')
  var moon = document.querySelector('#moon')
  var hbar = document.querySelector('#hbar')
  var sbar = document.querySelector('#sbar')
  var bbar = document.querySelector('#bbar')
  var rbar = document.querySelector('#rbar')
  var hikeInput = document.querySelector('#hikeInput')
  var swimInput = document.querySelector('#swimInput')
  var bikeInput = document.querySelector('#bikeInput')
  var runInput = document.querySelector('#runInput')
  var hikeButton = document.querySelector('#hikeButton')
  var swimButton = document.querySelector('#swimButton')
  var bikeButton = document.querySelector('#bikeButton')
  var runButton = document.querySelector('#runButton')
  var hype = document.querySelector('.hype')

  var totalDist = localStorage.getItem('totDist') || 0
  totalDistance.innerHTML = `Your total distance: ${(JSON.parse(totalDist))} miles`

  var hikeDist = localStorage.getItem('hikeDist') || 0
  hikeDistance.innerHTML = `${hikeDist} miles`

  var swimDist = localStorage.getItem('swimDist') || 0
  swimDistance.innerHTML = `${swimDist} miles`

  var bikeDist = localStorage.getItem('bikeDist') || 0
  bikeDistance.innerHTML = `${bikeDist} miles`

  var runDist = localStorage.getItem('runDist') || 0
  runDistance.innerHTML = `${runDist} miles`

  clearWorkouts.addEventListener('click', function (e) {
    localStorage.removeItem('totDist')
    localStorage.removeItem('hikeDist')
    localStorage.removeItem('swimDist')
    localStorage.removeItem('bikeDist')
    localStorage.removeItem('runDist')
    location.reload()
  })

  var storedZip = localStorage.getItem('storedZip')
  if (storedZip) {
    splash.style.display = 'none'
    zipcode = storedZip
    var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=a8e697a95390d4ae547c8e0dcaadae89`
    function weatherize (obj) {
      let high = ((obj['main']['temp'] * (9/5)) - 459.67).toFixed(0)
      let low = ((obj['main']['temp_min'] * (9/5)) - 459.67).toFixed(0)
      let current = ((obj['main']['temp_max'] * (9/5)) - 459.67).toFixed(0)
      temperatures.innerHTML = `Now: ${current}° | High: ${high}° | Low: ${low}°`
      weatherImage.src = `${obj['weather'][0]['icon']}.jpeg`
      cityStateDisplay.innerHTML = obj['name']
    }

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        return JSON.stringify(data)
      })
      .then(function(string) {
        weatherize(JSON.parse(string))
      })
  }

  changeLocation.addEventListener('click', function (e) {
    localStorage.removeItem('storedZip')
    e.preventDefault()
    splash.style.display = 'flex'
  })

  setLocation.addEventListener('click', function (e) {
    e.preventDefault()
    localStorage.setItem('storedZip', zipcodeField.value)
    zipcode = zipcodeField.value
    var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=a8e697a95390d4ae547c8e0dcaadae89`
    function weatherize (obj) {
      let high = ((obj['main']['temp'] * (9/5)) - 459.67).toFixed(0)
      let low = ((obj['main']['temp_min'] * (9/5)) - 459.67).toFixed(0)
      let current = ((obj['main']['temp_max'] * (9/5)) - 459.67).toFixed(0)
      temperatures.innerHTML = `Now: ${current}° | High: ${high}° | Low: ${low}°`
      weatherImage.src = `${obj['weather'][0]['icon']}.jpeg`
      cityStateDisplay.innerHTML = obj['name']
    }

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        return JSON.stringify(data)
      })
      .then(function(string) {
        weatherize(JSON.parse(string))
      })

    splash.style.display = 'none'

  })

    function swim (laps) {
      return (laps/32).toFixed(0)
    }

    function football (miles) {
      footballFields.innerHTML = (miles * 17.6).toFixed(0)
    }

    function luna (miles) {
      moon.innerHTML = `${(miles/2389).toFixed(4)}%`
    }

    football(totalDist)
    luna(totalDist)

    function progbar() {
      var green = (JSON.parse(hikeDist) / JSON.parse(totalDist)) * 101
      var blue = (JSON.parse(swimDist) / JSON.parse(totalDist)) * 101
      var yellow = (JSON.parse(bikeDist) / JSON.parse(totalDist)) * 101
      var red = (JSON.parse(runDist) / JSON.parse(totalDist)) * 101

      hbar.style = `width: ${green}%`
      sbar.style = `width: ${blue}%`
      bbar.style = `width: ${yellow}%`
      rbar.style = `width: ${red}%`
    }
    progbar()

    hikeButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(hikeInput.value)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      hikeDist = JSON.parse(hikeDist)
      hikeDist += parseInt(hikeInput.value)
      hikeDistance.innerHTML = `${JSON.parse(hikeDist)} miles`
      hype.style.display = 'flex'
      football(totalDist)
      luna(totalDist)
      localStorage.setItem('hikeDist', JSON.stringify(hikeDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
      progbar()
    })

    swimButton.addEventListener('click', function (e) {
      e.preventDefault()
      var swimMiles = swim(parseInt(swimInput.value))
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(swimMiles)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      swimDist = JSON.parse(swimDist)
      swimDist += parseInt(swimMiles)
      swimDistance.innerHTML = `${JSON.parse(swimDist)} miles`
      hype.style.display = 'flex'
      football(totalDist)
      luna(totalDist)
      localStorage.setItem('swimDist', JSON.stringify(swimDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
      progbar()
    })

    bikeButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(bikeInput.value)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      bikeDist = JSON.parse(bikeDist)
      bikeDist += parseInt(bikeInput.value)
      bikeDistance.innerHTML = `${JSON.parse(bikeDist)} miles`
      hype.style.display = 'flex'
      football(totalDist)
      luna(totalDist)
      localStorage.setItem('bikeDist', JSON.stringify(bikeDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
      progbar()
    })

    runButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(runInput.value)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      runDist = JSON.parse(runDist)
      runDist += parseInt(runInput.value)
      runDistance.innerHTML = `${JSON.parse(runDist)} miles`
      hype.style.display = 'flex'
      football(totalDist)
      luna(totalDist)
      localStorage.setItem('runDist', JSON.stringify(runDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
      progbar()
    })
})
