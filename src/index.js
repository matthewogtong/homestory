// STATE VARIABLES


// DOM ELEMENTS

const body = document.querySelector('body')

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


//*** RENDER TITLESCREEN
const renderAppTitle = () => {
    const div = document.createElement("div")
    const h1 = document.createElement("h1")

    div.setAttribute('id', 'app-title-div')
    
    h1.textContent = "HomeStory"
    h1.classList.add('app-title')
    
    body.append(div)
    div.append(h1)

    /*** APP TITLE EVENT LISTENER FOR HOME PAGE */

    h1.addEventListener("click", () => {
      getRooms()
      
      const div = document.querySelector("#app-title-div")
      div.remove()

      const h1 = document.createElement("h1")
      h1.setAttribute("id", "home-title")
      h1.textContent = "HomeStory"

      const nav = document.createElement('nav')
      nav.setAttribute("id", "rooms-nav")

      body.append(h1)
      body.append(nav)


      h1.addEventListener("click", () => {
        titlePage()
      })
    })
}

// INITIAL RENDER
renderAppTitle()

// CLEAR DOM FOR TITLE PAGE
const titlePage = () => {
    body.innerHTML = ""
    renderAppTitle()
}

// RENDERED DOM ELEMENTS

/*** APP TITLE DOM ELEMENT */
const appTitle = document.querySelector('.app-title')



