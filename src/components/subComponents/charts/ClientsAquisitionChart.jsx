import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


const clientsAcquisition = inject("clientsStore")(observer(({ clientsStore }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    console.log(clientsStore.clientsAcquisitionArray)
    return (
        <div className="chartContainer">

            <Typography variant='h5'>Clients Acquistions</Typography>
            <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="acquisition"
            isAnimationActive={false}
            data={clientsStore.clientsAcquisitionArray}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#0088FE"
            label
          />
          <Pie dataKey="name" data={clientsStore.clientsAcquisitionArray} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
        </div>
    )
}))

export default clientsAcquisition
