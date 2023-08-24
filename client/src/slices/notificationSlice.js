import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
      remainingInvitation: [],
      uncompletedTodos: [],
    },
    reducers: {
      setRemainingInvitation: (state, action) => {
        state.remainingInvitation = action.payload;
      },
      setUncompletedTodos: (state, action) => {
        state.uncompletedTodos = action.payload;
      },
    },
  });
  
  export const { setRemainingInvitation, setUncompletedTodos } = notificationSlice.actions;
  
  export default notificationSlice.reducer;
  