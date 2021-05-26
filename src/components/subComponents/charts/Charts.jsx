import React from 'react'
import CountrySalesChart from './CountrySalesChart'
import OwnerSalesChart from './OwnerSalesChart'
import DateSalesChart from './DateSalesChart'
import ClientsAcquisition from './ClientsAquisitionChart'

const Charts = () => {
    return (
        <div className="chartsContainer">
            <OwnerSalesChart/>
            <CountrySalesChart/>
            <DateSalesChart/>
            <ClientsAcquisition/>
        </div>
    )
}

export default Charts