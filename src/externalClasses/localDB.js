import { SITE_STORE_KEY } from '../config'

class LocalDB {
    constructor() {
        this.db = localStorage;
    }

    setItem(key, item) {
        this.db[key] = item
    }

    updateItem(key, item) {
        this.db[key] = item
    }

    getItem(key) {
        return this.db[key]
    }

    getConfigureKey() {
        return SITE_STORE_KEY
    }

    configure(token) {
        this.db[SITE_STORE_KEY] = token
    }
}

let db = new LocalDB()



export default db
