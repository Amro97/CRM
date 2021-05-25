import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';

const ownersalesChart = inject("clientsStore")(observer(({ clientsStore }) => {

    return (
        <div className="ownersalesChart chartContainer">

        <Typography variant='h5'>Sales By Owner</Typography>
        <ResponsiveContainer  width='80%' height={300} >
        <BarChart data={clientsStore.ownersSalesArray}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="last" fontSize="1.5vw"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#003049" />
        </BarChart>
        </ResponsiveContainer>
            </div>
    )
}))

export default ownersalesChart
