const wrapper = document.querySelector(".wrapper");

// Get DOM elements for displaying weather information
const cityName = document.getElementById("City");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const speed = document.getElementById("speed");
const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");
const body_image = document.getElementById("body_image");
const body_detail = document.getElementById("body_detail");
const detail = document.getElementById("detail");
const weathertype1 = document.getElementById("weatherType1");


// London-specific DOM elements
const cityName2 = document.getElementById("City2");
const temp2 = document.getElementById("temp2");
const humidity2 = document.getElementById("humidity2");
const speed2 = document.getElementById("speed2");
const body_image2 = document.getElementById("body_image2");
const body_detail2 = document.getElementById("body_detail2");
const detail2 = document.getElementById("detail2");
const weathertype2 = document.getElementById("weatherType2");


// Kinshasa-specific DOM elements
const cityName3 = document.getElementById("City3");
const temp3 = document.getElementById("temp3");
const humidity3 = document.getElementById("humidity3");
const speed3 = document.getElementById("speed3");
const body_image3 = document.getElementById("body_image3");
const body_detail3 = document.getElementById("body_detail3");
const detail3 = document.getElementById("detail3");
const weathertype3 = document.getElementById("weatherType3");

//BgChange
const toggle = document.getElementById("toggleDark");
const bgChange = document.querySelector(".bgChange");

//popup
const Pop = document.querySelector(".popUp");



// Check and apply saved theme on page load
document.addEventListener("DOMContentLoaded", () =>{
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme == "light"){
        applylightTheme();

    }else{
        applydarkTheme();
    }

})

toggle.addEventListener("click", function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle("bi-brightness-high-fill")){
        applylightTheme();
        localStorage.setItem("theme", "light");//save light theme

    }else{
        applydarkTheme()
        localStorage.setItem("theme", "dark");//dark theme
    }

});


function applylightTheme(){
    document.body.style.background = "linear-gradient(160deg, #fff5e6, #ffd8b8, #c1d8f0)";
    document.body.style.color ="#333333";
    toggle.classList.remove("bi-moon");
    toggle.classList.add("bi-brightness-high-fill");
    document.body.style.transition = "2s";
    bgChange.style.color = "#B38B6D"; // Earthy tan (softer than orange)
    bgChange.style.transition = " 0.5s ease";
    document.querySelectorAll(".container, .container2, .container3").forEach(container => {
        container.style.background = "rgba(255, 255, 255, 0.7)";
    container.style.backdropFilter = "blur(8px)";
    container.style.border = "1px solid rgba(255, 255, 255, 0.3)";

    });

    setTimeout(()=>{
        Pop.style.display = "none";

    },2000);
    Pop.src = "speech-bubble2.we.PNG";
    Pop.style.display = "block";



    

}

function applydarkTheme(){
        //document.body.style.background =  "linear-gradient(654deg, #006f5a, #2a2a3f)";
        document.body.style.background = "linear-gradient(160deg, #0f2027, #203a43, #2c5364)";
        document.body.style.color = "#a8a8a8";
        toggle.classList.remove("bi-brightness-high-fill");
        toggle.classList.add("bi-moon");
        document.body.style.transition = "2s";
        bgChange.style.color = "#7a7a7a";
        bgChange.style.transition = " background 0.5s ease, color 0.5s ease";
        

        //bgChange.style.transition = "2s";
        document.querySelectorAll(".container, .container2, .container3").forEach(container => {
            container.style.background = "rgba(15, 32, 39, 0.7)"; // Semi-transparent dark teal
            container.style.backdropFilter = "blur(8px)";
            container.style.border = "1px solid rgba(255, 255, 255, 0.1)"; // Subtle border
    });


        
        
        setTimeout(()=>{
        Pop.style.display = "none";
        },2000);
        Pop.src = "speech-bubble.we.png";
        Pop.style.display = "block";


        return;
}


// API Key
let Upi_key = '7cab309e891748b2b7e121210252103';

// Load the last valid weather data from local storage
function getLastWeatherData() {
    let lastData = localStorage.getItem("lastWeatherData");
    return lastData ? JSON.parse(lastData) : null;
}



// Save the last valid weather data to local storage
function saveWeatherData(data) {
    localStorage.setItem("lastWeatherData", JSON.stringify(data));
}

