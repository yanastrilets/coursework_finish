import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue:"fghjkl"
}
const ui = createSlice(
    {
        name: "ui",
        initialState,
        reducers: {
            setSearchValue(state, action){
                state.searchValue = action.payload;
            }
        }
    }
)

export const uiActions = ui.actions;

export default ui.reducer;
