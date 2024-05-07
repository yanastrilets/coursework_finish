import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./slices/ui.slice";
import {bookingApi} from "./api/api";
import {setupListeners} from "@reduxjs/toolkit/query";


export const store = configureStore(
    {
        reducer: {
            "ui": uiSlice,
            [bookingApi.reducerPath]: bookingApi.reducer
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(bookingApi.middleware),
    }
)
setupListeners(store.dispatch)