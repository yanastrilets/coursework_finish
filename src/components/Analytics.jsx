import React, {useEffect, useState} from "react";
import {PieChart} from '@mui/x-charts/PieChart';
import {useGetLastIncomesQuery, useGetReserveStatusesQuery} from "../store/api/api";
import './Analytics.css'
import {LineChart} from "@mui/x-charts";
import {Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

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
    const {data: incomeData, isFetching, isError: isErrorIncome} = useGetLastIncomesQuery();

    const [selectedMonths, setSelectedMonths] = useState([]);
    useEffect(() => {
        if (incomeData && incomeData.length > 3) {
            // Розрахунок індексу початку "середніх" трьох місяців
            const startIndex = Math.floor((incomeData.length - 3) / 2);
            // Вибір трьох місяців, починаючи з розрахованого індексу
            const middleThreeMonths = incomeData.slice(startIndex, startIndex + 3).map(data => data.month);
            setSelectedMonths(middleThreeMonths);
        }
    }, [incomeData]);


    const handleMonthChange = (event) => {
        setSelectedMonths(
            typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
        );
    };

    if (isLoading || isFetching) return <div>Loading...</div>;
    if (isError || isErrorIncome) return <div>Error loading data</div>;

    const monthsLabels = incomeData?.map(entry => entry.month) || [];
    const filteredValues = incomeData?.filter(entry => selectedMonths.includes(entry.month)).map(entry => parseFloat(entry.total));
    const dataForPieChart = reserve_statuses ? transformReserveStatusData(reserve_statuses) : [];

    const xAxisData = Array.from({length: filteredValues.length}, (_, i) => i + 1); // Генеруємо масив з числами

    return (
        <div className='analytic-main-container'>

            <div className='profile-text-tenants' style={{flex: 1, marginLeft: 3}}>Reserve Status Statistic</div>
            <hr className='hr-under-filters' style={{marginBottom: 20, marginTop: 10}}/>
            {dataForPieChart.length > 0 && (

                <PieChart
                    series={[
                        {
                            data: dataForPieChart,
                            highlightScope: {faded: 'global', highlighted: 'item'},
                            faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                            fontFamily: 'Poppins, var(--default-font-family)'
                        },
                    ]}
                    height={200}
                />
            )}
            <div className='profile-text-tenants' style={{flex: 1, marginLeft: 3}}>Incomes</div>
            <hr className='hr-under-filters' style={{marginBottom: 20, marginTop: 10}}/>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                    {filteredValues.length > 0 && (
                        <LineChart sx={{marginLeft: 3}}
                                   xAxis={[{data: xAxisData}]}
                                   series={[{data: filteredValues}]}
                                   width={920}
                                   height={450}
                        />
                    )}
                </div>
                <FormControl fullWidth sx={{ maxWidth: 300 }}>
                    <InputLabel id="month-select-label">Select Months</InputLabel>
                    <Select
                        labelId="month-select-label"
                        id="month-select"
                        multiple
                        value={selectedMonths}
                        onChange={handleMonthChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Select Months" />}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                    >
                        {monthsLabels.map((month, index) => (
                            <MenuItem key={index} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

        </div>
    );
};
