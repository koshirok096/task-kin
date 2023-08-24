import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice.js';
import todoReducer from '../slices/todosSlice.js';
import notificationReducer from '../slices/notificationSlice.js';


const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
    notification: notificationReducer,
});

export default rootReducer;