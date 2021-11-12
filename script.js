const apiKey = 'at_yC5cpL6qcU3Gey9kWKcLFMufpoSdW';

let ipAddress = '8.8.8.8'

const apiURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`


const searchBtn = document.querySelector('.search')
const form = document.querySelector('form')

const ipAddressDisplay = document.querySelector('.box1 p')
const cityDisplay = document.querySelector('.box2 .city')
const countryDisplay = document.querySelector('.box2 .country')
const timeZoneDisplay = document.querySelector('.box3 p')
const ispDisplay = document.querySelector('.box4 p')

async function getData() {
    const response = await fetch(apiURL)
    const results = await response.json()
    console.log(results)

    //Display infos
    ipAddressDisplay.textContent = results.ip
    cityDisplay.textContent = results.location.city 
    countryDisplay.textContent = results.location.country
    timeZoneDisplay.textContent = "UTC" + results.location.timezone
    ispDisplay.textContent = results.isp
}

getData()

// searchBtn.addEventListener('input', (e)=>{
//     ipAddress = e.target.value
//     console.log(ipAddress)
// })