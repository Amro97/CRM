import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const DateSalesChart = inject("clientsStore")(observer(({ clientsStore }) => {
    return (
        <div className="chartContainer">

            <Typography variant='h5'>Sales By Date</Typography>
            <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={clientsStore.dateSalesArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#FF0000" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
        </div>
    )
}))

export default DateSalesChart