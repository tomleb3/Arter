import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const itemService = {
    add,
    update,
    query,
    save,
    remove,
    getById
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterTxt) {
    var queryStr = (!filterTxt) ? '' : `?tags_like=${filterTxt}`
    return httpService.get(`item/${queryStr}`)
    // return storageService.query('item')
}

function getById(itemId) {
    return httpService.get(`item/${itemId}`)
}

function save(itemToSave) {
    if (itemToSave._id)
        return httpService.put(`item/${itemToSave._id}`, itemToSave) // UPDATE
    else
        return httpService.post('item/', itemToSave) // CREATE
}

function remove(itemId) {
    return httpService.delete(`item/${itemId}`)
    // return storageService.delete('item', itemId)

}
function add(item) {
    return httpService.post(`item`, item)
}

function update(item) {
    // console.log('item', item)
    return httpService.put(`item/${item._id}`, item)
}