import { observable, makeObservable, action, computed, runInAction } from 'mobx'
import ApiManager from '../managers/APIManager'
const apiManager = new ApiManager()

export default class ClientsStore {
    constructor() {
        this.clients = []
        this.owners = []
        this.emails = 0
        this.outstandingClients = 0
        this.countries = {}
        this.ownersSales = {}
        this.email_types = ['A', 'B', 'C', 'D']
        this.months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        makeObservable(this, {
            clients: observable,
            owners: observable,
            outstandingClients: observable,
            countries: observable,
            email_types: observable,
            emails: observable,
            updateClients: action,
            updateOwners: action,
            updateSales: action,
            addNewClient: action,
            sendEmail:action,
            declare: action,
            numberOfEmails:computed,
            ownersSalesArray:computed,
            countrySalesArray:computed
        })
        this.updateClients()
        this.updateOwners()
        this.updateSales()
    }

    get numberOfEmails(){
        return this.emails
    }
    get ownersSalesArray(){
        const arr = Object.keys(this.ownersSales).map(e => {
            return{name: e, sales: this.ownersSales[e]}
        })
        return arr
    }
    get countrySalesArray(){
        const arr = Object.keys(this.countries).map(c =>{
            return{name: c, sales: this.countries[c]}
        })
        return arr
    }

    updateClients = async () => {
        this.outstandingClients = 0
        this.emails = 0
        const clients = await apiManager.getData()
        runInAction(()=>{
        clients.forEach(c => {
            if (!c.sold) { 
                this.outstandingClients++
            }
            if (c.email_type) {
                this.emails++
            } 
        })
        this.clients = clients
    })
    return clients
    }
    updateOwners = async () => {
        const owners = await apiManager.getOwners()
        runInAction(()=>{
            this.owners = owners
        })
        return owners
    }
    updateSales = async () => {
        const clients = await apiManager.getData()
        runInAction(()=>{
            this.ownersSales={}
            clients.forEach(s => {
                if (this.countries[s.country]) {
                    this.countries[s.country]++
                } else {
                    this.countries[s.country] = 1
                }
                if (this.ownersSales[s.owner]) {
                    this.ownersSales[s.owner]++
                } else {
                    this.ownersSales[s.owner] = 1
                }
            })
        })
    }
    updateOwner = async (cId, oId) => {
        const response = await apiManager.transferOwner(cId, oId)
        await this.updateClients()
        return response
    }
    addNewClient = async (client) => {
        const response = await apiManager.postClient(client)
        await this.updateClients()
        return response
    }
    sendEmail = async (cId, ET) => {
        const response = await apiManager.sendET(cId, ET)
        await this.updateClients()
        return response
    }
    declare = async (clientId) => {
        const response = await apiManager.declare(clientId)
        await this.updateClients()
        await this.updateSales()
        return response
    }

}