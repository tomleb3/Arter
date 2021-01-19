import { combineReducers } from 'redux'
import { itemReducer } from './itemReducer'
import { userReducer } from './userReducer'
import { orderReducer } from './orderReducer'

export const rootReducer = combineReducers({
    itemModule: itemReducer,
    userModule: userReducer,
    orderModule: orderReducer
})