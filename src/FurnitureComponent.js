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
        const form = document.createElement("form")
        form.setAttribute("id", "edit-form")
        form.dataset.id = this.furnitureData.id
        form.innerHTML = `
            <form>
                <div class="name-div">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" name="name" class="form-control" value="${this.furnitureData.name}">
                </div>
                <div class="url-div">
                    <label for="url" class="form-label">Website URL</label>
                    <input type="text" name="url" class="form-control" value=${this.furnitureData.url}>
                </div>
                <div class="price-div">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" name="price" step="0.01" min=0 class="form-control" placeholder="$" value="${this.furnitureData.price}">
                 </div>
                 <div class="notes-div">
                    <label for="notes" class="form-label">Notes</label>
                    <textarea name="notes" class="form-control">${this.furnitureData.notes}</textarea>
                </div>
                <button type="submit" id="submit-button-color" class="btn btn-primary">Update</button>
                <br>
                <br>
            </form>
        `;
        
        // ROOM INFORMATION H6
        const h5 = document.createElement("h5")
        h5.textContent = "Item Details"
        h5.classList.add("furniture-item")
        
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
        divFive.append(h5, form, deleteButton)
        divFour.append(divFive)
        divThree.append(img)
        divTwo.append(divThree, divFour)
        divOne.append(divTwo)
        furnitureGridDiv.append(divOne)

        // UPDATE BUTTON RENDER & EVENT HANDLER
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            /** EDIT THE PRICE PROPERLY */
            const updatedFurnitureObj = {
                name: event.target.name.value, 
                url: event.target.url.value, 
                price: parseInt(event.target.price.value),
                notes: event.target.notes.value
            }

            client.patch(`/furnitures/${event.target.dataset.id}`, updatedFurnitureObj)

                .then(form.innerHTML = `
                    <form>
                        <div class="name-div">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" name="name" class="form-control" value="${event.target.name.value}">
                        </div>
                        <div class="url-div">
                            <label for="url" class="form-label">Website</label>
                            <input type="text" name="url" class="form-control" value=${event.target.url.value}>
                        </div>
                        <div class="price-div">
                            <label for="price" class="form-label">Price</label>
                            <input type="text" name="price" step="0.01" min=0 class="form-control" value="${event.target.price.value}">
                        </div>
                        <div class="notes-div">
                            <label for="notes" class="form-label">Notes</label>
                            <textarea name="notes" class="form-control">${event.target.notes.value}</textarea>
                        </div>
                        <button type="submit" id="submit-button-color-after" class="btn btn-primary">Updated Successfully!</button>
                    </form>
                `)
        })
     
    }
}

