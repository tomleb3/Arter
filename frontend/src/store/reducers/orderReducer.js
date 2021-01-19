const initialState = {
    orders: [],
    // filterBy: { type: 'All', name: '' , inStock: true }
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'EDIT_ORDER':
            return {
                ...state,
                orders: state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            }
        case 'ADD_ORDER':
            return {
                ...state, orders: [...state.orders, action.order]
            }
        case 'REMOVE_ORDER':
            return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
        default:
            return state
    }
}




// case 'FILTER_ORDERS':
        //     return { ...state, filterBy: action.filterBy }