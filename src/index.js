// STATE VARIABLES


// DOM ELEMENTS FOR TITLE PAGE
const titlePageTitleDiv = document.querySelector('#title-title-div')
const titleHomePageDiv = document.querySelector('#title-home-page-div')

// DOM ELEMENTS FOR HOME PAGE
const roomsHomePageNav = document.querySelector('#rooms-home-page-nav')

// DOM ELEMENTS FOR ROOM PAGE
const itemMain = document.querySelector("#furniture-items-container")

// EVENT HANDLERS


// FETCH FUNCTIONS
const getRooms = () => {
    client.get("/rooms")
        .then(roomsArray => {
            roomsArray.forEach(room => {
                const roomCard = new RoomCard(room)
                roomCard.render()
            })
        })
}

// RENDER FUNCTIONS


// INITIAL RENDER
appTitle.renderForTitlePage()

// RENDERED DOM ELEMENTS

/*** APP TITLE DOM ELEMENT */
const title = document.querySelector('.app-title')



