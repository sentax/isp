class ExpertList {
    constructor(core) {
        this._core = core;
        this.createTable();
    }

//create core_expertList table query
    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS core_expertList (
                id UUID,
                ca timestamp,  
                ua timestamp,  
                expName text,  
                expType text,      
                expParams text,
                expUser UUID,
                expStatus boolean,
                PRIMARY KEY ((id),ca)
            ) WITH CLUSTERING ORDER BY (ca DESC)`;
            return await this._core.DBManager.engine.execute(query);
        } catch (e) {
            console.log('Cassandra Error ', e);
        }
    }

//select all core_expertList rows query
    async select() {
        try {
            const selectCore_expertList = `SELECT * FROM core_expertList;`;
            return await this._core.DBManager.engine.execute(selectCore_expertList);
        } catch (e) {
            console.log(e);
        }
    }

//insert row inside core_expertList query
    async create(params) {
        try {
            const newCore_expertList = `INSERT INTO core_expertList (id, ca ,ua ,expName ,expType ,expParams ,expUser ,expStatus ) 
        VALUES (UUID(),'${params.date}', '${params.date}', '${params.expName}', '${params.expType}', '${params.expParams}', ${params.expUser}, ${params.expStatus}) IF NOT EXISTS`;
            return await this._core.DBManager.engine.execute(newCore_expertList);
        } catch (e) {
            console.log(e);
        }
    }

//update row from core_expertList query
    async update(params) {
        try {
            const updateCore_expertList = `UPDATE core_expertList set ua='${params.date}', expName='${params.expName}'
            , expType='${params.expType}' ,expParams='${params.expParams}', expStatus=${params.expStatus}
             WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(updateCore_expertList);
        } catch (e) {
            console.log(e);
        }
    }

//remove row from core_expertList query
    async remove(params) {
        try {
            const removeCore_expertList = `DELETE FROM core_expertList WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(removeCore_expertList);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ExpertList;
