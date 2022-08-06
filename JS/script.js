const asteroidsContainer = document.querySelector('.asteroids-container')
//const infoCards = document.getElementsByClassName('asteroid')
const passingDate = document.querySelector('.date')

const API_KEY = '7jqBs12Pyyziu5I9w0kyHVyzX3rucb7QxcdvgHIF'

const date = new Date()
const nextDay = `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate() + 1}`

passingDate.textContent = `Passing earth on ${nextDay}`

fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        Object.keys(data.near_earth_objects).forEach(key => {
            if(key === nextDay) {
                data.near_earth_objects[key].forEach(item => {
                    //console.log(object)
                    fetch(item.links.self)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            createAsteroidCard(
                                data.name, 
                                data.is_potentially_hazardous_asteroid,
                                data.estimated_diameter.meters.estimated_diameter_min,
                                data.estimated_diameter.meters.estimated_diameter_max
                            )
                        })
                        .catch(err => console.error(err))
                })
            }
        })
    })
    .catch(err => console.error(err))

const createAsteroidCard = (name, isDangerous, diameterMin, diameterMax) => {
    //Creating elements for asteroid card
    const asteroid = document.createElement('div')
    const asteroidName = document.createElement('h3')
    const dangerInfo = document.createElement('p')
    const asteroidDiameter = document.createElement('p')

    //Adding text content
    dangerInfo.textContent = `Is potentially dangerous: ${isDangerous ? 'Yes' : 'No'}`
    asteroidName.textContent = name
    asteroidDiameter.textContent = `Diameter: ${Math.floor(diameterMin)}m - ${Math.floor(diameterMax)}m`

    //Appending classes and elements to parent element
    asteroid.classList.add('asteroid')
    asteroid.append(asteroidName)
    asteroid.append(dangerInfo)
    asteroid.append(asteroidDiameter)

    //Appending whole card to parent element
    asteroidsContainer.append(asteroid)
}