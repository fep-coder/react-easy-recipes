import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    category: "all",
};

const filterSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
});

export const { setSearchTerm, setCategory } = filterSlice.actions;

export default filterSlice.reducer;
