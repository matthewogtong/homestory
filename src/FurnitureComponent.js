class FurnitureComponent {
    constructor(furnitureData) {
        this.furnitureData = furnitureData
    }

    renderFurniture = () => {
        console.log(this.furnitureData)
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
        
        const form = document.createElement("form")
        form.setAttribute("id", "edit-form")
        form.innerHTML = `
            <form>
                <div class="name-div">
                    <label for="nameLabel" class="form-label">Name</label>
                    <input type="text" class="form-control" value=${this.furnitureData.name}>
                </div>
                <div class="url-div">
                    <label for="urlLabel" class="form-label">Website</label>
                    <input type="text" class="form-control" value=${this.furnitureData.url}>
                </div>
                <div class="price-div">
                    <label for="priceLabel" class="form-label">Price</label>
                    <input type="text" step="0.01" min=0 class="form-control" value="$ ${this.furnitureData.price}">
                 </div>
                 <div class="notes-div">
                    <label for="notesLabel" class="form-label">Notes</label>
                    <textarea class="form-control">${this.furnitureData.notes}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        `;
        

        const h6 = document.createElement("h6")
        h6.textContent = "Item Info"
        h6.classList.add("furniture-item")

        divFive.append(h6, form)
        divFour.append(divFive)
        divThree.append(img)
        divTwo.append(divThree, divFour)
        divOne.append(divTwo)
        furnitureGridDiv.append(divOne)
     
    }

}
