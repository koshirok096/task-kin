import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice.js';
import todoReducer from '../slices/todosSlice.js';


const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
});

export default rootReducer;