import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "test",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSerchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setSerchTerm } = searchSlice.actions;

export default searchSlice.reducer;
