import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./slices/ui.slice";


export const store = configureStore(
    {
        reducer: {
            "ui": uiSlice
        },
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware.concat()
    }
)