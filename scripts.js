document.addEventListener('DOMContentLoaded', function () {
 // selecting dom items like its my job
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
  var wb = document.querySelector('#weatherBackground')
  var gif = document.querySelector('#celebration')
  var quote = document.querySelector('#exampleModalCenterTitle')
//randomizing the content of the popup when a workout is submitted with every page load
  function pumpMeUp () {
    var gifs = ['https://media.giphy.com/media/iBdKJ6iIubtRK/giphy.gif',
    'https://media.giphy.com/media/xUPGcJaL5ODxniWMNO/giphy.gif',
    'https://media.giphy.com/media/QqMKFi59zy4Qo/giphy.gif',
    'https://media.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.gif',
    'https://media.giphy.com/media/kBZBlLVlfECvOQAVno/giphy.gif',
    'https://media.giphy.com/media/3oz8xVjxTPNEzyKRKU/giphy.gif',
    'https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif',
    'https://media.giphy.com/media/yoJC2COHSxjIqadyZW/giphy.gif',
    'https://media.giphy.com/media/yYT7ytuZpJjG0/giphy.gif',
    'https://media.giphy.com/media/44gu1V41ejJni/giphy.gif']
    var quotes = ['"Those at the top of the mountain didn\'t fall there" - Ann Onymous',
    '"I would rather risk wearing out than rusting out" - Theodore Roosevelt',
    '"Things may come to those who wait, but only the things left by those who hustle" - Abraham Lincoln',
    '"Nobody who ever gave his best regretted it" - George Halas',
    '"If you ain\'t first, yet last" - Ricky Bobby',
    '"Do or do not.  There is no try" - Jedi Master Yoda',
    '"This opportunity comes once in a lifetime" - Eminem',
    '"YAAAYYAYAYYYYYAYAAYYY" - Kermit the Frog',
    '"Crushed it" - Fat Amy',
    '"Meep, Meep" - The Roadrunner']
    gif.src = gifs[Math.floor(Math.random() * 10)]
    quote.innerHTML = quotes[Math.floor(Math.random() * 10)]
  }
  pumpMeUp()
//reloading the page when a popup is minimized so the graphs can catch up to the asyncs and display correctly
  heckYes.addEventListener('click', function () {
    location.reload()
  })
//setting local storage for all of the workout stats
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
//clearing local storage of workouts and reloading the page so all the charts zero out
  clearWorkouts.addEventListener('click', function (e) {
    localStorage.removeItem('totDist')
    localStorage.removeItem('hikeDist')
    localStorage.removeItem('swimDist')
    localStorage.removeItem('bikeDist')
    localStorage.removeItem('runDist')
    location.reload()
  })
//fetching the weather from openweathermap api and updating the temps, weather icon, background pictions, and location name
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
        wb.src = 'clearday.jpg'
    } else if (obj['weather'][0]['icon'] == '01n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/740/740878.svg'
      wb.src = 'clearnight.jpg'
    } else if (obj['weather'][0]['icon'] == '02d' || obj['weather'][0]['icon'] == '03d' || obj['weather'][0]['icon'] == '04d') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/861/861059.svg'
      wb.src = 'cloudday.jpg'
    } else if (obj['weather'][0]['icon'] == '02n' || obj['weather'][0]['icon'] == '03n' || obj['weather'][0]['icon'] == '04n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/1113/1113763.svg'
      wb.src = 'nightcloud.jpg'
    } else if (obj['weather'][0]['icon'] == '09d' || obj['weather'][0]['icon'] == '10d' || obj['weather'][0]['icon'] == '09n' || obj['weather'][0]['icon'] == '10n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/414/414974.svg'
      wb.src = 'rain.jpg'
    } else if (obj['weather'][0]['icon'] == '11d' || obj['weather'][0]['icon'] == '11n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/1684/1684363.svg'
      wb.src = 'lightning.jpg'
    } else if (obj['weather'][0]['icon'] == '13d' || obj['weather'][0]['icon'] == '13n') {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/642/642000.svg'
      wb.src = 'snow.jpg'
    } else {
      weatherImage.src = 'https://image.flaticon.com/icons/svg/1808/1808428.svg'
      wb.src = 'fog.jpg'
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
// fetching the distance between the entered zip code and the Grand Canyon
  var canyonGrande = localStorage.getItem('gcfar') || 0
  var gcDist = function (zippy) {
    var url = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/CalculateDistance/ByZip?fromzipcode=${zippy}&tozipcode=86023&key=IA03X3J1TK051FCJXPMR`
    function package (obj) {
      canyonGrande = parseInt(obj['DistanceInMiles']).toFixed(0)
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
// fetching the distance between the entered zipcode and Niagara Falls
  var fallsNiag = localStorage.getItem('nffar') || 0
  var nfDist = function (zippy) {
    var url = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/CalculateDistance/ByZip?fromzipcode=${zippy}&tozipcode=14301&key=IA03X3J1TK051FCJXPMR`
    function packageDos (obj) {
      fallsNiag = parseInt(obj['DistanceInMiles']).toFixed(0)
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
//clearing local storage of location and showing option to input zip again
  changeLocation.addEventListener('click', function (e) {
    localStorage.removeItem('storedZip')
    e.preventDefault()
    splash.style.display = 'flex'
  })
//setting location and weather, then reloading the page once the APIs have had a chance to bring back the needed values
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
//converting swim laps to miles (rounded to the nearest mile)
    function swim (laps) {
      return (laps/32).toFixed(0)
    }
//converting total distance to # of football fields and displaying it
    function football (miles) {
      footballFields.innerHTML = (miles * 17.6).toFixed(0)
    }
    football(totalDist)
//setting the percentages for the progress bar
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
//setting percentage of distance to Space
    var graphSpace = function () {
      var spaceDist = ((totalDist / 62) * 100).toFixed(0)
      if (spaceDist > 100) {
        return 100
      } else {
        return spaceDist
      }
    }
//setting percentage of distance to Grand Canyon
      var graphGC = function () {
      var numcg = JSON.parse(canyonGrande)
      var gcpc = ((totalDist / numcg) * 100).toFixed(0)
      if (gcpc > 100) {
        return 100
      } else {
        return gcpc
      }
    }
//setting percentage of distance to Niagara Falls
    var graphNF = function () {
      var numfn = JSON.parse(fallsNiag)
      var nfpc = ((totalDist / numfn) * 100).toFixed(0)
      if (nfpc > 100) {
        return 100
      } else {
        return nfpc
      }
    }
//setting percentage of distance to the Moon
    var graphMoon = (totalDist/2389).toFixed(4)
//creating concentric circles graph with percentage values
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
//setting space chart with percentage value
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
//setting grand canyon chart with percentage value
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
//setting niagara falls chart with percentage value
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
//setting moon chart with percentage value
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
//housing all the functions to update on submit of new workout
function update (totalDist) {
  football(totalDist)
  graph()
  graphSpace()
  chartMoon()
  chartGC()
  chartNF()
  progbar()
}
//on submit of new hiking workout
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
//on submit of new swimming workout
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
//on submit of new biking workout
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
//on submit of new running workout
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
