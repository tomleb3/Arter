import { userService } from "../../services/userService"

export function loadUsers(filterBy) {
    return async dispatch => {
        try {
            const users = await userService.query(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('userActions:', err)
        }
    }
}

export function addUser(user) {
    return async dispatch => {
        try {
            const addedUser = userService.saveUser(user)
            dispatch({ type: 'ADD_USER', review: addedUser })
        } catch (err) {
            console.log('userActions:', err)
        }
    }
}

export function updateUser(user) {
    return async dispatch => {
        try {
            const addedUser = userService.saveUser(user)
            dispatch({ type: 'SAVE_USER', review: addedUser })
        } catch (err) {
            console.log('userActions:', err)
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            const removedUser = await userService.removeUser(userId)
            dispatch({ type: 'REMOVE_USER', removedUser })
        } catch (err) {
            console.log('userActions:', err)
        }
    }
}

// export function setFilter(filterBy) {
//     return (dispatch) => {
//         const action = {
//             type: 'FILTER_USERS',
//             filterBy
//         }
//         dispatch(action)
//     }
// }