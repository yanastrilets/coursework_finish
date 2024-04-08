import {HouseBlock} from "./houseBlock";
import './HousesGrid.css';
import psyacha_dushova from "../assets/images/karpaty_lviv.jpg";
import {Link} from "react-router-dom";
export const Catalogue = ({data}) => {

    return (
        <div>
            <div className="houses-grid">
                {data.map((house, idx) => (
                    <Link key={house.id} to={`${house.id}`}>
                        <HouseBlock
                            key={idx}
                            data={house}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}