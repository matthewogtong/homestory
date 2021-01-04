// STATE VARIABLES


// DOM ELEMENTS

const roomNav = document.querySelector('#rooms-nav')

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

const renderRoom = (roomObj) => {
    const roomLi = document.createElement('li')
    roomLi.textContent = roomObj.name 
    roomNav.append(roomLi)

}

// INITIAL RENDER
getRooms()

