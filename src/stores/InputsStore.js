import { observable, makeObservable, action } from 'mobx'
export default class InputsStore {
    constructor() {
        this.updateMenuInputs = {
            id: undefined,
            last: "",
            first: "",
            country: "",
            email: "",
            owner: "",
            sold: undefined
        }
        this.actionsUpdate = {
            clientSearch: "",
            owner: "",
            email_type: "",
            sold: undefined
        }
        this.selectedClient = {}


        makeObservable(this, {
            updateMenuInputs: observable,
            actionsUpdate: observable,
            selectedClient: observable,
            handleInputs: action,
            emptyInputs: action,
            handleClientSearch: action

        })
    }

    handleClientSearch(value, selectedClient) {
        this.clientSearch = value
        this.selectedClient = selectedClient
    }
    handleInputs(form, property, value) {
        this[form][property] = value
    }
    emptyInputs(form) {
        console.log(form)
        for (const key in this[form]) {
            this[form][key] = ""
        }
    }

}