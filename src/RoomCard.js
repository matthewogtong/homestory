class RoomCard {
    constructor(roomData) {
        this.roomData = roomData
    }

    renderRoomPage = () => {
        console.log(this.roomData.name)
    }

    

    render = () => {
        const li = document.createElement("li")
        li.dataset.id = this.roomData.id
        li.textContent = this.roomData.name

        const nav = document.querySelector("#rooms-nav")
        nav.append(li)
        body.append(nav)

        li.addEventListener("click", this.renderRoomPage)
    }
}