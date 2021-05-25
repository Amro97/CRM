import React from 'react'
import CountrySalesChart from './CountrySalesChart'
import OwnerSalesChart from './OwnerSalesChart'
import DateSalesChart from './DateSalesChart'

const Charts = () => {
    return (
        <div className="chartsContainer">
            <OwnerSalesChart/>
            <CountrySalesChart/>
            <DateSalesChart/>
        </div>
    )
}

export default Charts