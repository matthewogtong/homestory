// STATE VARIABLES
let currentRoomId = 0
let currentUser = 0
let currentUsername = ""
let loggedIn = false

// DOM ELEMENTS FOR TITLE PAGE
const titlePageTitleDiv = document.querySelector('#title-title-div')
const titleHomePageDiv = document.querySelector('#title-home-page-div')
const titleImgHolder = document.querySelector('#title-img-holder')
const titleFormHolder = document.querySelector('#title-form-holder')
const titleErrorMessage = document.querySelector('#title-error-message')
const titleSignUpErrorMessage = document.querySelector('#title-signup-error-message')
const titleUserNameHolder = document.querySelector('#title-username-holder')
const titleLogOutHolder = document.querySelector('#title-logout-holder')

// DOM ELEMENTS FOR HOME PAGE
const roomsHomePageNav = document.querySelector('#rooms-home-page-nav')
const roomNameDiv = document.querySelector('.room-name-div')
const roomNameLi = document.querySelector('.room-name-li')
const homeUserNameHolder = document.querySelector('#home-username-holder')

// DOM ELEMENTS FOR ROOM PAGE
const roomRoomPageNav = document.querySelector('#rooms-room-page-nav')
const roomNameRoomPage = document.querySelector('#room-name-room-page')
const addFurnitureButtonDiv = document.querySelector('#add-furniture-room-page-div') 
const furnitureGridDiv = document.querySelector('#furniture-grid-div')

// FETCH FUNCTIONS


// RENDER FUNCTIONS

    //** RENDER USER LOGIN FORM IN TITLE PAGE */
const renderUserForm = () => {
        titleLogOutHolder.innerHTML = " "
        const form = document.createElement("form")
        form.classList.add("row", "g-3")

        const divUserInput = document.createElement("div")
        divUserInput.classList.add("col-auto")

        const inputLabel = document.createElement("label")
        inputLabel.setAttribute("for", "username")
        inputLabel.setAttribute("class", "visually-hidden")

        const usernameInput = document.createElement("input")
        usernameInput.setAttribute("type", "username")
        usernameInput.setAttribute("name", "username")
        usernameInput.classList.add("form-control")
        usernameInput.setAttribute("id", "usernameInput")
        usernameInput.setAttribute("placeholder", "Username")

        const divSubmit = document.createElement("div")
        divSubmit.classList.add("col-auto")

        const button = document.createElement("button")
        button.setAttribute("type", "submit")
        button.classList.add("btn", "btn-primary", "mb-3")
        button.textContent = "Login ~"

        divUserInput.append(inputLabel, usernameInput)
        divSubmit.append(button)
        form.append(divUserInput, divSubmit)
        titleFormHolder.append(form)

        //** EVENT HANDLING USER LOGIN FORM */
        form.addEventListener("submit", event => {
            event.preventDefault()
            titleErrorMessage.innerHTML = ""
            const userInput = event.target.username.value
            
            client.get("/users").then((usersArray) => {
            usersArray.forEach((user) => {
                if (user.username === userInput) {
                currentUser = user.id
                currentUsername = user.username
                loggedIn = true
                titleErrorMessage.innerHTML = ""
                displayLoggedInUserHomePage()
                appTitle.renderForHomePage()
                return renderRoomsNavForHome()
                }
            })
            const userList = []
            usersArray.forEach((user) => {
                userList.push(user.username)
            })

            if(userList.includes(userInput) === false ) {
                const errorMessage = document.createElement("h5")
                errorMessage.textContent = "Invalid Username"
                titleErrorMessage.innerHTML = ""
                titleSignUpErrorMessage.innerHTML = ""
                titleErrorMessage.append(errorMessage)
            }
            })
        }) 
}

const displayLoggedInUserHomePage = () => {
    if (loggedIn) {
        titlePageTitleDiv.innerHTML = ""
        titleFormHolder.innerHTML = ""
        const h3 = document.createElement("h3")
        h3.textContent = `Currently logged in as: ${currentUsername}`
        h3.classList.add("home-username")
        homeUserNameHolder.append(h3)
    }
}

const displayLoggedInUserTitlePage = () => {
    if (loggedIn) {
        const h3 = document.createElement("h3")
        h3.textContent = `Currently logged in as: ${currentUsername}`
        h3.classList.add("title-username")
        titleUserNameHolder.append(h3)
    }
}

