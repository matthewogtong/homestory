class RoomComponent {
    constructor(roomData) {
        this.roomData = roomData
    }

    // RENDER ROOMS NAV
    renderForHomePage = () => {
        const div = document.createElement("div")
        div.classList.add("room-name-div")

        const h2 = document.createElement("h2")
        h2.textContent = this.roomData.name
        h2.dataset.id = this.roomData.id
        h2.classList.add("room-name-h2")
        
        div.append(h2)
        roomsHomePageNav.append(div)

        h2.addEventListener('click', (event) => {
            // const h3 = document.createElement("h3")
            // h3.textContent = event.target.textContent
            // roomNameRoomPage.append(h3)
            renderRoomPageRoomName(event)
            renderRoomsInNav(event)
        })
    }

    renderForRoomPage = () => {
        const li = document.createElement("li")
        li.textContent = this.roomData.name
        li.dataset.id = this.roomData.id
        li.classList.add("room-name-li")
        
        roomRoomPageNav.append(li)

        li.addEventListener('click', (event) => {
            const roomClickedId = event.target.dataset.id
            console.log(roomClickedId)
            roomsHomePageNav.innerHTML = " "
            roomRoomPageNav.innerHTML = " "
            renderRoomPageRoomName(event)
            renderRoomsInNav(event)
        })
    }
}


// HELPER FUNCTIONS
const renderRoomsInNav = (event) => {
    const roomClickedId = event.target.dataset.id
            roomsHomePageNav.innerHTML = " "
            client.get("/rooms")
                .then(arrayOfRoomObjs => {
                    arrayOfRoomObjs.forEach(roomObj => {
                        if (roomClickedId != roomObj.id) {
                            const roomComponent = new RoomComponent(roomObj)
                            roomComponent.renderForRoomPage()
                        }
                    })
                })
}

const renderRoomPageRoomName = (event) => {
    roomNameRoomPage.innerHTML = " "
    const h3 = document.createElement("h3")
    h3.textContent = event.target.textContent
    roomNameRoomPage.append(h3)
}