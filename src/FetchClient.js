class FetchClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    get = (endpoint) => {
        return fetch(this.baseUrl + endpoint) // shouldn't return be implicit??
            .then(response => response.json())
    }
}

const baseUrl = "http://localhost:3000"
const client = new FetchClient(baseUrl)

client.get("/rooms")
    .then(console.log)
