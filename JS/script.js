const asteroidsContainer = document.querySelector('.asteroids-container')

const API_KEY = '7jqBs12Pyyziu5I9w0kyHVyzX3rucb7QxcdvgHIF'

const date = new Date()
const nextDay = `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate() + 1}`

fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        Object.keys(data.near_earth_objects).forEach(key => {
            if(key === nextDay) {
                console.log('All near eaarth objects next day:')
                data.near_earth_objects[key].forEach(item => {
                    //console.log(object)
                    fetch(item.links.self)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            createAsteroid(data.name, data.is_potentially_hazardous_asteroid)
                        })
                        .catch(err => console.error(err))
                })
            }
        })
    })
    .catch(err => console.error(err))

const createAsteroid = (name, isDangerous) => {
    const asteroid = document.createElement('div')
    const asteroidName = document.createElement('h3')
    const dangerInfo = document.createElement('p')
    dangerInfo.textContent = `Is potentially dangerous: ${isDangerous ? 'Yes' : 'No'}`
    asteroidName.textContent = `Name: ${name}`
    asteroid.classList.add('asteroid')
    asteroid.append(asteroidName)
    asteroid.append(dangerInfo)
    asteroidsContainer.append(asteroid)
}