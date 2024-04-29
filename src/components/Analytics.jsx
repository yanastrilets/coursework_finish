import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import {useGetReserveStatusesQuery} from "../store/api/api";
import './Analytics.css'

function transformReserveStatusData(reserveStatusData) {
    const transformedData = reserveStatusData.map(item => ({
        value: item.count_of,
        label: item.reserve_status
    }));
    console.log(transformedData); // Додайте логування для перевірки даних
    return transformedData;
}

export const Analytics = () => {
    const {data: reserve_statuses, isLoading, isError} = useGetReserveStatusesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    const dataForPieChart = reserve_statuses ? transformReserveStatusData(reserve_statuses) : [];

    return (
        <div className='analytic-main-container'>
            {dataForPieChart.length > 0 && (
                <PieChart
                    series={[
                        {
                            data: dataForPieChart,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            fontFamily: 'Poppins, var(--default-font-family)'
                        },
                    ]}
                    height={200}
                />
            )}

        </div>
    );
}
