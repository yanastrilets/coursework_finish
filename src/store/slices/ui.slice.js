import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue:"fghjkl",
    user: null,
}
const ui = createSlice(
    {
        name: "ui",
        initialState,
        reducers: {
            setSearchValue(state, action){
                state.searchValue = action.payload;
            },
            setUser(state, action){
                state.user = action.payload;
            }
        }
    }
)

export const uiActions = ui.actions;

export default ui.reducer;
