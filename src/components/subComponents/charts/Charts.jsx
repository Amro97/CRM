import React from 'react'
import CountrySalesChart from './CountrySalesChart'
import OwnerSalesChart from './OwnerSalesChart'

const Charts = () => {
    return (
        <div className="chartsContainer">
            <OwnerSalesChart/>
            <CountrySalesChart/>
        </div>
    )
}

export default Charts