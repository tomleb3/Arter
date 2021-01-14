const initialState = {
    users: [],
    // filterBy: { type: 'All', name: '' , inStock: true }
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SAVE_USER':
            return {
                ...state,
                users: state.users.map(user => (user._id === action.user._id) ? action.user : user)
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case 'REMOVE_USER':
            return { ...state, users: state.users.filter(user => user._id !== action.userId) }
        // case 'FILTER_USERS':
        //     return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}