class AppTitleComponent {
    constructor(title) {
        this.title = title
    }

    //*** RENDER TITLESCREEN
    renderForTitlePage = () => {
        const h1 = document.createElement("h1")
        h1.textContent = this.title
        h1.classList.add("h1-title-title")

        titlePageTitleDiv.append(h1)

        /*** APP TITLE EVENT LISTENER FOR HOME PAGE */

        h1.addEventListener("click", (event) => {
        //   getRooms()

          h1.remove()

          appTitle.renderForHomePage()
        })
    }

    renderForHomePage = () => {
        const h1 = document.createElement("h1")
        h1.textContent = this.title
        h1.classList.add("h1-title-home")

        titleHomePageDiv.append(h1)
    }
}

const appTitle = new AppTitleComponent("HomeStory")
