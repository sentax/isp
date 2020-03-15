class TickData {
    constructor(core) {
        this._core = core;
    }

//create core_tickData_ table query
    async createTable(params) {
        try {
            const query = `CREATE TABLE IF NOT EXISTS core_tickData_${params.feed} (
                id UUID,
                ca timestamp,  
                date timestamp,  
                symbol text,  
                price double,      
                volume int,
                PRIMARY KEY ((id),ca)
            ) WITH CLUSTERING ORDER BY (ca DESC)`;
            return await this._core.DBManager.engine.execute(query);
        } catch (e) {
            console.log('Cassandra Error ', e);
        }
    }

//select all core_tickData_ rows query
    async select(params) {
        try {
            const selectCore_tickData = `SELECT * FROM core_tickData_${params.feed};`;
            return await this._core.DBManager.engine.execute(selectCore_tickData);
        } catch (e) {
            console.log(e);
        }
    }

//insert row inside core_tickData_ query
    async create(params) {
        try {
            const newCore_tickData = `INSERT INTO core_tickData_${params.feed} (id, ca ,symbol ,date ,price ,volume) 
        VALUES (UUID(),'${params.date}', '${params.symbol}', '${params.date}', ${params.price}, ${params.volume} )`;
            return await this._core.DBManager.engine.execute(newCore_tickData);
        } catch (e) {
            console.log(e);
        }
    }

//update row from core_tickData_ query
    async update(params) {
        try {
            const updateCore_tickData = `UPDATE core_tickData_${params.feed} set symbol='${params.symbol}'
            , date='${params.date}' ,price=${params.price}, volume=${params.volume}
             WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(updateCore_tickData);
        } catch (e) {
            console.log(e);
        }
    }

//remove row from core_tickData_ query
    async remove(params) {
        try {
            const removeCore_tickData = `DELETE FROM core_tickData_${params.feed} WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(removeCore_tickData);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = TickData;
