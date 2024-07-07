import { createSlice } from "@reduxjs/toolkit";

const chooseBoardLocal =
  localStorage.getItem("chooseBoardLocal") !== null
    ? JSON.parse(localStorage.getItem("chooseBoardLocal"))
    : null;

const todoSlice = createSlice({
  name: "todo Slice",
  initialState: {
    lists: [],
    chooseTaskId: 2,
    chooseBoard: chooseBoardLocal,
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
    setChooseBoard: (state, action) => {
      state.chooseBoard = action.payload;

      localStorage.setItem("chooseBoardLocal", state.chooseBoard);
    },
  },
});

export const { addTodo, deleteTodo, setChooseTaskId, setChooseBoard } =
  todoSlice.actions;
export default todoSlice.reducer;
