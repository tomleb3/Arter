const initialState = {
    items: [],
    // filterBy: { type: 'All', name: '' , inStock: true }
}

export function itemReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ITEMS':
            return { ...state, items: action.items }
        case 'EDIT_ITEM':
            return {
                ...state,
                items: state.items.map(item => (item._id === action.item._id) ? action.item : item)
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.item]
            }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item._id !== action.itemId) }
        default:
            return state
    }
} 




// case 'FILTER_ITEMS':
        //     return { ...state, filterBy: action.filterBy }