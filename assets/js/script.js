
// fetch("https://api.weatherbit.io/v2.0/current?lat=39.949482&lon=-75.171883&key=b5c97ec4269348f59f7363c259205e69")
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //   console.log(data.data[0]);
    // // loop over data to get Temp, Wind, Humidity, UVindex
    // // for loop
    // for(var i = 0; i < data.data.length; i++){
    //     console.log(data.data[i].wind_spd)
    //     console.log(data.data[i].temp);
    //     console.log(data.data[i].rh)
    //     console.log(data.data[i].precip)
    //     console.log(data.data[i].uv)
    // }
    // })

// known working api urls for testing functions
var testSearchUrl = 'https://www.mapquestapi.com/search/v4/place?location=-74.95590458465354%2C40.26624146333869&sort=relevance&feedback=false&key=9UthBdDGZK1MsiEFy48XWw3fWtC01AAJ&pageSize=5&q=parks'
var testLocationUrl = 'https://www.mapquestapi.com/geocoding/v1/address?key=mtbhj6FHUDK65jhm5YNhCClvB7GI52JS&location=philadelphia,pa';
// can be set as user input once we get everything connected
var testInput = document.querySelector('#input-field');
// some dude on stackoverflow says this is how to remove spaces, seems to work
var searchButton = document.querySelector('#search-button');
// set results to appear in test div
var parksDisplay = document.querySelector('.parkresults');

// uses mapquest api to get coordinates based on city, state or zip
function getLocation(){
  parksDisplay.innerHTML = " ";
  console.log(testInput.value)
  var testLocation = testInput.value.replace(/\s+/g, '');
  fetch('https://www.mapquestapi.com/geocoding/v1/address?key=mtbhj6FHUDK65jhm5YNhCClvB7GI52JS&maxResults=1&location=' + testLocation)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if(data.results[0].locations.length !== 1){
      alert('enter a city name');
      location.reload();
    }
    //grabs the coordinates from the api call
    var userLon = data.results[0].locations[0].latLng.lng;
    var userLat = data.results[0].locations[0].latLng.lat;
    //plugs the coords into mapquest search places api
    getParks(userLon, userLat)
    getWeather(userLon, userLat)
  })
  }
  
function getWeather(lon, lat){
  fetch("https://api.weatherbit.io/v2.0/current?&lat=" + lat + '&lon=' + lon + "&units=I&key=b5c97ec4269348f59f7363c259205e69")
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    console.log(data);
    })
  }


  function getWeather(userLon,userLat){
    fetch("https://api.weatherbit.io/v2.0/current?" + loc + "&key=b5c97ec4269348f59f7363c259205e69" )
    .then(function (response) {
      return response.json()
      
      function todayWeather() => {
      var weatherTemp = document.createElement('p');
      var text = document.createTextNode('Temperature: ' + parseInt(data.data[i].temp) + '°F');
      temp.appendChild(text);
      weatherTemp.appendChild(curTemp);
      
      var curHum = document.createElement('p');
      var text = document.createTextNode('Humidity: ' + curW.humidity + '%');
      curHum.appendChild(text);
      curWeaDisp.appendChild(curHum);
      
      var curWs = document.createElement('p');
      var text = document.createTextNode('Wind Speed: ' + parseInt(curW.wind_speed) + 'mph');
      curWs.appendChild(text);
      curWeaDisp.appendChild(curWs);
      
      var curUv = document.createElement('p');
      var text = document.createTextNode('UV Index: ' + curW.uvi);
      if(curW.uvi > 7){
          curUv.classList.add("bg-danger");
      }
      if(curW.uvi < 3){
          curUv.classList.add("bg-success");
      }
      else {
          curUv.classList.add("bg-warning");
      }
      curUv.appendChild(text);
      curWeaDisp.appendChild(curUv);  
    }












  //searches for 5 parks near coords, sorts by relevance for now because the filter is a query and not super specific
function getParks(lon, lat){
  fetch('https://www.mapquestapi.com/search/v4/place?location=' + lon + '%2C' + lat +'&sort=relevance&feedback=false&key=9UthBdDGZK1MsiEFy48XWw3fWtC01AAJ&pageSize=5&q=parks')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //can sort through the return data if you want, doesn't look like much comes back
    console.log(data);
    //console logging info to make it easier to figure out what we'll want printed to the page
    for(i=0;i<data.results.length;i++){
      console.log('park name: ' + data.results[i].name);
      //can use this link in an iframe if we want or a redirect link if that doesn't work out
      console.log('iframe src: https://www.mapquest.com/' + data.results[i].slug);
      // prints the park names to a test div
      var pName = data.results[i].name;
      var pNameHead = document.createElement('h4');
      //ADD BULMA AND STYLING CLASSES HERE
      // pNameHead.classList.add('');
      var text = document.createTextNode(pName);
      pNameHead.appendChild(text);
      parksDisplay.appendChild(pNameHead);

      var pSlug = data.results[i].slug;
      var pSlugFrame = document.createElement('iframe');
      //ADD STYLES TO IFRAME HERE
      pSlugFrame.setAttribute("src", ('https://www.mapquest.com/' + pSlug), "scrolling", "no")
      //ADD BULMA AND STYLING CLASSES HERE
      // pSlugFrame.classList.add('');
      parksDisplay.appendChild(pSlugFrame);
    }
  })
  }

searchButton.addEventListener('click', getLocation); 