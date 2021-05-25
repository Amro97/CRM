import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const DateSalesChart = inject("clientsStore")(observer(({ clientsStore }) => {
    console.log(clientsStore.dateSalesArray)
    return (
        <div className="chartContainer">

            <Typography variant='h5'>Sales By Date</Typography>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={clientsStore.dateSalesArray}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}))

export default DateSalesChart