/** LOG OUT */
const logOut = () => {
    loggedIn = false
    currentUser = 0
    renderUserForm()
    renderSignUpForm()
    titleUserNameHolder.innerHTML = ""
}

const displayLogOutTitlePage = () => {
    if (loggedIn) {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-warning")
    button.textContent = "Logout"
    titleLogOutHolder.append(button)
    titleFormHolder.innerHTML = ""

    button.addEventListener('click', logOut)
}


    

}
const renderSignUpForm = () => {
    const form = document.createElement("form")
    form.classList.add("row", "g-3")

    const divUserInput = document.createElement("div")
    divUserInput.classList.add("col-auto")

    const inputLabel = document.createElement("label")
    inputLabel.setAttribute("for", "username")
    inputLabel.setAttribute("class", "visually-hidden")

    const usernameInput = document.createElement("input")
    usernameInput.setAttribute("type", "username")
    usernameInput.setAttribute("name", "username")
    usernameInput.classList.add("form-control")
    usernameInput.setAttribute("id", "usernameInput")
    usernameInput.setAttribute("placeholder", "Username")

    const divSubmit = document.createElement("div")
    divSubmit.classList.add("col-auto")

    const button = document.createElement("button")
    button.setAttribute("type", "submit")
    button.classList.add("btn", "btn-primary", "mb-3")
    button.textContent = "Create A New User ~"

    divUserInput.append(inputLabel, usernameInput)
    divSubmit.append(button)
    form.append(divUserInput, divSubmit)
    titleFormHolder.append(form)

    /** EVENT HANDLING USER CREATE FORM */
    form.addEventListener("submit", event => {
        event.preventDefault()
        titleErrorMessage.innerHTML = ""
        titleSignUpErrorMessage.innerHTML = ""
        const userInput = event.target.username.value
        
        client.get("/users")
            .then((usersArray) => {
                const newUserObj = {
                    username: userInput
                }
                let availableUser = true
                usersArray.forEach((user) => {
                    if (user.username === userInput || userInput === "") {
                        availableUser = false
                        titleSignUpErrorMessage.innerHTML = ""
                        const errorMessage = document.createElement("h5")
                        errorMessage.textContent = "Invalid Username or has been taken. Please try again."
                        titleSignUpErrorMessage.append(errorMessage)
                    }
                })
                if (availableUser === true) {
                    client.post("/users", newUserObj)
                        .then(user => {
                            currentUser = user.id
                            currentUsername = user.username
                            loggedIn = true
                            titleErrorMessage.innerHTML = ""
                            titleSignUpErrorMessage.innerHTML = ""
                            displayLoggedInUserHomePage()
                            appTitle.renderForHomePage()
                            return renderRoomsNavForHome()
                        })
                }
        })  
    }) 
}


    //** RENDER ROOMS NAV IN HOME PAGE*/
const renderRoomsNavForHome = () => {
    client.get("/rooms")
        .then(roomsArray => {
            roomsArray.forEach(room => {
                if (room.user.id === currentUser) {
                    const roomComponent = new RoomComponent(room)
                    roomComponent.renderForHomePage()
                }
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
        client.get(`/users/${currentUser}`)
            .then(userInfo => {
                const userRooms = userInfo.rooms
                renderFurnitureForm()
                userRooms.forEach(room => {
                    currentRoomId = parseInt(currentRoomId)
                        const roomComponent = new RoomComponent(room)
                        roomComponent.renderForRoomPage()
                })
            })
        client.get(`/rooms/${currentRoomId}`)
            .then(roomObj => {
                const roomFurnitures = roomObj.furnitures
                roomFurnitures.forEach(furnitureObj => {
                    const furnitureComponent = new FurnitureComponent(furnitureObj)
                    furnitureComponent.renderFurniture()
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

 //**DELETE FURNITURE ITEM */

const deleteFurnitureObj = (furnitureId) => {
    client.delete(`/furnitures/${furnitureId}`)
}

// INITIAL RENDER
appTitle.renderForTitlePage()


/*** APP TITLE DOM ELEMENT */
const title = document.querySelector('.app-title')

//**ANIMATIONS */

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
        left: '220px',
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


