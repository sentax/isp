class Accounts {
    constructor(core) {
        this._core = core;
        this.createTable();
    }

//create core_accounts table query
    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS core_accounts (
                id UUID,
                ca timestamp,  
                ua timestamp,  
                exchange text,  
                apiKey text,      
                secretKey text,
                params text,
                PRIMARY KEY ((id),ca)
            ) WITH CLUSTERING ORDER BY (ca DESC)`;
            return await this._core.DBManager.engine.execute(query);
        } catch (e) {
            console.log('Cassandra Error ', e);
        }
    }

//select all core_accounts rows query
    async select() {
        try {
            const selectCore_account = `SELECT * FROM core_accounts;`;
            return await this._core.DBManager.engine.execute(selectCore_account);
        } catch (e) {
            console.log(e);
        }
    }

//insert row inside core_accounts query
    async create(params) {
        try {
            const newCore_account = `INSERT INTO core_accounts (id, ca ,ua ,exchange ,apiKey ,secretKey ,params ) 
            VALUES (UUID(),'${params.date}', '${params.date}', '${params.exchange}', '${params.apiKey}', '${params.secretKey}','${params.params}')IF NOT EXISTS`;
            return await this._core.DBManager.engine.execute(newCore_account);
        } catch (e) {
            console.log(e);
        }
    }

//update row from core_accounts query
    async update(params) {
        try {
            const updateCore_account = `UPDATE core_accounts set ua='${params.date}', exchange='${params.exchange}'
            , apiKey='${params.apiKey}' ,secretKey='${params.secretKey}', params='${params.params}'
             WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(updateCore_account);
        } catch (e) {
            console.log(e);
        }
    }

//remove row from core_accounts query
    async remove(params) {
        try {
            const removeCore_account = `DELETE FROM core_accounts WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(removeCore_account);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Accounts;