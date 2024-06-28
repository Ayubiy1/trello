import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo Slice",
  initialState: {
    lists: [],
  },

  reducers: {
    addTodo: (state, action) => {
      state.lists = [action.payload, ...state.lists];
    },
    deleteTodo: (state, action) => {
      state.lists = state.lists.filter((l) => l.id === action.payload);
    },
    editTodo: () => {},
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
