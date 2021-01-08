// STATE VARIABLES
let currentRoomId = 0

// DOM ELEMENTS FOR TITLE PAGE
const titlePageTitleDiv = document.querySelector('#title-title-div')
const titleHomePageDiv = document.querySelector('#title-home-page-div')
const titleImgHolder = document.querySelector('#title-img-holder')
const titleFormHolder = document.querySelector('#title-form-holder')

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

    //** RENDER USER LOGIN FORM IN TITLE PAGE */
const renderUserForm = () => {
    const form = document.createElement("form")
    form.classList.add("row", "g-3")

    const divUserInput = document.createElement("div")
    divUserInput.classList.add("col-auto")

    const inputLabel = document.createElement("label")
    inputLabel.setAttribute("for", "username")
    inputLabel.setAttribute("class", "visually-hidden")

    const usernameInput = document.createElement("input")
    usernameInput.setAttribute("type", "username")
    usernameInput.classList.add("form-control")
    usernameInput.setAttribute("id", "usernameInput")
    usernameInput.setAttribute("placeholder", "Username")

    const divSubmit = document.createElement("div")
    divSubmit.classList.add("col-auto")

    const button = document.createElement("button")
    button.setAttribute("type", "submit")
    button.classList.add("btn", "btn-primary", "mb-3")
    button.textContent = "Begin ~"

    divUserInput.append(inputLabel, usernameInput)
    divSubmit.append(button)
    form.append(divUserInput, divSubmit)
    titleFormHolder.append(form)
}

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
    h3.textContent = `${event.target.textContent} Inspiration`
    h3.classList.add("room-name-title")
    roomNameRoomPage.append(h3)
}
    //** RENDER ROOMS NAV IN ROOM PAGE */
const renderRoomsInNav = (event) => {
        currentRoomId = parseInt(event.target.dataset.id)
        roomsHomePageNav.innerHTML = " "
        client.get("/rooms")
            .then(arrayOfRoomObjs => {
                renderFurnitureForm()
                currentRoomId = parseInt(currentRoomId)
                arrayOfRoomObjs.forEach(roomObj => {
                    if (currentRoomId != roomObj.id) {
                        const roomComponent = new RoomComponent(roomObj)
                        roomComponent.renderForRoomPage()
                    } else {
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
    <button type="button" class="btn btn-primary" id="add-furniture-button-color" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add a Furniture Item
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" id="modal-content-background-color">
                <div class="modal-header">
                    <h4 class="modal-title" id="modal-label-title">Add Item</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="add-furniture-form" autocomplete="off">
                        <h5> Item Details</h5>
                        <label for="name">Name</label>
                        <br>
                        <input type="text" name="name" id="furniture-name" />
                        <br>
                        <br>

                        <label for="image">Image</label>
                        <br>
                        <input type="text" name="image" id="image-url" />
                        <br>
                        <br>

                        <label for="url">Website</label>
                        <br>
                        <input type="text" name="url" id="website-name" />
                        <br>
                        <br>
                        
                        <label for="price">Price</label>
                        <br>
                        <input type="number" name="price" step="0.01" min=0 placeholder="$" id="furniture-price" />
                        <br>
                        <br>

                        <label for="notes">Notes</label>
                        <br>
                        <textarea type="text" name="notes" id="furniture-notes" /></textarea>
                        <br>
                        <br>

                        <input type="submit" id="modal-submit-furniture" value="Add Furniture" />
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
        notes: event.target.notes.value,
        room_id: currentRoomId
    }

    client.post("/furnitures", newFurnitureObj)
        .then(newFurnitureObj => {
            const furnitureComponent = new FurnitureComponent(newFurnitureObj)
            furnitureComponent.renderFurniture()
        })
    
    event.target.reset()
}

    //**UPDATE FURNITURE ITEM FUNCTION */

    //**RENDER FURNITURE IN ROOM PAGE */
const renderRoomFurniture = (roomObj) => {
    roomObj.furnitures.forEach(furniture => {
        const furnitureComponent = new FurnitureComponent(furniture)
        furnitureComponent.renderFurniture()
    })
}

 //**DELETE FURNITURE ITEM */

const deleteFurnitureObj = (furnitureId) => {
    client.delete(`/furnitures/${furnitureId}`)
}

// INITIAL RENDER
appTitle.renderForTitlePage()

// RENDERED DOM ELEMENTS

// EVENT HANDLERS

/*** APP TITLE DOM ELEMENT */
const title = document.querySelector('.app-title')

//**Animations */

// TITLE PAGE ANIMATIONS
const animateTitle = () => {
    anime({
      targets: ".h1-title-title",
      left: "150px",
      backgroundColor: "#fae3d9",
      borderRadius: ["75%", "100%"],
      easing: "easeInOutQuad",
    });
}

const animateMouseOverTitleComponentTitlePage = () => {
    anime({
        targets: ".h1-title-title",
        left: '200px',
        backgroundColor: '#FFF',
        borderRadius: ['25%', '100%'],
        easing: 'easeInOutQuad'
      });
}

// HOME PAGE ANIMATIONS
const animateHomePageRooms = () => {
    anime({
    targets: ".room-name-h2",
    translateX: 100,
    });
}

const animateMouseOverRoomComponentRoomPage = (roomDataId) => {
    anime({
        targets: `.room-id-${roomDataId}`,
        translateX: 250,
        duration: 800
      });
}

const animateMouseOutRoomComponentRoomPage = (roomDataId) => {
    anime({
        targets: `.room-id-${roomDataId}`,
        translateX: 20,
        duration: 800
      });
}
// INITIAL ANIMATION
animateTitle()


