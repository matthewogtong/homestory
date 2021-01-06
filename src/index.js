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
const addFurnitureButton = document.querySelector('#add-furniture-room-page-div') 
const furnitureGridDiv = document.querySelector('#furniture-grid-div')

// EVENT HANDLERS


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
                        renderRoomFurniture(roomObj)
                    }
                })
            })
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

/*** APP TITLE DOM ELEMENT */
const title = document.querySelector('.app-title')



