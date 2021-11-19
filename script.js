const apiKey = 'at_yC5cpL6qcU3Gey9kWKcLFMufpoSdW'

const apiURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=`

let ipAddress = ''

let body= document.querySelector('body')

let map;
//elements to search for an ip Address
const searchBtn = document.querySelector('.search')
const form = document.querySelector('form')

//elements for displaying results 
const ipAddressDisplay = document.querySelector('.box1 p')
const cityDisplay = document.querySelector('.box2 .city')
const countryDisplay = document.querySelector('.box2 .country')
const timeZoneDisplay = document.querySelector('.box3 p')
const ispDisplay = document.querySelector('.box4 p')
const error = document.querySelector('.error')


//get data from api, by default it takes the user ip Address
async function getData() {
    const response = await fetch(apiURL+ipAddress)
    const results = await response.json()
    console.log(results)
    if(results.ip === undefined){
        error.style.display = 'block'
        console.log('erreur')
        ipAddressDisplay.textContent = '--'
        cityDisplay.textContent = '--' 
        countryDisplay.textContent = '--'
        timeZoneDisplay.textContent = '--'
        ispDisplay.textContent = '--'
        return
    }
    else {
        error.style.display = 'none'
   
        //get latitude and longitude
        let latitude = results.location.lat
        let longitude = results.location.lng 

        //Display infos
        ipAddressDisplay.textContent = results.ip
        cityDisplay.textContent = results.location.city 
        countryDisplay.textContent = results.location.country
        timeZoneDisplay.textContent = "UTC" + results.location.timezone
        ispDisplay.textContent = results.isp

        //Display map
        map = document.createElement('div')
        body.appendChild(map)
        map.id = 'map'
        let mymap = L.map('map').setView([latitude, longitude], 13);

        //adding tile layer
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXN0ZXZhIiwiYSI6ImNrdnpsMjFlbzA2dmQyd3BxYmszMTBjaWgifQ.B566jerFzMnpk0FIr8Cjcg'
        }).addTo(mymap);

        //add marker
        let marker = L.marker([latitude, longitude]).addTo(mymap)
    }
  
}

getData()

//searching for an ipAddress and get results
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchValue = searchBtn.value
    console.log(searchValue)
    ipAddress = searchValue
    map.remove()
    getData()
})