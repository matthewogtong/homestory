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
        h2.classList.add(`room-id-${this.roomData.id}`)
        
        div.append(h2)
        roomsHomePageNav.append(div)


       // animateHomePageRooms()

        h2.addEventListener('mouseover', event => {
            console.log('mouseover')
            animateMouseOverRoomComponentRoomPage(this.roomData.id)
        })
        h2.addEventListener('mouseout', event => {
            console.log('mouseout')
            animateMouseOutRoomComponentRoomPage(this.roomData.id)
        })
        h2.addEventListener('click', (event) => {
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
            currentRoomId = parseInt(event.target.dataset.id)
            roomsHomePageNav.innerHTML = " "
            roomRoomPageNav.innerHTML = " "
            furnitureGridDiv.innerHTML = " "
            addFurnitureButtonDiv.innerHTML = " "
            renderRoomPageRoomName(event)
            renderRoomsInNav(event)
        })
    }
}


