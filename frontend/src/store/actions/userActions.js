import { userService } from '../../services/userService'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.query()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}

export function editUser(user) {
  return async dispatch => {
    try {
      const editedUser = await userService.save(user)
      dispatch({ type: 'EDIT_USER', user: editedUser })
    } catch (err) {
      console.log('UserActions: err in addReview', err)
    }
  }
}

export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.login(userCreds)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      throw err
    }
  }
}

export function signup(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.signup(userCreds)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      throw err
    }
  }
}

export function logout() {
  return async dispatch => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('UserActions: err in logout', err)
    }
  }
}