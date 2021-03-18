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


    // create , text ,  appehend
    
