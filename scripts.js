document.addEventListener('DOMContentLoaded', function () {

  var setLocation = document.querySelector('#setLocation')
  var zipcodeField = document.querySelector('#zip')
  var cityField = document.querySelector('#city')
  var stateField = document.querySelector('#state')
  var cityStateDisplay = document.querySelector('.cityStateDisplay')
  var splash = document.querySelector('.splash')
  var zipcode = 00000
  var changeLocation = document.querySelector('#changeLocation')

  setLocation.addEventListener('click', function (e) {
    e.preventDefault()

    splash.style.display = 'none'
    cityStateDisplay.innerHTML = `${cityField.value}, ${stateField.value}`
    zipcode = zipcodeField.value
    console.log(zipcodeField.value)

    changeLocation.addEventListener('click', function (e) {
      e.preventDefault()
      splash.style.display = 'flex'
    })

    var totalDistance = document.querySelector('#totalDistance')
    var totalDistanceNum = 0
    var hikeDistance = document.querySelector('#hikeDistance')
    var hikeDistanceNum = 0
    var swimDistance = document.querySelector('#swimDistance')
    var swimDistanceNum = 0
    var bikeDistance = document.querySelector('#bikeDistance')
    var bikeDistanceNum = 0
    var runDistance = document.querySelector('#runDistance')
    var runDistanceNum = 0
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

    function football (miles) {
      footballFields.innerHTML = (miles * 17.6).toFixed(0)
    }

    function luna (miles) {
      moon.innerHTML = `${(miles/2389).toFixed(4)}%`
    }

    hikeButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDistanceNum += parseInt(hikeInput.value)
      totalDistance.innerHTML = `Your total distance: ${totalDistanceNum} miles`
      hikeDistanceNum += parseInt(hikeInput.value)
      hikeDistance.innerHTML = `${hikeDistanceNum} miles`
      hype.style.display = 'flex'
      football(totalDistanceNum)
      luna(totalDistanceNum)
    })

    swimButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDistanceNum += parseInt(swimInput.value)
      totalDistance.innerHTML = `Your total distance: ${totalDistanceNum} miles`
      swimDistanceNum += parseInt(swimInput.value)
      swimDistance.innerHTML = `${swimDistanceNum} miles`
      hype.style.display = 'flex'
      football(totalDistanceNum)
      luna(totalDistanceNum)
    })

    bikeButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDistanceNum += parseInt(bikeInput.value)
      totalDistance.innerHTML = `Your total distance: ${totalDistanceNum} miles`
      bikeDistanceNum += parseInt(bikeInput.value)
      bikeDistance.innerHTML = `${bikeDistanceNum} miles`
      hype.style.display = 'flex'
      football(totalDistanceNum)
      luna(totalDistanceNum)
    })

    runButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDistanceNum += parseInt(runInput.value)
      totalDistance.innerHTML = `Your total distance: ${totalDistanceNum} miles`
      runDistanceNum += parseInt(runInput.value)
      runDistance.innerHTML = `${runDistanceNum} miles`
      hype.style.display = 'flex'
      football(totalDistanceNum)
      luna(totalDistanceNum)
    })


  })
})
