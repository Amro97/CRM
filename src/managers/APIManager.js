const axios = require('axios')

class ApiManager {
    constructor() {
        this.url = 'http://localhost:3000/'
    }
   
    async getData() {
        const response = await axios.get(`${this.url}clients`)
        return response.data
    }
    async getOwners() {
        const response = await axios.get(`${this.url}owners`)
        return response.data
    }
    async postClient(client) {
        return await axios.post(`${this.url}client`, client)
    }
    async updateClientInfo(newInfo){
        return await axios.put(`${this.url}client/${newInfo.id}`, newInfo)
    }
    async transferOwner(clientId, newOwner){
        return await axios.put(`${this.url}update/owner/${clientId}`, {newOwner})
    }
    async sendET( clientId, ET ){
        return await axios.put(`${this.url}update/email_type/${clientId}`, {ET})
    }
    async declare(clientId){
        return await axios.put(`${this.url}update/declaration/${clientId}`)
    }
  
}
export default ApiManager