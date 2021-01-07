// STATE VARIABLES
let currentRoomId = 0

// DOM ELEMENTS FOR TITLE PAGE
const titlePageTitleDiv = document.querySelector('#title-title-div')
const titleHomePageDiv = document.querySelector('#title-home-page-div')

// DOM ELEMENTS FOR HOME PAGE
const roomsHomePageNav = document.querySelector('#rooms-home-page-nav')
const roomNameDiv = document.querySelector('.room-name-div')
const roomNameLi = document.querySelector('.room-name-li')

// DOM ELEMENTS FOR ROOM PAGE
const roomRoomPageNav = document.querySelector('#rooms-room-page-nav')
const roomNameRoomPage = document.querySelector('#room-name-room-page')
const addFurnitureButtonDiv = document.querySelector('#add-furniture-room-page-div') 
const furnitureGridDiv = document.querySelector('#furniture-grid-div')

// FETCH FUNCTIONS


// RENDER FUNCTIONS
    //** RENDER ROOMS NAV IN HOME PAGE*/
const renderRoomsNavForHome = () => {
    client.get("/rooms")
        .then(roomsArray => {
            roomsArray.forEach(room => {
                const roomComponent = new RoomComponent(room)
                roomComponent.renderForHomePage()
            })
        })
}

    // RENDER ROOM NAME IN ROOM PAGE
const renderRoomPageRoomName = (event) => {
    roomNameRoomPage.innerHTML = " "
    const h3 = document.createElement("h3")
    h3.textContent = event.target.textContent
    roomNameRoomPage.append(h3)
}
    //** RENDER ROOMS NAV IN ROOM PAGE */
const renderRoomsInNav = (event) => {
        currentRoomId = parseInt(event.target.dataset.id)
        roomsHomePageNav.innerHTML = " "
        client.get("/rooms")
            .then(arrayOfRoomObjs => {
                currentRoomId = parseInt(currentRoomId)
                arrayOfRoomObjs.forEach(roomObj => {
                    if (currentRoomId != roomObj.id) {
                        const roomComponent = new RoomComponent(roomObj)
                        roomComponent.renderForRoomPage()
                    } else {
                        renderFurnitureForm()
                        renderRoomFurniture(roomObj)
                    }
                })
            })
}
    //** */ RENDER ADD FURNITURE FORM
const renderFurnitureForm = () => {
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
                    <form id="add-furniture-form" autocomplete="off">
                        <h4>Add Item</h4>
                        <label for="name">Furniture Name: </label>
                        <input type="text" name="name" id="furniture-name" />
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
                        <input type="number" name="price" step="0.01" min=0 id="furniture-price" />
                        <br>
                        <br>

                        <label for="notes">Notes: </label>
                        <input type="text" name="notes" id="furniture-notes" />
                        <br>
                        <br>

                        <input type="submit" value="Add Furniture" />
                        <br>
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    `
    addFurnitureButtonDiv.append(formDiv)

    const addFurnitureForm = document.querySelector('#add-furniture-form')
    addFurnitureForm.addEventListener("submit", event => {
        postFurnitureItem(event)
    })
}

    //**POST FURNITURE ITEM FUNCTION */
const postFurnitureItem = (event) => {
    event.preventDefault()

    const newFurnitureObj = {
        name: event.target.name.value,
        image: event.target.image.value, 
        url: event.target.url.value, 
        price: event.target.price.value,
        notes: event.target.notes.value
    }


    client.post("/furnitures", newFurnitureObj)
        .then(console.log)
}

    //**RENDER FURNITURE IN ROOM PAGE */
const renderRoomFurniture = (roomObj) => {
    roomObj.furnitures.forEach(furniture => {
        const furnitureComponent = new FurnitureComponent(furniture)
        furnitureComponent.renderFurniture()
    })
}

// INITIAL RENDER
appTitle.renderForTitlePage()

// RENDERED DOM ELEMENTS

// EVENT HANDLERS

/*** APP TITLE DOM ELEMENT */
const title = document.querySelector('.app-title')





