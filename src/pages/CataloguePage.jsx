import React from "react";
import {MainHeader} from "../components/mainHeader";
import {MainFooter} from "../components/MainFooter";
import {Catalogue} from "../components/Catalogue";
import {SearchBar} from "../components/SearchBar";
import "../pages/CataloguePage.css"
import {useGetApartmentsQuery, useGetAvailableApartmentsQuery} from "../store/api/api";
import {useDispatch, useSelector} from "react-redux";
import {FilterContainer} from "../components/FilterContainer/FilterContainer";
import {addDays} from "date-fns";
import {uiActions} from "../store/slices/ui.slice";
export const CataloguePage = () => {
    const {searchValue, priceRange, selectedCity, bookingDetails} = useSelector(state => state.ui);
    const dispatch = useDispatch();

    // Цей хук викликається з актуальними параметрами для фільтрації апартаментів
    const { data: availableApartments, refetch } = useGetAvailableApartmentsQuery({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        city: selectedCity,
        checkIn: bookingDetails.startDate,
        checkOut: bookingDetails.endDate
    });

    const handleSelect = (ranges) => {
        let { startDate, endDate } = ranges.selection;
        if (startDate.getDate() === endDate.getDate() &&
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getFullYear() === endDate.getFullYear()) {
            endDate = addDays(startDate, 1);  // Встановлюємо дату завершення на наступний день
        }
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        dispatch(uiActions.updateBookingDates({ startDate, endDate }));
        dispatch(uiActions.updateNightsAndSum({ nights, sum: 0 }));
    };

    const handleOnClick = () => {
        refetch();  // Перезавантажуємо доступні апартаменти згідно нових параметрів фільтрації
    }

    return(
        <div>
            <MainHeader/>
            <div className="catalogue-page">
                <div className="filters">
                    <FilterContainer handleSelect={handleSelect} handleOnClick={handleOnClick} />
                </div>
                <div className="catalogue">
                    <SearchBar/>
                    {availableApartments && <Catalogue data={availableApartments.filter(house => house.house_name.includes(searchValue))}/>}
                </div>
            </div>
            <MainFooter/>
        </div>
    );
}