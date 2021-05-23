import React from 'react'
import CountrySalesChart from './CountrySalesChart'
import ownersalesChart from './ownersalesChart'

const Charts = () => {
    return (
        <div className="chartsContainer">
            <ownersalesChart/>
            <CountrySalesChart/>
        </div>
    )
}

export default Charts
