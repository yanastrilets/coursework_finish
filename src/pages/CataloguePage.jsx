import React from "react";
import {MainHeader} from "../components/mainHeader";
import {MainFooter} from "../components/MainFooter";
import {Catalogue} from "../components/Catalogue";
import {SearchBar} from "../components/SearchBar";
import "../pages/CataloguePage.css"
import {useGetApartmentsQuery} from "../store/api/api";
import {useSelector} from "react-redux";
export const CataloguePage = () =>{
    const {data: houses} = useGetApartmentsQuery();
    const {searchValue} = useSelector(state => state.ui);
    return(
        <div>
            <MainHeader/>
            <div className="catalogue-page">
                <div className="filters">

                </div>
                <div className="catalogue">
                    <SearchBar/>
                    {houses && <Catalogue data={houses.filter(h => h.house_name.includes(searchValue))}/>}
                </div>
            </div>

            <MainFooter/>
        </div>
    );
}