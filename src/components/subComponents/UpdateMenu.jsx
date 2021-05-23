import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const UpdateMenu = inject("clientsStore","inputsStore")(observer(({ clientsStore,inputsStore, setShouldUpdateShow }) => {
    const{last,first,country,email,owner_id} = inputsStore.updateMenuInputs

    const handleUpdate= function({target}){
        const {name,value}= target
        inputsStore.handleInputs("updateMenuInputs",name,value)
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
            <TextField onChange={handleUpdate} label="First Name" value={last} name="last" variant="outlined"/>
            <TextField onChange={handleUpdate} label="Last Name" value={first} name="first" variant="outlined" />
            <TextField onChange={handleUpdate} label="Country" value={country} name="country" variant="outlined" />
            <TextField onChange={handleUpdate} label="email" value={email} name="email" variant="outlined" />
            <FormControl className="select">
                <InputLabel>Owner</InputLabel>
                <NativeSelect onChange={handleUpdate} value={owner_id} name="owner_id">
                    <option aria-label="None" value="" />
                    {clientsStore.owners.map(e => <option key={e.id} value={e.id}>{e.employeelast} {e.employeefirst}</option>)}
                </NativeSelect>
            </FormControl>
            <Button onClick={submitChange}> Submit</Button>
        </form>
    );
}))

export default UpdateMenu
