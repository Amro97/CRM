import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ownersalesChart = inject("clientsStore")(observer(({ clientsStore }) => {

    return (
        <div className="chartContainer">

            <Typography variant='h5'>Sales By Owner</Typography>
            <ResponsiveContainer width='80%' height={300} >
                <BarChart
                    layout='vertical'
                    width={500}
                    height={300}
                    data={clientsStore.ownersSalesArray.slice(0, 3).sort((a, b) => (a.sales > b.sales) ? 1 : -1)}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type='category' />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}))

export default ownersalesChart
