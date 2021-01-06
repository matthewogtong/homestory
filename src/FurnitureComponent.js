class FurnitureComponent {
    constructor(furnitureData) {
        this.furnitureData = furnitureData
    }

    renderFurniture = () => {
        const divOne = document.createElement("div")
        const divTwo = document.createElement("div")
        const divThree = document.createElement("div")
        const divFour = document.createElement("div")

        divOne.classList.add("flip-card")
        divTwo.classList.add("flip-card-inner")
        divThree.classList.add("flip-card-front")
        divFour.classList.add("flip-card-back")

        const img = document.createElement("img")
        img.src = this.furnitureData.image
        
        const h1 = document.createElement("h1")
        h1.textContent = this.furnitureData.name
        h1.classList.add("furniture-item")

        divFour.append(h1)
        divThree.append(img)
        divTwo.append(divThree, divFour)
        divOne.append(divTwo)
        furnitureGridDiv.append(divOne)
     
    }

}
// ADD FURNITURE FORM 
const renderFurnitureForm = () => {
    const formDiv = document.createElement("div")
    formDiv.setAttribute("id", "modal-div-container")
    formDiv.innerHTML = `
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add an Item
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Furniture Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="add-item-form" autocomplete="off">
                        <h4>Add Item</h4>
                        <label for="name">Item Name: </label>
                        <input type="text" name="name" id="item-name" />
                        <br>
                        <br>

                        <label for="image">Image: </label>
                        <input type="text" name="image" id="image-url" />
                        <br>
                        <br>

                        <label for="url">Website: </label>
                        <input type="text" name="url" id="website-name" />
                        <br>
                        <br>
                        
                        <label for="price">Price: </label>
                        <input type="number" name="price" id="item-price" />
                        <br>
                        <br>

                        <label for="notes">Notes: </label>
                        <input type="text" name="notes" id="item-notes" />
                        <br>
                        <br>

                        <input type="submit" value="Add Item" />
                        <br>
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    `

    // APPEND ELEMENTS
    body.append(formDiv)
    body.append(itemMain)
    
}
