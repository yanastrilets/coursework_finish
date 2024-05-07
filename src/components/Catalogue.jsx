import React, { useState } from 'react';
import { HouseBlock } from "./houseBlock";
import './HousesGrid.css';
import { Link } from "react-router-dom";
import { Pagination } from 'antd'; // Імпорт Pagination з Ant Design

export const Catalogue = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100; // Кількість будинків на сторінці

    // Визначення кількості сторінок
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Зміна сторінки
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="houses-grid">
                {currentItems.map((house, idx) => (
                    <Link key={house.id} to={`/catalogue/${house.id}`}>
                        <HouseBlock key={idx} data={house} />
                    </Link>
                ))}
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={data.length}
                    pageSize={itemsPerPage}
                    showSizeChanger={false} // Приховати селектор зміни кількості елементів на сторінці
                    locale={{items_per_page: ""}} // Локалізація
                />
            </div>

        </div>
    );
}
