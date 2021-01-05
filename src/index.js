// STATE VARIABLES


// DOM ELEMENTS

const body = document.querySelector('body')

// EVENT HANDLERS


// FETCH FUNCTIONS
const getRooms = () => {
    fetch('http://localhost:3000/rooms')
        .then(response => response.json())
        .then(roomsArray => {
            roomsArray.forEach(room => {
                renderRoom(room)
            })
        })
}

// RENDER FUNCTIONS

//*** RENDER TITLESCREEN
const renderAppTitle = () => {
    const div = document.createElement("div")
    const h1 = document.createElement("h1")

    div.setAttribute('id', 'app-title-div')
    
    h1.textContent = "HomeStory"
    h1.classList.add('app-title')
    
    body.append(div)
    div.append(h1)
}

//*** RENDER ROOMS
const renderRoom = (roomObj) => {
    const nav = document.createElement('nav')
    nav.setAttribute('id', 'rooms-nav')

    const li = document.createElement('li')
    li.dataset.id = roomObj.id
    li.textContent = roomObj.name 

    nav.append(li)
    body.append(nav)

    li.addEventListener('click', event => {
        renderRoomPage(roomObj)
    })

}

/*** RENDER ROOM PAGE */
const renderRoomPage = (roomObj) => {
    console.log(roomObj.name)
}

// INITIAL RENDER
renderAppTitle()


// RENDERED DOM ELEMENTS

/*** APP TITLE DOM ELEMENT */
const appTitle = document.querySelector('.app-title')

/*** APP TITLE EVENT LISTENER */
appTitle.addEventListener('click', event => {
    getRooms()
    appTitle.remove()
    const h1 = document.createElement('h1')
    h1.setAttribute('id', 'home-title')
    h1.textContent = "HomeStory"
    body.append(h1)
})

