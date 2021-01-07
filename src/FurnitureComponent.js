class FurnitureComponent {
    constructor(furnitureData) {
        this.furnitureData = furnitureData
    }

    renderFurniture = () => {
        const divOne = document.createElement("div")
        const divTwo = document.createElement("div")
        const divThree = document.createElement("div")
        const divFour = document.createElement("div")
        const divFive = document.createElement("div")

        divOne.classList.add("flip-card")
        divTwo.classList.add("flip-card-inner")
        divThree.classList.add("flip-card-front")
        divFour.classList.add("flip-card-back")
        divFive.classList.add("form-holder-div")

        const img = document.createElement("img")
        img.src = this.furnitureData.image
        img.alt = this.furnitureData.name
        
        // BACK OF FURNITURE CARD
        this.form = document.createElement("form")
        this.form.setAttribute("id", "edit-form")
        this.form.dataset.id = this.furnitureData.id
        this.form.innerHTML = `
            <form>
                <div class="name-div">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" name="name" class="form-control" value=${this.furnitureData.name}>
                </div>
                <div class="url-div">
                    <label for="url" class="form-label">Website</label>
                    <input type="text" name="url" class="form-control" value=${this.furnitureData.url}>
                </div>
                <div class="price-div">
                    <label for="price" class="form-label">Price</label>
                    <input type="text" name="price" step="0.01" min=0 class="form-control" value="$ ${this.furnitureData.price}">
                 </div>
                 <div class="notes-div">
                    <label for="notes" class="form-label">Notes</label>
                    <textarea name="notes" class="form-control">${this.furnitureData.notes}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        `;
        
        // ROOM INFORMATION H6
        const h6 = document.createElement("h6")
        h6.textContent = "Item Info"
        h6.classList.add("furniture-item")
        
        // DELETE BUTTON RENDER & EVENT HANDLER
        const deleteButton = document.createElement("button")
        deleteButton.setAttribute("type", "button")
        deleteButton.setAttribute("class", "btn btn-outline-danger")
        deleteButton.dataset.id = this.furnitureData.id
        deleteButton.textContent = "Remove"
        
        deleteButton.addEventListener("click", event => {
            const furnitureId = parseInt(event.target.dataset.id)
            deleteFurnitureObj(furnitureId)
            divOne.remove()
        })
        
        // APPEND TO DOM
        divFive.append(h6, this.form, deleteButton)
        divFour.append(divFive)
        divThree.append(img)
        divTwo.append(divThree, divFour)
        divOne.append(divTwo)
        furnitureGridDiv.append(divOne)

        // UPDATE BUTTON RENDER & EVENT HANDLER
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()
            const price = event.target.price.value
            const splitPrice = price.split()
            const slicedPrice = splitPrice.slice(0)
            console.log(slicedPrice)

            /** EDIT THE PRICE PROPERLY */
            const updatedFurnitureObj = {
                name: event.target.name.value, 
                url: event.target.url.value, 
                price: parseInt(event.target.price.value),
                notes: event.target.notes.value
            }

            client.patch(`/furnitures/${event.target.dataset.id}`, updatedFurnitureObj)
                .then(updatedFurnitureObj => {
                    const updatedObj = new FurnitureComponent(updatedFurnitureObj)
                    updatedObj.renderUpdatedFurnitureComponent()
                })
        })
     
    }

    renderUpdatedFurnitureComponent = () => {
        const form = document.querySelector('#edit-form')
        form.innerHTML = `
        <form>
            <div class="name-div">
                <label for="name" class="form-label">Name</label>
                <input type="text" name="name" class="form-control" value=${this.furnitureData.name}>
            </div>
            <div class="url-div">
                <label for="url" class="form-label">Website</label>
                <input type="text" name="url" class="form-control" value=${this.furnitureData.url}>
            </div>
            <div class="price-div">
                <label for="price" class="form-label">Price</label>
                <input type="text" name="price" step="0.01" min=0 class="form-control" value="$ ${this.furnitureData.price}">
             </div>
             <div class="notes-div">
                <label for="notes" class="form-label">Notes</label>
                <textarea name="notes" class="form-control">${this.furnitureData.notes}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
    }
}

