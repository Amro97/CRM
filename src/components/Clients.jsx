import React from 'react'
import { inject, observer } from 'mobx-react'
import Table  from './subComponents/Table'
import {TimelineSeparator} from '@material-ui/lab'
import BadgesContainer from './subComponents/BadgesContainer'

const Clients = inject("clientsStore")(observer(({clientsStore}) => {
    return (
        <div className="clientsTab">
          <BadgesContainer/>
          <br/>
          <TimelineSeparator/>
           <br/>
      <Table/>
        </div>
    )
}))

export default Clients