import { createSlice } from "@reduxjs/toolkit";

const lessonDataSlice = createSlice({
  name: "lessonData",
  initialState: {
    question: {
      id: null,
      value: null,
    },
    choice: {
      id: null,
      value: null,
    },
  },
  reducers: {
    setChoiceData: (state, action) => {
      state.choice = action.payload;
    },
    setQuestionData: (state, action) => {
      state.question = action.payload;
    },
  },
});
export const { setChoiceData, setQuestionData } = lessonDataSlice.actions;
export default lessonDataSlice.reducer;
