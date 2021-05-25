import Badge from './Badge'
import React from 'react'
import { inject, observer } from 'mobx-react'
import emailIcon from './badgeIcons/email.png'
import clientIcon from './badgeIcons/clients.png'
import newClientIcon from './badgeIcons/newClients.png'
import globe from './badgeIcons/globe.png'
const moment = require('moment')

const BadgesContainer = inject("clientsStore")(observer(({clientsStore}) => {
    let hottestCountry = Object.keys(clientsStore.countries)[0]
    Object.keys(clientsStore.countries).forEach(c =>{
        if (clientsStore.countries[c]>clientsStore.countries[hottestCountry]) {
            hottestCountry = c
        }
    })
    const monthIndex = new Date().getMonth()
    const currentMonth = clientsStore.months[monthIndex]
    const firstDayOfMonth = Date.parse(moment().clone().startOf('month').format('MM-DD-YYYY'))
    let numNewClients = 0
    clientsStore.clients.forEach(c =>{
        const date = Date.parse(c.date)
        if (date > firstDayOfMonth) {
            numNewClients++
        }
    })


    return (
        <div className="badgeContainer">
            <Badge name={`New ${currentMonth} clients`} num={numNewClients} icon={newClientIcon}/>
            <Badge name="Sent emails" num={clientsStore.numberOfEmails} icon={emailIcon}/>
            <Badge name="Outstanding Clients" num={clientsStore.outstandingClients} icon={clientIcon} />
            <Badge name="Hottest Country"  num={hottestCountry} icon={globe}/>
        </div>
    )
}))

export default BadgesContainer
