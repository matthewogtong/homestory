// STATE VARIABLES


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

// EVENT HANDLERS


// FETCH FUNCTIONS


// RENDER FUNCTIONS
    //**RENDER ROOMS NAV*/
const renderRoomsNavForHome = () => {
    client.get("/rooms")
        .then(roomsArray => {
            roomsArray.forEach(room => {
                const roomComponent = new RoomComponent(room)
                roomComponent.renderForHomePage()
            })
        })
}

// INITIAL RENDER
appTitle.renderForTitlePage()

// RENDERED DOM ELEMENTS

/*** APP TITLE DOM ELEMENT */
const title = document.querySelector('.app-title')



