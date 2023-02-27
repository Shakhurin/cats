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

    deleteCat(id) {
        return fetch(`${this.url}/delete/${id}`, {
            method: 'DELETE'
        })
    }
}

const DB_NAME = 'karma1703';

const api = new CatsAPI(DB_NAME);