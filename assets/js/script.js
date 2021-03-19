console.log("Hello World")
fetch("https://api.weatherbit.io/v2.0/current?lat=39.949482&lon=-75.171883&key=b5c97ec4269348f59f7363c259205e69")
//, {
    // method: 'GET', //GET is the default.
    // credentials: 'same-origin', // include, *same-origin, omit
    // redirect: 'follow', // manual, *follow, error
  // }
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    // loop over data to get Temp, Wind, Humidity, UVindex
    // for loop
    for(var i = 0; i < data.data.length; i++){
        console.log(data.data[i].city_name)
        console.log(data.data[i].wind_spd)
    }
    });

// known working api urls for testing functions
var testSearchUrl = 'https://www.mapquestapi.com/search/v4/place?location=-74.95590458465354%2C40.26624146333869&sort=relevance&feedback=false&key=9UthBdDGZK1MsiEFy48XWw3fWtC01AAJ&pageSize=5&q=parks'
var testLocationUrl = 'https://www.mapquestapi.com/geocoding/v1/address?key=mtbhj6FHUDK65jhm5YNhCClvB7GI52JS&location=philadelphia,pa';
// can be set as user input once we get everything connected
var testInput = 'Philadelphia, PA';
// some dude on stackoverflow says this is how to remove spaces, seems to work
var testLocation = testInput.replace(/\s+/g, '');

// uses mapquest api to get coordinates based on city, state or zip
function getLocation(){
  fetch('https://www.mapquestapi.com/geocoding/v1/address?key=mtbhj6FHUDK65jhm5YNhCClvB7GI52JS&location=' + testLocation)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //grabs the coordinates from the api call
    var userLon = data.results[0].locations[0].latLng.lng;
    var userLat = data.results[0].locations[0].latLng.lat;
    //plugs the coords into mapquest search places api
    getParks(userLon, userLat)
  })
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
    }
  })
  }

//can set up an event listener for click, just running on page load to test
getLocation();    

