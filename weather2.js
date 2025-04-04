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

// London-specific DOM elements
const cityName2 = document.getElementById("City2");
const temp2 = document.getElementById("temp2");
const humidity2 = document.getElementById("humidity2");
const speed2 = document.getElementById("speed2");
const body_image2 = document.getElementById("body_image2");
const body_detail2 = document.getElementById("body_detail2");
const detail2 = document.getElementById("detail2");

// Kinshasa-specific DOM elements
const cityName3 = document.getElementById("City3");
const temp3 = document.getElementById("temp3");
const humidity3 = document.getElementById("humidity3");
const speed3 = document.getElementById("speed3");
const body_image3 = document.getElementById("body_image3");
const body_detail3 = document.getElementById("body_detail3");
const detail3 = document.getElementById("detail3");

//BgChange
const toggle = document.getElementById("toggleDark");
const bgChange = document.querySelector(".bgChange");


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
    document.body.style.background =  "linear-gradient(654deg, #006f5a, #2a2a3f)";
    //document.body.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
    document.body.style.color ="black";
    toggle.classList.remove("bi-moon");
    toggle.classList.add("bi-brightness-high-fill");
    document.body.style.transition = "2s";
    bgChange.style.color = "#CC8E00";
    bgChange.style.transition = "2s";
    document.querySelectorAll(".container, .container2, .container3").forEach(container => {
        container.style.background ="linear-gradient(135deg, #006f5a, #2a2a3f)";
    });

    

}

function applydarkTheme(){
        //document.body.style.background =  "linear-gradient(654deg, #006f5a, #2a2a3f)";
        document.body.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
        document.body.style.color = "#686868";
        toggle.classList.remove("bi-brightness-high-fill");
        toggle.classList.add("bi-moon");
        document.body.style.transition = "2s";
        bgChange.style.color ="#505050";
        bgChange.style.transition = "2s";
        document.querySelectorAll(".container, .container2, .container3").forEach(container => {
            container.style.background ="linear-gradient(135deg, #00feba, #5b548a)";
        });

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
                } else {
                    cityName.innerHTML = "Enter City";
                    temp.innerHTML = "--°F";
                    humidity.innerHTML = "--%";
                    speed.innerHTML = "-- mph";
                    body_image.src = "";
                }
            }, 3000);
            return;
        }

        
        // Prepare weather data for display
        let weatherData = {
            name: data.location.name,
            temp: Math.floor(data.current.temp_f) + "°F",
            humidity: data.current.humidity + "%",
            speed: data.current.wind_mph + " mph",
            condition: data.current.condition.text.toLowerCase(),
            image: "sun.we.png"
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
    } else if (weatherData.condition.toLowerCase().includes("rain")) {
        weatherData.image = "heavy-rain.png";
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
    }else {
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
    body_detail.style.display = "flex"; // Show the section for inputed city
    detail.style.display = "flex"; // Show the details f
    
} else if(cityNumber2 === 2){
    cityName2.innerHTML = weatherData.name;
    temp2.innerHTML = weatherData.temp;
    humidity2.innerHTML = weatherData.humidity;
    speed2.innerHTML = weatherData.speed;
    body_image2.src = weatherData.image; 
    body_detail2.style.display = "flex"; // Show the section for London
    detail2.style.display = "flex"; // Show the details for London

}else if(cityNumber3 === 3){
    cityName3.innerHTML = weatherData.name;
    temp3.innerHTML = weatherData.temp;
    humidity3.innerHTML = weatherData.humidity;
    speed3.innerHTML = weatherData.speed;
    body_image3.src = weatherData.image; 
    body_detail3.style.display = "flex"; // Show the section for London
    detail3.style.display = "flex"; // Show the details for London
}  
    

        

        // Update UI with valid data
        cityName.innerHTML = weatherData.name;
        temp.innerHTML = weatherData.temp;
        humidity.innerHTML = weatherData.humidity;
        speed.innerHTML = weatherData.speed;
        body_image.src = weatherData.image;

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
        setTimeout(() => {
            
        }, 2000);
        searchInput.value = ""; // Clear the search input


    }
    
});





