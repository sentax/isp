class Experts {
    constructor(core) {
        this._core = core;
    }

//create core_experts_ table query
    async createTable(params) {
        try {
            const query = `CREATE TABLE IF NOT EXISTS core_experts_${params.expertName}_${params.tableName} (
                id UUID,
                ca timestamp,  
                ua timestamp,  
                PRIMARY KEY ((id),ca)
            ) WITH CLUSTERING ORDER BY (ca DESC)`;
            return await this._core.DBManager.engine.execute(query);
        } catch (e) {
            console.log('Cassandra Error ', e);
        }
    }

//select all core_experts_ rows query
    async select(params) {
        try {
            const selectCore_experts = `SELECT * FROM core_experts_${params.expertName}_${params.tableName};`;
            return await this._core.DBManager.engine.execute(selectCore_experts);
        } catch (e) {
            console.log(e);
        }
    }

//insert row inside core_experts_ query
    async create(params) {
        try {
            const newCore_experts = `INSERT INTO core_experts_${params.expertName}_${params.tableName} (id, ca ,ua) 
        VALUES (UUID(),'${params.date}', '${params.date}' ) IF NOT EXISTS`;
            return await this._core.DBManager.engine.execute(newCore_experts);
        } catch (e) {
            console.log(e);
        }
    }

//update row from core_experts_ query
    async update(params) {
        try {
            const updateCore_experts = `UPDATE core_experts_${params.expertName}_${params.tableName} set ua='${params.date}'
             WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(updateCore_experts);
        } catch (e) {
            console.log(e);
        }
    }

//remove row from core_experts_ query
    async remove(params) {
        try {
            const removeCore_experts = `DELETE FROM core_experts_${params.expertName}_${params.tableName} WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(removeCore_experts);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Experts;