import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const NewClient = inject("clientsStore", "inputsStore")(observer(({ clientsStore, inputsStore }) => {
    const { last, first, country, email, owner } = inputsStore.updateMenuInputs

    const handleInput = function ({ target }) {
        console.log(target.value)
        const { name, value } = target
        inputsStore.handleInputs("updateMenuInputs", name, value)
    }
    const submitNewClient = async function () {
        await clientsStore.addNewClient(inputsStore.updateMenuInputs)
        inputsStore.emptyInputs("updateMenuInputs")
    }
    return (


        <form className="newClient" noValidate autoComplete="off">
            <Typography className="inputs" variant="h4">
                Add new client
          </Typography>
            <TextField onChange={handleInput} label="lastName" value={last} name="last" variant="outlined" />
            <TextField onChange={handleInput} label="firstName" value={first} name="first" variant="outlined" />
            <TextField onChange={handleInput} label="Country" value={country} name="country" variant="outlined" />
            <TextField onChange={handleInput} label="Email" value={email} name="email" variant="outlined" />
            <FormControl className="select">
                <InputLabel>Owner</InputLabel>
                <NativeSelect onChange={handleInput} value={owner} name="owner">
                    <option aria-label="None" value="" />
                    {clientsStore.owners.map(e => <option key={e.id} value={e.owner}>{e.owner}</option>)}
                </NativeSelect>
            </FormControl>
            <Button onClick={submitNewClient}> Submit </Button>
        </form>

    );
}))

export default NewClient
