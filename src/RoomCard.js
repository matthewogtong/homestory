class RoomCard {
    constructor(roomData) {
        this.roomData = roomData
    }

    renderRoomPage = () => {
        // REMOVE HOME PAGE NAV
        this.nav.remove()
        console.log(this.roomData.name)

        // RENDER ROOM NAME H1
        const roomName = document.createElement("h1")
        roomName.textContent = this.roomData.name

        // RENDER ROOM PAGE NAV
        const roomPageNav = document.createElement("nav")
        roomPageNav.setAttribute("id", "room-page-nav")

        const homeLi = document.createElement('li')
        homeLi.textContent = 'Home'

        // ADD EVENT LISTENER FOR HOME
        homeLi.addEventListener('click', () => {
            const nav = document.createElement('nav')
            roomName.remove()
            roomPageNav.remove()
            const formDiv = document.querySelector('#modal-div-container')
            formDiv.remove()
            nav.setAttribute("id", "rooms-nav")
            body.append(nav)
            getRooms()
        })

        // STRETCH GOAL - GET ALL ROOMS TO SHOW AND FUNCTION PROPERLY FOR ROOM PAGE NAVBAR
        // client.get("/rooms")
        //     .then(roomsArray => {
        //         roomsArray.forEach(room => {
        //             if(room.name !== this.roomData.name) {
        //                 const li = document.createElement("li")
        //                 li.textContent = room.name
        //                 roomPageNav.append(li)
        //             }
        //         })
        //     })
        // APPEND TO BODY
        body.append(roomName)
        roomPageNav.append(homeLi)
        body.append(roomPageNav)

        // FORM ELEMENTS
        renderFurnitureForm()

        
        getRoomItems(this.roomData)
    }

    render = () => {
        const li = document.createElement("li")
        li.dataset.id = this.roomData.id
        li.textContent = this.roomData.name

        this.nav = document.querySelector("#rooms-nav")
        this.nav.append(li)
        body.append(this.nav)

        li.addEventListener("click", this.renderRoomPage)
    }
}