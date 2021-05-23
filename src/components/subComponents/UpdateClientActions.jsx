import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab'
import { Button, FormControl, InputLabel, NativeSelect, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';


const UpdateClientActions = inject("clientsStore", "inputsStore")(observer(({ clientsStore, inputsStore }) => {
    const { emailType, owner_id } = inputsStore.actionsUpdate
    const { clients, owners } = clientsStore
    const { id, email ,owner_id: selectedowner_id} = inputsStore.selectedClient

    const handleInput = function ({ target }) {
        const { name, value } = target

        if (name === "clientSearch") {
            const selectedClient = clients.find(c => c.last.toLowerCase().includes(value.toLowerCase()) ||
                c.first.toLowerCase().includes(value.toLowerCase()) || c.id.toString().includes(value.split(' ')[0]))
            if (selectedClient) {
                inputsStore.handleClientSearch(value, selectedClient)
                return
            } else {
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
        if (id && owner_id) {
            await clientsStore.updateClientInfo({ owner_id, id })
            const selected = clientsStore.clients.find(c => c.id === id)
            inputsStore.handleClientSearch(id, selected)
            inputsStore.emptyInputs("actionsUpdate")
        }
    }
    const sendEmail = async function () {

        if (email && selectedowner_id && emailType) {
            await clientsStore.sendEmail(email, selectedowner_id, emailType)
            const selected = clientsStore.clients.find(c => c.id === id)
            inputsStore.handleClientSearch(id, selected)
            inputsStore.emptyInputs("actionsUpdate")
        }
    }
    const makeSale = async ()=> {
        if (id && selectedowner_id) {
        await clientsStore.makeSale(id,selectedowner_id)

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
                    <NativeSelect onChange={handleInput} value={owner_id} name="owner_id">
                        <option aria-label="None" value="" />
                        {owners.map(e => <option key={e.id} value={e.id}>{e.employeelast} {e.employeefirst}</option>)}
                    </NativeSelect>
                </FormControl>
                <Button onClick={changeOwner}> Transfer Ownership</Button>
            </div>
            <div className="sendEmail">

                <FormControl className="select">
                    <InputLabel>Email Type</InputLabel>
                    <NativeSelect onChange={handleInput} value={emailType} name="emailType">
                        <option aria-label="None" value="" />
                        {Object.keys(clientsStore.emailTypes).map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </NativeSelect>
                </FormControl>
                <Button onClick={sendEmail}>Send Email</Button>
            </div>
            <Button onClick={makeSale}>Declare Sale</Button>
        </form>

    );
}))

export default UpdateClientActions
