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
            nav.setAttribute("id", "rooms-nav")
            body.append(nav)
            getRooms()
        })

        console.log(this.roomData)


        // APPEND TO BODY
        body.append(roomName)
        roomPageNav.append(homeLi)
        body.append(roomPageNav)
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