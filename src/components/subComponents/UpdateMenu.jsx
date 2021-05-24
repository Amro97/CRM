import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const UpdateMenu = inject("clientsStore", "inputsStore")(observer(({ clientsStore, inputsStore, setShouldUpdateShow }) => {
    const { last, first, country } = inputsStore.updateMenuInputs

    const handleUpdate = function ({ target }) {
        const { name, value } = target
        inputsStore.handleInputs("updateMenuInputs", name, value)
    }
    const submitChange = async function () {
        await clientsStore.updateClientInfo(inputsStore.updateMenuInputs)
        inputsStore.emptyInputs("updateMenuInputs")
        setShouldUpdateShow(false)
    }
    return (
        <form className="updateMenu" noValidate autoComplete="off">
            <Typography className="inputs" variant="h3">
                Update Client
          </Typography>


            <TextField onChange={handleUpdate} defaultValue={last} label="last" name="last" variant="outlined" />
            <TextField onChange={handleUpdate} defaultValue={first} label="first" name="first" variant="outlined" />
            <TextField onChange={handleUpdate} defaultValue={country} label="country" name="country" variant="outlined" />

            <Button onClick={submitChange}> UPDATE </Button>
        </form>
    );
}))

export default UpdateMenu
