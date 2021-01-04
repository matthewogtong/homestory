// STATE VARIABLES


// DOM ELEMENTS

const roomNav = document.querySelector('#rooms-nav')
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
    const h1 = document.createElement("h1")
    h1.textContent = "HomeStory"
    h1.classList.add('app-title')
    body.append(h1)
}

//*** RENDER ROOMS
const renderRoom = (roomObj) => {
    const roomLi = document.createElement('li')
    roomLi.dataset.id = roomObj.id
    roomLi.textContent = roomObj.name 
    roomNav.append(roomLi)

    roomLi.addEventListener('click', event => {
        renderRoomPage()
    })

}

/*** RENDER ROOM PAGE */
const renderRoomPage = () => {
    console.log('success')
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
})

