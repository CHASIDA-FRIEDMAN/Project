import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterCriteria: {}, // ערך ברירת מחדל
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterCriteria: (state, action) => {
      state.filterCriteria = action.payload;
    },
  },
});

export const { setFilterCriteria } = filterSlice.actions;
export default filterSlice.reducer;
