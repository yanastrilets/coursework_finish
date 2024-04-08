import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../components/SearchBar.css";
export const SearchBar = () => {
    return (
        <div className="search">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
            />
        </div>
    );
}