const axios = require('axios')

class ApiManager {
    constructor() {
        this.url = 'http://localhost:3001/'
    }
   
    async getData() {
        const response =await axios.get(`${this.url}clients`)
        return response.data
    }
    async postClient(client) {
        return await axios.post(`${this.url}client`, client)
    }
    async updateClientInfo(newInfo){
        return await axios.put(`${this.url}client/${newInfo.id}`, newInfo)
    }
    async transferOwner(clientId, newOwner){
        return await axios.put(`${this.url}update/owner/${clientId}`, {clientId, newOwner})
    }
    async sendET( clientId, ET ){
        return await axios.put(`${this.url}update/emailType/${clientId}`, {clientId, ET})
    }
    async declare(clientId){
        return await axios.put(`${this.url}declaration/${clientId}`, {clientId})
    }
  
}
export default ApiManager