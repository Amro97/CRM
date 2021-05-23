const Sequelize = require('sequelize')
const moment = require('moment')

class SQLManager {
    constructor() {
        this.sequelize = new Sequelize(process.env.DATABASE_URL)
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            })
    }
    async getCountry(countryName) {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT * FROM country 
            WHERE country = "${countryName}";`)
            if (res.length) {
                return res[0]
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }
    async addCountry(countryName) {
        const country = await this.getCountry(countryName)
        if (country) {
            return { message: "country already exists" }
        } else {
            try {
                const [res, meta] = await this.sequelize.query(`
                INSERT INTO country VALUES(NULL,"${countryName.toLowerCase()}");`)
                return res
            } catch (error) {
                return error;
            }
        }
    }
    async getOwners() {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT * FROM owner 
            `)
            if (res.length) {
                return res
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }
    async getOwner(ownerName) {
        try {
            const [res, meta] = await this.sequelize.query(`
            SELECT * FROM owner 
            WHERE owner = "${ownerName}";`)
            if (res.length) {
                return res[0]
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }
    async addOwner(ownerName) {
        const owner = await this.getOwner(ownerName)
        if (owner) {
            return { message: "owner already exists" }
        } else {
            try {
                const [res, meta] = await this.sequelize.query(`
                INSERT INTO owner VALUES(NULL, "${ownerName}")
                `)
                return res
            } catch (error) {
                return error;
            }
        }
    }
    async getClient(clientEmail) {
        const query = `
        SELECT * FROM client 
        WHERE email = "${clientEmail}";`
        try {
            const [res, meta] = await this.sequelize.query(query)
            if (res.length) {
                return res[0]
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }
    async getEmailType(ET) {
        if(ET){
        const query = `
        SELECT * FROM email_type 
        WHERE email_type = "${ET}";`
        try {
            const [res, meta] = await this.sequelize.query(query)
            if (res.length) {
                return res[0]
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }
    return null
}
    async addClient(client) {
        const { last, first, email, email_type, country, owner } = client
        await this.addCountry(country)
        await this.addOwner(owner)
        const { id: country_id } = await this.getCountry(country)
        const { id: owner_id } = await this.getOwner(owner)
        const email_type_id = await this.getEmailType(email_type)
        const sold = 0

        try {
            const [res, meta] = await this.sequelize.query(`
            INSERT INTO client (last, first, email, sold, date, email_type_id, owner_id, country_id)
            VALUES(
                "${last}",
                "${first}",
                "${email}",
                ${sold},
                "${moment().format('l')}",
                ${email_type_id},
                ${owner_id},
                ${country_id}
            );`)
            return res
        } catch (error) {
            return error
        }
    }
    async updateClient(clientId, newInfo) {
        const { last, first, country } = newInfo
        await this.addCountry(country)
        const { id: country_id } = await this.getCountry(country)
        const [res, meta] = await this.sequelize.query(`
        UPDATE client
        SET 
        last = "${last}",
        first = "${first}",
        country_id = "${country_id}"
        WHERE id = ${clientId};
        `)
        return res
    }
    async getClientsData() {
        try {
            const [res, meta] = await this.sequelize.query(`
              SELECT client.id, last, first,
                     email, sold, date,
                     email_type, owner, country
              FROM client, country, email_type, owner
              WHERE
                  client.country_id = country.id AND
                  client.owner_id = owner.id AND
                  client.email_type_id = email_type.id
              ORDER BY client.first, client.last;
              `)
            return res

        } catch (error) {
            console.log(error)
            return error
        }
    }
    async transferOwner(clientId, newOwner) {
        await this.addOwner(newOwner)
        const { id: owner_id } = await this.getOwner(newOwner)
        const [res, meta] = await this.sequelize.query(`
        UPDATE client
        SET 
        owner_id = ${owner_id}
        WHERE id = ${clientId};
        `)
        return res
    }
    async sendET(clientId, ET) {
        const { id: email_type_id } = await this.getEmailType(ET)
        const [res, meta] = await this.sequelize.query(`
        UPDATE client
        SET 
        email_type_id = ${email_type_id}
        WHERE id = ${clientId};
        `)
        return res
    }
    async declaration(clientId) {
        const [res, meta] = await this.sequelize.query(`
        UPDATE client
        SET 
        sold = ${1}
        WHERE id = ${clientId};
        `)
        return res
    }
}
module.exports = SQLManager