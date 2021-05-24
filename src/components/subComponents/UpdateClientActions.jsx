import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab'
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const UpdateClientActions = inject("clientsStore", "inputsStore")(observer(({ clientsStore, inputsStore }) => {
    const { email_type, owner } = inputsStore.actionsUpdate
    const { clients, owners, email_types } = clientsStore
    const { id } = inputsStore.selectedClient

    const handleInput = function ({ target }) {
        const { name, value } = target

        if (name === "clientSearch") {
            const selectedClient = clients.find(c => c.last.toLowerCase().includes(value.toLowerCase()) ||
                c.first.toLowerCase().includes(value.toLowerCase()) || c.id.toString().includes(value.split(' ')[0]))
            if (selectedClient) {
                inputsStore.handleClientSearch(value, selectedClient)
                return
            }
            else {
                inputsStore.handleClientSearch(value, {})
                return
            }
        }
        console.log("received");
        inputsStore.handleInputs("actionsUpdate", name, value)
    }
    const handleClientSearch = ({ target }) => {
        const { innerText } = target
        if (innerText) {
            const id = parseInt(innerText.split(' ')[0])
            const selectedClient = clients.find(c => c.id === id)
            inputsStore.handleClientSearch(innerText, selectedClient)
        } else {
            inputsStore.handleClientSearch('', {})

        }
    }
    const changeOwner = async function () {
        if (id) {
            await clientsStore.updateOwner(id, owner)
            const selected = clientsStore.clients.find(c => c.id === id)
            inputsStore.handleClientSearch(id, selected)
            inputsStore.emptyInputs("actionsUpdate")
        }
    }
    const sendEmail = async function () {

        if (id) {
            await clientsStore.sendEmail(id, email_type)
            const selected = clientsStore.clients.find(c => c.id === id)
            inputsStore.handleClientSearch(id, selected)
            inputsStore.emptyInputs("actionsUpdate")
        }
    }
    const declare = async () => {
        if (id) {
            await clientsStore.declare(id)
            const selected = clientsStore.clients.find(c => c.id === id)
            inputsStore.handleClientSearch(id, selected)
            console.log(selected.sold);
        }
    }
    return (


        <form className="actionsUpdate" noValidate autoComplete="off">
            <Typography className="inputs" variant="h4">
                Update
          </Typography>
            <Autocomplete
                onChange={handleClientSearch}
                id="free-solo-demo"
                freeSolo
                options={clients.map((c) => c.id + ' - ' + c.last + " " + c.first)}
                renderInput={(params) => (
                    <TextField {...params} name="clientSearch" onChange={handleInput} label="Select Client" margin="normal" variant="outlined" />
                )}
            />
            <div className="sendEmail">

                <FormControl className="select">
                    <InputLabel>Owner</InputLabel>
                    <NativeSelect onChange={handleInput} value={owner} name="owner">
                        <option aria-label="None" />
                        {owners.map(o => <option key={o.id} value={o.owner}>
                            {o.owner}
                        </option>)}
                    </NativeSelect>
                </FormControl>
                <Button onClick={changeOwner}> Transfer Ownership </Button>
            </div>
            <div className="sendEmail">

                <FormControl className="select">
                    <InputLabel>Email Type</InputLabel>
                    <NativeSelect onChange={handleInput} value={email_type} name="email_type">
                        <option aria-label="None" />
                        {email_types.map(e => <option key={e} value={e}>
                            {e}
                        </option>)}
                    </NativeSelect>
                </FormControl>
                <Button onClick={sendEmail}>Send Email</Button>
            </div>
            <Button onClick={declare}>Declare Sale</Button>
        </form>
    );
}))

export default UpdateClientActions
