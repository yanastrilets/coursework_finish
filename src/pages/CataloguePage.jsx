import React from "react";
import {MainHeader} from "../components/mainHeader";
import {MainFooter} from "../components/MainFooter";
import houses from "../data/houses.json";
import {Catalogue} from "../components/Catalogue";
import {SearchBar} from "../components/SearchBar";
import "../pages/CataloguePage.css"
export const CataloguePage = () =>{
    return(
        <div>
            <MainHeader/>
            <div className="catalogue-page">
                <div className="filters">

                </div>
                <div className="catalogue">
                    <SearchBar/>
                    <Catalogue data={houses.housesData}/>
                </div>
            </div>

            <MainFooter/>
        </div>
    );
}