import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const NewClient = inject("clientsStore","inputsStore")(observer(({ clientsStore,inputsStore}) => {
    const{last,first,country,email,owner_id} = inputsStore.updateMenuInputs

    const handleInput= function({target}){
        const {name,value}= target
        inputsStore.handleInputs("updateMenuInputs",name,value)
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
            <TextField onChange={handleInput} label="First Name" value={last} name="last" variant="outlined"/>
            <TextField onChange={handleInput} label="Last Name" value={first} name="first" variant="outlined" />
            <TextField onChange={handleInput} label="Country" value={country} name="country" variant="outlined" />
            <TextField onChange={handleInput} label="Email" value={email} name="email" variant="outlined" />
            <FormControl className="select">
                <InputLabel>Owner</InputLabel>
                <NativeSelect onChange={handleInput} value={owner_id} name="owner_id">
                    <option aria-label="None" value="" />
                    {clientsStore.owners.map(e => <option key={e.id} value={e.id}>{e.employeelast} {e.employeefirst}</option>)}
                </NativeSelect>
            </FormControl>
            <Button onClick={submitNewClient}> Submit</Button>
        </form>
  
    );
}))

export default NewClient
