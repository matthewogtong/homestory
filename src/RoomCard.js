class RoomCard {
    constructor(roomData) {
        this.roomData = roomData
    }

    renderRoomPage = () => {
        console.log(this.roomData.name)
    }

    render = () => {
        const nav = document.createElement("nav")
        nav.setAttribute("id", "rooms-nav")

        const li = document.createElement("li")
        li.dataset.id = this.roomData.id
        li.textContent = this.roomData.name

        nav.append(li)
        body.append(nav)

        li.addEventListener("click", this.renderRoomPage)
    }
}