// Main function to fetch weather data for a given city
async function checkWeath(city, cityNumber2, cityNumber3) {

    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${Upi_key}&q=${encodeURIComponent(city)}&aqi=no`);
        let data = await response.json();
        console.log(`Weather Data for ${city}:`, data);

        // If the city is not found, use the last valid data
        if (!data || !data.current || !data.location) {
            console.error("City not found: ", data);
            let lastData = getLastWeatherData();
       
            // Show "Not Found" temporarily
            body_image.src = "nofound.we.png";
            cityName.innerHTML = "City not found";
            weathertype1.innerHTML = "";
            humidity.innerHTML = "--°F"
            speed.innerHTML = "-- mph"

            // Reset to last valid data or default values after 2 seconds
            setTimeout(() => {
                if (lastData) {
                    cityName.innerHTML = "Please enter a valid name!";
                    temp.innerHTML = "?";
                    humidity.innerHTML = "?";
                    speed.innerHTML = "?";
                    body_image.src = "";
                    weathertype1.innerHTML = "";
                } else {
                    cityName.innerHTML = "Enter City";
                    temp.innerHTML = "--°F";
                    humidity.innerHTML = "--%";
                    speed.innerHTML = "-- mph";
                    body_image.src = "";


                }
            }, 2000);
            return;
        }

        
        // Prepare weather data for display
        let weatherData = {
            name: data.location.name,
            temp: Math.floor(data.current.temp_f) + "°F",
            humidity: data.current.humidity + "%",
            speed: data.current.wind_mph + " mph",
            condition: data.current.condition.text.toLowerCase(),
            image: "nofound.we.png"
        };

        console.log("Weather condition:", weatherData.condition);
        

                // Determine the appropriate image based on weather condition
                if (weatherData.condition.toLowerCase().includes("clear")){
                    weatherData.image = "clear-day.we.png"
            } else if (weatherData.condition.toLowerCase().includes("sunny")){
                    weatherData.image = "sun.we.png"
            }else if(weatherData.condition.toLowerCase().includes("mostly sunny")) {
                weatherData.image = "mostly-sun.png";   
            } else if (weatherData.condition.toLowerCase().includes("partly cloudy")) {
                weatherData.image = "partly-cloudy.we.png";        
            } else if (weatherData.condition.toLowerCase().includes("cloud")) {
                weatherData.image = "clouds.we.png";
            } else if (weatherData.condition.toLowerCase().includes("overcast")) { // Ensure case-insensitive match
                weatherData.image = "overcast.we.png";        
            } else if (weatherData.condition.toLowerCase().includes("drizzle") || weatherData.condition.toLowerCase().includes("light drizzle")) {
                weatherData.image = "drizzle.we.png";
            } else if (weatherData.condition.toLowerCase().includes("mist")) {
                weatherData.image = "mist.we.png";
            } else if (weatherData.condition.toLowerCase().includes("haze")) {
                weatherData.image = "haze.we.png";
            } else if(weatherData.condition.toLowerCase().includes("snow")){
                weatherData.image = "snow.we.png";
            }else if(weatherData.condition.toLowerCase().includes("thunderstorm")){
                weatherData.image = "thunderstorm.we.png";
            } else if(weatherData.condition.toLowerCase().includes("tornado")){
                weatherData.image = "tornado.we.png";
            }else if(weatherData.condition.toLowerCase().includes("fog")){
                weatherData.image = "fog.we.png";
            }else if(weatherData.condition.toLowerCase().includes("patchy light rain with thunder")){
                weatherData.image = "patchy-rain-thun.png";
            }else if(weatherData.condition.toLowerCase().includes("moderate or heavy rain with thunder")){
                weatherData.image = "moderate.rain.png";
            }else if(weatherData.condition.toLowerCase().includes("light rain")){
                weatherData.image = "light-rain.png";
            }else if (weatherData.condition.toLowerCase().includes("rain")) {
                weatherData.image = "rainy-day.png";
        
            } else {
                console.warn("No matching weather condition found");
                weatherData.image = "nofound.we.png"; // Default image
            }
  
    
             // Update specific sections based on city number
if (cityNumber2 === 1) {
    cityName.innerHTML = weatherData.name;
    temp.innerHTML = weatherData.temp;
    humidity.innerHTML = weatherData.humidity;
    speed.innerHTML = weatherData.speed;
    body_image.src = weatherData.image;
    weathertype1.innerHTML = weatherData.condition;
    body_detail.style.display = "flex"; // Show the section for inputed city
    detail.style.display = "flex"; // Show the details f
    
} else if(cityNumber2 === 2){
    cityName2.innerHTML = weatherData.name;
    temp2.innerHTML = weatherData.temp;
    humidity2.innerHTML = weatherData.humidity;
    speed2.innerHTML = weatherData.speed;
    body_image2.src = weatherData.image; 
    weathertype2.innerHTML = weatherData.condition;
    body_detail2.style.display = "flex"; // Show the section for London
    detail2.style.display = "flex"; // Show the details for London

}else if(cityNumber3 === 3){
    cityName3.innerHTML = weatherData.name;
    temp3.innerHTML = weatherData.temp;
    humidity3.innerHTML = weatherData.humidity;
    speed3.innerHTML = weatherData.speed;
    body_image3.src = weatherData.image; 
    weathertype3.innerHTML = weatherData.condition;
    body_detail3.style.display = "flex"; // Show the section for London
    detail3.style.display = "flex"; // Show the details for London
}  
    

        

        // Update UI with valid data
       // cityName.innerHTML = weatherData.name;
        //temp.innerHTML = weatherData.temp;
        //humidity.innerHTML = weatherData.humidity;
        //speed.innerHTML = weatherData.speed;
        //body_image.src = weatherData.image;

        // Save valid weather data to local storage
        saveWeatherData(weatherData);

        

    } catch (error) {
        console.error("Error fetching weather data", error);
    }
}

// Call the function for London and Kinshasa with the corresponding city numbers

checkWeath("London", 2, 0);
checkWeath("Kinshasa", 0, 3);



// Event listener for search icon click
searchIcon.addEventListener('click', () => {
    // Check if the input is empty
    if (searchInput.value.trim() === "") {
        alert("Enter a city");
    } 
    // Check if the input contains numbers
    else if (/\d/.test(searchInput.value)) {
        alert("Can't enter numbers");
        // Apply scale effect for invalid input
        searchIcon.style.transform = "scale(1.08)";
        setTimeout(() => {
            searchIcon.style.transform = "scale(1)";
        }, 200);
    } 
    // If the input is valid, apply the scale effect
    else {
        searchIcon.style.transform = "scale(1.08)";
        setTimeout(() => {
            searchIcon.style.transform = "scale(1)";
        }, 200);
        checkWeath(searchInput.value);
        detail.style.display = "flex";
        body_detail.style.display = "flex";

            // Clear the input after search
       
    }
    checkWeath(searchInput.value, 1, 0);

});





