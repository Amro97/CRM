// const axios = require('axios')
// // import {ApiManager} from './src/managers/APIManager'
// // const apiManager = require('./src/managers/APIManager')
// getData = async () => {
//     const response = await axios.get(`http://localhost:3001/clients`)
//     return response.data
// }
// updateClients = async () => {
//     const clients = await getData()
//     clients.forEach(c => {
//         console.log(c)
// });
//     // runInAction(()=>{
//     // this.outstandingClients = 0
//     // clients.forEach(c => {
//     //     if (!c.sold) {
//     //         this.outstandingClients++
//     //     }
//     //     if (this.emailTypes[c.emailType]) {
//     //         this.emailTypes[c.emailType]++
//     //     } 
//     //     else {
//     //         this.emailTypes[c.emailType] = 1
//     //     }
//     // })

//     //     this.clients = clients
//     // })
//     // return clients
// }

// updateClients()

// // const Sequelize = require('sequelize')
// // const sequelize = new Sequelize('mysql://root:@localhost/crm_db')
// // sequelize
// //     .authenticate()
// //     .then(() => {
// //         console.log('Connection has been established successfully.');
// //     })
// //     .catch(err => {
// //         console.error('Unable to connect to the database:', err);
// //     })

// // getCountry = async (countryName) =>  {
// //         try {
// //             const [res, meta] = await sequelize.query(`
// //             SELECT * FROM country 
// //             WHERE country = "${countryName}";`)
// //             if (res.length) {
// //                 return res[0]
// //             } else {
// //                 return false
// //             }
// //         } catch (error) {
// //             return error;
// //         }
// // }

// // getOwner = async (ownerName) => {
// //     try {
// //         const [res, meta] = await sequelize.query(`
// //         SELECT * FROM owner 
// //         WHERE owner = "${ownerName}";`)
// //         if (res.length) {
// //             console.log(res)
// //             return res[0]
// //         } else {
// //             return false
// //         }
// //     } catch (error) {
// //         return error;
// //     }
// //     }

// // getClient = async (clientEmail) => {
// //         const query = `
// //         SELECT * FROM client 
// //         WHERE email = "${clientEmail}";`

// //         try {
// //             const [res, meta] = await sequelize.query(query)

// //             if (res.length) {
// //                 return res[0]
// //             } else {
// //                 return false
// //             }

// //         } catch (error) {
// //             return error;
// //         }
// //     }

// // getEmailType = async (ET) => {
// //         const query = `
// //         SELECT * FROM email_type 
// //         WHERE email_type = "${ET}";`
// //         try {
// //             const [res, meta] = await sequelize.query(query)
// //             if (res.length) {
// //                 console.log(res[0].id)
// //                 return res[0]
// //             } else {
// //                 return false
// //             }
// //         } catch (error) {
// //             return error;
// //         }
// // }
// // getClientsData= async () => {
// //     try {
// //         const [res, meta] = await sequelize.query(`
// //           SELECT client.id, last, first,
// //                  email, sold, date,
// //                  email_type, owner, country
// //           FROM client, country, email_type, owner
// //           WHERE
// //               client.country_id = country.id AND
// //               client.owner_id = owner.id AND
// //               client.email_type_id = email_type.id
// //           ORDER BY client.first, client.last;
// //           `)
// //           console.loig(res[0])
// //           return res

// //     } catch (error) {
// //         console.log(error)
// //         return error
// //     }
// // }
// // getClientsData()