import { itemService } from "../../services/itemService"

export function loadItems(filterBy) {
    return async dispatch => {
        try {
            const items = await itemService.query(filterBy)
            dispatch({ type: 'SET_ITEMS', items })
        } catch (err) {
            console.log('itemActions:', err)
        }
    }
}

export function addItem(item) {
    return async dispatch => {
        try {
            const addedItem = itemService.saveItem(item)
            dispatch({ type: 'ADD_ITEM', review: addedItem })
        } catch (err) {
            console.log('itemActions:', err)
        }
    }
}

export function updateItem(item) {
    return async dispatch => {
        try {
            const addedItem = itemService.saveItem(item)
            dispatch({ type: 'SAVE_ITEM', review: addedItem })
        } catch (err) {
            console.log('itemActions:', err)
        }
    }
}

export function removeItem(itemId) {
    return async dispatch => {
        try {
            await itemService.remove(itemId)
            dispatch({ type: 'REMOVE_ITEM', itemId })
        } catch (err) {
            console.log('itemActions:', err)
        }
    }
}

// export function setFilter(filterBy) {
//     return (dispatch) => {
//         const action = {
//             type: 'FILTER_ITEMS',
//             filterBy
//         }
//         dispatch(action)
//     }
// }