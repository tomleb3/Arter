import { itemService } from "../../services/itemService"

export function loadItems(filterBy) {
    return async dispatch => {
        try {
            const items = await itemService.query(filterBy)
            if (!filterBy) dispatch({ type: 'SET_ITEMS', items })
            return items
        } catch (err) {
            console.log('itemActions:', err)
        }
    }
}

export function addItem(item) {
    // console.log('item!!', item)
    return async dispatch => {
        try {
            const addedItem = await itemService.add(item)
            dispatch({ type: 'ADD_ITEM', item: addedItem })
        } catch (err) {
            console.log('itemActions:', err)
        }
    }
}

export function editItem(item) {
    // console.log('item', item)
    return async dispatch => {
        try {
            const editedItem = await itemService.update(item)
            dispatch({ type: 'EDIT_ITEM', item: editedItem })
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