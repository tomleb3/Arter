let localLoggedInUser = null
if (localStorage.loggedInUser) localLoggedInUser = JSON.parse(localStorage.loggedInUser)

const initialState = {
  loggedInUser: localLoggedInUser,
  users: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'EDIT_USER':
      return {
        ...state,
        loggedInUser: action.user,
        users: state.users.map(user => (user._id === action.user._id) ? action.user : user)
      }
    case 'REMOVE_REVIEW':
      return
    default:
      return state
  }
}