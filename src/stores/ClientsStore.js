import { observable, makeObservable, action, computed, runInAction } from 'mobx'
import ApiManager from '../managers/APIManager'
const moment = require('moment')
const apiManager = new ApiManager()

export default class ClientsStore {
    constructor() {
        this.clients = []
        this.owners = []
        this.emails = 0
        this.outstandingClients = 0
        this.countries = {}
        this.ownersSales = {}
        this.salesBydate = {}
        this.clientsAcquisition = {  "This Month": 0, "Up To 6 Months": 355, "6-12 Months": 370, "12+ Months": 0 }
        this.email_types = ['A', 'B', 'C', 'D']
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
            sendEmail: action,
            declare: action,
            numberOfEmails: computed,
            ownersSalesArray: computed,
            countrySalesArray: computed,
            dateSalesArray: computed,
            clientsAcquisitionArray: computed
        })
        this.updateClients()
        this.updateOwners()
        this.updateSales()
    }

    get numberOfEmails() {
        return this.emails
    }
    get ownersSalesArray() {
        const arr = Object.keys(this.ownersSales).map(o => {
            return { name: o, sales: this.ownersSales[o] }
        })
        arr.sort((a, b) => (b.sales > a.sales) ? 1 : -1)
        return arr
    }
    get countrySalesArray() {
        const arr = Object.keys(this.countries).map(c => {
            return { name: c, sales: this.countries[c] }
        })
        return arr
    }
    get dateSalesArray() {
        const arr = Object.keys(this.salesBydate).map(d => {
            return { name: d, sales: this.salesBydate[d] }
        })
        arr.sort((a, b) => (this.months.indexOf(a.name) - this.months.indexOf(b.name)))
        return arr
    }
    get clientsAcquisitionArray(){
        const arr = Object.keys(this.clientsAcquisition).map(d => {
            return { name: d, acquisition: this.clientsAcquisition[d] }
        })
        return arr
    }

    updateClients = async () => {
        this.outstandingClients = 0
        this.emails = 0
        const clients = await apiManager.getData()
        runInAction(() => {
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
        runInAction(() => {
            this.owners = owners
        })
        return owners
    }
    updateSales = async () => {
        const clients = await apiManager.getData()
        runInAction(() => {
            this.ownersSales = {}
            this.countries = {}
            this.salesBydate = {}
            this.clientsAcquisition = { "This Month": 0, "Up To 6 Months": 355, "6-12 Months": 370, "12+ Months": 0 }
            const firstDayOfMonth = Date.parse(moment().clone().startOf('month').format('MM-DD-YYYY'))

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
                const date = new Date(s.date)
                const numericalMonth = date.getMonth()
                const min = moment().subtract(180, 'days').calendar();
                const mini = moment().subtract(364, 'days').calendar();
                const month = this.months[numericalMonth]
                const currentDate = moment(s.date)

                if (this.salesBydate[month]) {
                    this.salesBydate[month]++
                } else {
                    this.salesBydate[month] = 1
                }
                if (date > firstDayOfMonth) {
                    this.clientsAcquisition["This Month"]++
                }else if (currentDate > min){
                    this.clientsAcquisition["Up To 6 Months"]++
                }
                else if (currentDate > mini && currentDate < min){
                    this.clientsAcquisition["6-12 Months"]++
                }
                else {
                    this.clientsAcquisition["12+ Months"]++
                }
            })
            console.log(this.clientsAcquisition)
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