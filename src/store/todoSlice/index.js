import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo Slice",
  initialState: {
    lists: [],
    chooseTaskId: null,
  },

  reducers: {
    addTodo: (state, action) => {
      state.lists = [action.payload, ...state.lists];
    },
    deleteTodo: (state, action) => {
      state.lists = state.lists.filter((l) => l.id === action.payload);
    },
    setChooseTaskId: (state, action) => {
      state.chooseTaskId = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, setChooseTaskId } = todoSlice.actions;
export default todoSlice.reducer;
