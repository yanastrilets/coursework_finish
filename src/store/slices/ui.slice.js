import {createSlice} from "@reduxjs/toolkit";
import {addDays} from "date-fns";

const initialState = {
    searchValue:"",
    user: null,
    selectedTenantId: null,
    bookingDetails: {
        houseId: null,
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        nights: 1,
        sum: 0,
    },

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
            },
            setSelectedTenantId(state, action) {  // Додаємо новий редюсер
                state.selectedTenantId = action.payload;
            },
            setBookingDetails(state, action) {
                const { houseId, startDate, endDate, nights, sum } = action.payload;
                state.bookingDetails.houseId = houseId;
                state.bookingDetails.startDate = startDate;
                state.bookingDetails.endDate = endDate;
                state.bookingDetails.nights = nights;
                state.bookingDetails.sum = sum;
            },
            updateBookingDates(state, action) {
                const { startDate, endDate } = action.payload;
                state.bookingDetails.startDate = startDate;
                state.bookingDetails.endDate = endDate;
            },
            updateNightsAndSum(state, action) {
                const { nights, sum } = action.payload;
                state.bookingDetails.nights = nights;
                state.bookingDetails.sum = sum;
            },
        }
    }
)

export const uiActions = ui.actions;

export default ui.reducer;
