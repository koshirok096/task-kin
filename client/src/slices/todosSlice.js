import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [],
    loading: false,
    error: null,
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTodosStart(state) {
            state.loading = true
            state.error = null
        },
        getTodosSuccess(state, action) {
            state.todos = action.payload
            state.loading = false
            state.error = null
        },
        getTodosFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
        createTodoStart(state) {
            state.loading = true
            state.error = null
        },
        createTodoSuccess(state, action) {
            state.todos.push(action.payload)
            state.loading = false
            state.error = null
        },
        createTodoFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
        updateTodoStart(state) {
            state.loading = true
            state.error = null
        },
        updateTodoSuccess(state, action) {
            state.todos = state.todos.map((todo) =>
                todo._id === action.payload._id ? action.payload : todo
            )
            state.loading = false
            state.error = null
        },
        updateTodoFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
        deleteTodoStart(state) {
            state.loading = true
            state.error = null
        },
        deleteTodoSuccess(state, action) {
            state.todos = state.todos.filter(
                (todo) => todo._id !== action.payload
            )
            state.loading = false
            state.error = null
        },
        deleteTodoFailure(state, action) {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    getTodosStart,
    getTodosSuccess,
    getTodosFailure,
    createTodoStart,
    createTodoSuccess,
    createTodoFailure,
    updateTodoStart,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoStart,
    deleteTodoSuccess,
    deleteTodoFailure
} = todosSlice.actions

export default todosSlice.reducer
