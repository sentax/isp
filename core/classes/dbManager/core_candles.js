class Candles {
    constructor(core) {
        this._core = core;
    }

//create core_candles_ table query
    async createTable(params) {
        try {
            const query = `CREATE TABLE IF NOT EXISTS core_candles_${params.feed}_${params.symbol} (
                id UUID,
                ca timestamp,  
                tf float,  
                o float,  
                h float,  
                l float,  
                c float,  
                v float,  
                d timestamp,
                PRIMARY KEY ((id),ca)
            ) WITH CLUSTERING ORDER BY (ca DESC)`;
            return await this._core.DBManager.engine.execute(query);
        } catch (e) {
            console.log('Cassandra Error ', e);
        }
    }

//select all core_candles_ rows query
    async select(params) {
        try {
            const selectCore_candles = `SELECT * FROM core_candles_${params.feed}_${params.symbol};`;
            return await this._core.DBManager.engine.execute(selectCore_candles);
        } catch (e) {
            console.log(e);
        }
    }

//insert row inside core_candles_ query
    async create(params) {
        try {
            const newCore_candles = `INSERT INTO core_candles_${params.feed}_${params.symbol} (id,ca ,tf ,o ,h ,l ,c ,v ,d) 
        VALUES (UUID(),'${params.date}', ${params.tf}, ${params.o}, ${params.h}, ${params.l}, ${params.c}, ${params.v}, '${params.d}' ) IF NOT EXISTS`;
            return await this._core.DBManager.engine.execute(newCore_candles);
        } catch (e) {
            console.log(e);
        }
    }

// update row from core_candles_ query
    async update(params) {
        try {
            const updateCore_candles = `UPDATE core_candles_${params.feed}_${params.symbol} set tf=${params.tf}, o=${params.o}, h=${params.h}, l=${params.l}, c=${params.c}, v=${params.v}, d='${params.d}'
                 WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(updateCore_candles);
        } catch (e) {
            console.log(e);
        }
    }


//remove row from core_candles_ query
    async remove(params) {
        try {
            const removeCore_candles = `DELETE FROM core_candles_${params.feed}_${params.symbol} WHERE id=${params.id} AND ca='${params.ca}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(removeCore_candles);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Candles;


