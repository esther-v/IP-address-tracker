const apiKey = 'at_yC5cpL6qcU3Gey9kWKcLFMufpoSdW'

const apiURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=`

let ipAddress = ''


//initialize the map
let mymap = L.map('map').setView([51.505, -0.09], 13);

//adding tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXN0ZXZhIiwiYSI6ImNrdnpsMjFlbzA2dmQyd3BxYmszMTBjaWgifQ.B566jerFzMnpk0FIr8Cjcg'
}).addTo(mymap);


//elements to search for an ip Address
const searchBtn = document.querySelector('.search')
const form = document.querySelector('form')

//elements for displaying results 
const ipAddressDisplay = document.querySelector('.box1 p')
const cityDisplay = document.querySelector('.box2 .city')
const countryDisplay = document.querySelector('.box2 .country')
const timeZoneDisplay = document.querySelector('.box3 p')
const ispDisplay = document.querySelector('.box4 p')


//get data from api, by default it takes the user ip Address
async function getData() {
    const response = await fetch(apiURL+ipAddress)
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

//searching for an ipAddress and get results
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchValue = searchBtn.value
    console.log(searchValue)
    ipAddress = searchValue
    getData()
})

