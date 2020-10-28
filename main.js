let dateElement = document.getElementById("date");
let appId = "3484e8eb9e92c43d0f488d92f1448cbc";
let units = "imperial"
let searchMethod;
    // Shows todays date
let options = {weekday: "long",month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);


function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';

}



function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${"3484e8eb9e92c43d0f488d92f1448cbc"}&units=${units}`).then(result =>{
        return result.json();
    }).then(result => {
        init(result);
    })
    
}
    
function init(resultFromServer){
    console.log(resultFromServer)
    // Set background images for various weather information
   switch (resultFromServer.weather[0].main) {
       case 'Clear':
           document.body.style.backgroundImage = 'url("clear.png")'
           break;
        
           case 'Clouds':
            document.body.style.backgroundImage = 'url("cloud.png")'
           break;
           case 'Rain':
            document.body.style.backgroundImage = 'url("rainy2.jpg")'
           break;
           case 'Drizzle':
            document.body.style.backgroundImage = 'url("drizzle.png")'
           break;
           case 'Mist':
            document.body.style.backgroundImage = 'url("mist.png")'
           break;
           case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("thunder.png")'
           break;
           case 'Snow':
            document.body.style.backgroundImage = 'url("snow.png")'
           break;
   
       default:
         break;
   }
   let weatherDescriptionHeader =document. getElementById("weatherDescriptionHeader");
   let temperatureElement = document.getElementById("temperature");
   let humidityElement =document. getElementById("humidity");
   let windSpeedElement = document. getElementById("windSpeed");
   let cityHeader = document.getElementById("cityHeader");
   let cityCountry = document.getElementById("cityCountry");
   let weatherIcon = document.getElementById("documentIconImg");

   weatherIcon.src = " http://openweathermap.org/img/w/" + resultFromServer.weather[0].icon + ".png";

   let resultDescription = resultFromServer.weather[0].description;
   weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

   temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#8451';
   windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    cityCountry.innerHTML = resultFromServer.sys.country;
   humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + " % ";

   

   setPositionForWeatherInfo();
  
  
}
    // Set position of weather container according to weather info
function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.visibility = "visible";
    
}
    // Add eventlistener to search botton
document.getElementById("add").addEventListener('click', ()=>{
    let searchTerm = document.getElementById("searchInput").value;
    if(searchTerm) 
        searchWeather(searchTerm);
        searchInput.value = ''

    // validate
        // if(searchTerm === ''){
        //     let div = document.getElementById("errorMessage");
        //     div.innerHTML = 'Enter Your City Name Or Zip Code!';
        //     // div.show();
        //     return false;
           
        // }

        // //  setTimeout(function(){document.getElementById('errorMessage').style.display='none';},3000);
        //  setTimeout(() => document.getElementById("errorMessage").remove(),
    //     //     3000);
    // if(searchTerm === ''){
    //     errorMessage('Enter Your City Name Or Zip Code')
    // }

    // function errorMessage(error){
    //     let errorDiv = document.createElement('div');

    //     let row = document.querySelector('.row');
    //     let weatherContainer = document.querySelector('#weatherContainer')

    //     errorDiv.className = 'alert alert-danger';
    //     errorDiv.appendChild(document.createTextNode(error));

    //     row.insertBefore(errorDiv, weatherContainer);

    //     setTimeout(clearError, 3000);

    // }

    // function clearError(){
    //     document.querySelector('.alert').remove();
    // }

        
})
window.addEventListener("keydown", (e) => {
    if (e.which === 13) {
        let searchTerm = document.getElementById("searchInput").value;
        if(searchTerm)
      searchWeather(searchTerm);
      searchInput.value = ''
    }
  });

