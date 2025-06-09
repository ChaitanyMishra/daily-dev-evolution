
document.addEventListener('DOMContentLoaded', ()=>{
const inputBox = document.querySelector('#inputCity');
const button = document.querySelector('#button');
const wetherOutputDiv = document.querySelector('.wetherOutput');
const cityName = document.querySelector('#cityName');
const temprature = document.querySelector('#temp');
const discription_1 = document.querySelector('#disc');
let errorMsg = document.querySelector('#error');
const Api_Key = "1d5a2af847aea7767c491eb473f36017";


async function findWeather(e){
    if(e.type === 'keypress' && e.key!== 'Enter')return;
    let cityValue = inputBox.value.trim();
    if(cityValue === ""){
        alert("pleas Enter Valid Name")
    }else{
        try{
            const data = await fetchData(cityValue);
            displayData(data)

        }catch(error){
            errorMsgFun();
            errorMsg.textContent = `Error: ${error.message}`;
        }
    }
}

const fetchData = async (cityValue)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${Api_Key}`
    const response = await fetch(url)
    console.log(typeof response)

    if (!response.ok) {
        throw new Error("Invalid city name or API error");
    }
    const data = await response.json();
    console.log(response)
    return data;
    
    
}

function displayData(data)
{
    const {name , main , weather} = data
    console.log(data)
    wetherOutputDiv.classList.remove('hidden')
    cityName.textContent = name
    temprature.textContent = `Temperature : ${main.temp}°C`
    discription_1.textContent = `weather : ${weather[0].description}`
    errorMsg.classList.add('hidden')
}

function errorMsgFun(){
    wetherOutputDiv.classList.add('hidden')
    
    errorMsg.classList.remove('hidden')
}


inputBox.addEventListener('keypress' , findWeather);

button.addEventListener('click' , findWeather);
})