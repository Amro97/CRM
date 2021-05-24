import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React from 'react'

const SelectedClient = inject("inputsStore", "clientsStore")
      (observer(({ clientsStore, inputsStore }) => {
            const { last, first, email, country, email_type, sold, owner } = inputsStore.selectedClient
            return (
                  <div className="selectedClient">
                        <Typography className="inputs" variant="h4">
                              Selected Client
          </Typography>
                        <div className="clientInfo">
                              <Typography className="info" variant="h5">
                                    Full name:  {last} {first}
                              </Typography>
                              <Typography className="info" variant="h5">
                                    Country:  {country}
                              </Typography>
                              <Typography className="info" variant="h5">
                                    E-mail:  {email}
                              </Typography>
                              <Typography className="info" variant="h5">
                                    Email Type:  {email_type === null ? "Not Specified" : email_type}
                              </Typography>
                              <Typography className="info" variant="h5">
                                    Owner: {owner}
                              </Typography>
                              <Typography className="info" variant="h5">
                                    Sold: {sold ? '✓' : 'Not sold'}
                              </Typography>

                        </div>
                  </div>
            )
      }))

export default SelectedClient
