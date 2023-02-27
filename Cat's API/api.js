class CatsAPI {
    constructor(apiName){
        this.url = `https://cats.petiteweb.dev/api/single/${apiName}`;
    }

    getAllCats() {
        return fetch(`${this.url}/show`)
    }

    getCurrentCat(id) {
        return fetch(`${this.url}/show/${id}`)
    }

    deleteCurrentCat(id) {
        return fetch(`${this.url}/delete/${id}`)
    }
}

const api = new CatsAPI('karma1703')