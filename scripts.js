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
  var heckYes = document.querySelector('#heckYes')

  heckYes.addEventListener('click', function () {
    location.reload()
  })

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
      if (obj['weather'][0]['icon'] == '01d') {
        weatherImage.src = 'https://image.flaticon.com/icons/svg/136/136723.svg'
    } else if (obj['weather'][0]['icon'] == '01n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/740/740878.svg'
    } else if (obj['weather'][0]['icon'] == '02d' || obj['weather'][0]['icon'] == '03d' || obj['weather'][0]['icon'] == '04d') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/861/861059.svg'
    } else if (obj['weather'][0]['icon'] == '02n' || obj['weather'][0]['icon'] == '03n' || obj['weather'][0]['icon'] == '04n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/1113/1113763.svg'
    } else if (obj['weather'][0]['icon'] == '09d' || obj['weather'][0]['icon'] == '10d' || obj['weather'][0]['icon'] == '09n' || obj['weather'][0]['icon'] == '10n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/414/414974.svg'
    } else if (obj['weather'][0]['icon'] == '11d' || obj['weather'][0]['icon'] == '11n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/1684/1684363.svg'
    } else if (obj['weather'][0]['icon'] == '13d' || obj['weather'][0]['icon'] == '13n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/642/642000.svg'
    } else {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/1808/1808428.svg'
    }
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

  var canyonGrande = localStorage.getItem('gcfar') || 0

  var gcDist = function (zippy) {
    var url = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/CalculateDistance/ByZip?fromzipcode=${zippy}&tozipcode=86023&key=IA03X3J1TK051FCJXPMR`
    function package (obj) {
      canyonGrande = parseInt(obj['DistanceInMiles']).toFixed(0)
      console.log(canyonGrande)
      console.log(typeof canyonGrande)
      localStorage.setItem('gcfar', canyonGrande)
    }

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        return JSON.stringify(data)
      })
      .then(function(string) {
        package(JSON.parse(string))
      })

  }

  grandCanyon.innerHTML = canyonGrande + ' miles'

  var fallsNiag = localStorage.getItem('nffar') || 0

  var nfDist = function (zippy) {
    var url = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/CalculateDistance/ByZip?fromzipcode=${zippy}&tozipcode=14301&key=IA03X3J1TK051FCJXPMR`
    function packageDos (obj) {
      fallsNiag = parseInt(obj['DistanceInMiles']).toFixed(0)
      console.log(fallsNiag)
      console.log(typeof fallsNiag)
      localStorage.setItem('nffar', fallsNiag)
    }

    fetch(url)
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        return JSON.stringify(data)
      })
      .then(function(string) {
        packageDos(JSON.parse(string))
      })

  }

  niagaraFalls.innerHTML = fallsNiag + ' miles'


  changeLocation.addEventListener('click', function (e) {
    localStorage.removeItem('storedZip')
    e.preventDefault()
    splash.style.display = 'flex'
  })

  setLocation.addEventListener('click', function (e) {
    e.preventDefault()
    localStorage.setItem('storedZip', zipcodeField.value)
    zipcode = zipcodeField.value
    gcDist(zipcode)
    nfDist(zipcode)
    var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=a8e697a95390d4ae547c8e0dcaadae89`
    function weatherize (obj) {
      let high = ((obj['main']['temp'] * (9/5)) - 459.67).toFixed(0)
      let low = ((obj['main']['temp_min'] * (9/5)) - 459.67).toFixed(0)
      let current = ((obj['main']['temp_max'] * (9/5)) - 459.67).toFixed(0)
      temperatures.innerHTML = `Now: ${current}° | High: ${high}° | Low: ${low}°`
      weatherImage.src = `${obj['weather'][0]['icon']}.jpeg`
      cityStateDisplay.innerHTML = obj['name']
      setTimeout(function() {
        location.reload()
      }, 1000)
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
    football(totalDist)


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

    var graphSpace = function () {
      var spaceDist = ((totalDist / 62) * 100).toFixed(0)
      if (spaceDist > 100) {
        return 100
      } else {
        return spaceDist
      }
    }

    var graphGC = function () {
      var numcg = JSON.parse(canyonGrande)
      var gcpc = ((totalDist / numcg) * 100).toFixed(0)
      if (gcpc > 100) {
        return 100
      } else {
        return gcpc
      }
    }

    var graphNF = function () {
      var numfn = JSON.parse(fallsNiag)
      var nfpc = ((totalDist / numfn) * 100).toFixed(0)
      if (nfpc > 100) {
        return 100
      } else {
        return nfpc
      }
    }

    var graphMoon = (totalDist/2389).toFixed(4)

    function graph() {
      var options1 = {
        chart: {
          height: 280,
          type: "radialBar",
        },
        series: [graphSpace(), graphGC(), graphNF(), graphMoon],
        plotOptions: {
          radialBar: {
            dataLabels: {
              total: {
                show: false,
                label: 'Get It'
              }
            }
          }
        },
        labels: ['to Space', 'Grand Canyon', 'Niagara Falls', 'the Moon']
      };

      new ApexCharts(document.querySelector("#chart1"), options1).render();

    }
    graph()

    function chartSpace() {
      var options = {
      chart: {
        height: 280,
        type: "radialBar"
      },

      series: [graphSpace()],
      colors: ['rgba(0, 143, 251, 0.85)'],

      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },

      stroke: {
        lineCap: "round",
      },
      labels: ["To Space"]
    };
    var chart = new ApexCharts(document.querySelector("#chartspace"), options);

    chart.render();

    }
    chartSpace()

    function chartGC() {
      var options = {
      chart: {
        height: 280,
        type: "radialBar"
      },

      series: [graphGC()],
      colors: ['rgba(0, 227, 150, 0.85)'],

      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },

      stroke: {
        lineCap: "round",
      },
      labels: ["Grand Canyon"]
    };
    var chart = new ApexCharts(document.querySelector("#chartgc"), options);

    chart.render();

    }
    chartGC()

    function chartNF() {
      var options = {
      chart: {
        height: 280,
        type: "radialBar"
      },

      series: [graphNF()],
      colors: ['rgba(254, 176, 25, 0.85)'],

      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },

      stroke: {
        lineCap: "round",
      },
      labels: ["Niagara Falls"]
    };
    var chart = new ApexCharts(document.querySelector("#chartnf"), options);

    chart.render();

    }
    chartNF()

    function chartMoon() {
      var options = {
      chart: {
        height: 280,
        type: "radialBar"
      },

      series: [graphMoon],
      colors: ['rgba(255, 69, 96, 0.85)'],

      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },

      stroke: {
        lineCap: "round",
      },
      labels: ["To the Moon"]
    };



    var chart = new ApexCharts(document.querySelector("#chartmoon"), options);

    chart.render();

    }
    chartMoon()

function update (totalDist) {
  football(totalDist)
  graph()
  graphSpace()
  chartMoon()
  chartGC()
  chartNF()
  progbar()
}

    hikeButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(hikeInput.value)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      hikeDist = JSON.parse(hikeDist)
      hikeDist += parseInt(hikeInput.value)
      hikeDistance.innerHTML = `${JSON.parse(hikeDist)} miles`
      update(totalDist)
      localStorage.setItem('hikeDist', JSON.stringify(hikeDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
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
      update(totalDist)
      localStorage.setItem('swimDist', JSON.stringify(swimDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
    })

    bikeButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(bikeInput.value)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      bikeDist = JSON.parse(bikeDist)
      bikeDist += parseInt(bikeInput.value)
      bikeDistance.innerHTML = `${JSON.parse(bikeDist)} miles`
      update(totalDist)
      localStorage.setItem('bikeDist', JSON.stringify(bikeDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
    })

    runButton.addEventListener('click', function (e) {
      e.preventDefault()
      totalDist = JSON.parse(totalDist)
      totalDist += parseInt(runInput.value)
      totalDistance.innerHTML = `Your total distance: ${JSON.parse(totalDist)} miles`
      runDist = JSON.parse(runDist)
      runDist += parseInt(runInput.value)
      runDistance.innerHTML = `${JSON.parse(runDist)} miles`
      update(totalDist)
      localStorage.setItem('runDist', JSON.stringify(runDist))
      localStorage.setItem('totDist', JSON.stringify(totalDist))
    })

})
