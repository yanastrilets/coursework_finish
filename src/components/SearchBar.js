import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../components/SearchBar.css";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/slices/ui.slice";
export const SearchBar = () => {
    const dispatcher = useDispatch();
    const {searchValue} = useSelector(state => state.ui);
    const changeSearchValue = (e) => {
        dispatcher(uiActions.setSearchValue(e.target.value))
    }
    return (
        <div className="search">
            <TextField
                value = {searchValue}
                onChange={changeSearchValue}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
            />
        </div>
    );
}