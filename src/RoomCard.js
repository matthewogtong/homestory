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
        
        // ADD FURNITURE FORM 
        const formDiv = document.createElement("div")
        formDiv.setAttribute("id", "modal-div-container")
        formDiv.innerHTML = `
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add an Item
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Furniture Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="add-item-form" autocomplete="off">
                            <h4>Add Item</h4>
                            <label for="name">Item Name: </label>
                            <input type="text" name="name" id="item-name" />
                            <br>
                            <br>

                            <label for="image">Image: </label>
                            <input type="text" name="image" id="image-url" />
                            <br>
                            <br>

                            <label for="url">Website: </label>
                            <input type="text" name="url" id="website-name" />
                            <br>
                            <br>
                            
                            <label for="price">Price: </label>
                            <input type="number" name="price" id="item-price" />
                            <br>
                            <br>

                            <label for="notes">Notes: </label>
                            <input type="text" name="notes" id="item-notes" />
                            <br>
                            <br>

                            <input type="submit" value="Add Item" />
                            <br>
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        `

        // RENDER ITEM SECTION
        const itemMain = document.createElement("main")
        

        // APPEND TO BODY
        body.append(roomName)
        roomPageNav.append(homeLi)
        body.append(roomPageNav)
        body.append(formDiv)
        body.append(itemMain)

        // FORM ELEMENTS
        const addItemForm = document.querySelector("#add-item-form")
        console.log(addItemForm)
        console.log(itemMain)


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