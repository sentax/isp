class Users {
    constructor(core) {
        this._core = core;
        this.createTable();
    }

//create core_users table query
    async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS core_users (
                id UUID,
                ca timestamp,  
                username text,  
                password text,      
                email text,
                type text,
                status boolean,
                PRIMARY KEY (username,email)) `;
            return await this._core.DBManager.engine.execute(query);
        } catch (e) {
            console.log('Cassandra Error ', e);
        }
    }

//select all core_users rows query
    async select() {
        try {
            const selectCore_user = `SELECT * FROM core_users;`;
            return await this._core.DBManager.engine.execute(selectCore_user);
        } catch (e) {
            console.log(e);
        }
    }

//insert row inside core_users query
    async create(params) {
        try {
            const newCore_user = `INSERT INTO core_users (id, ca ,username ,password ,email ,type ,status) 
            VALUES (UUID(),'${params.date}', '${params.username}', '${params.password}', '${params.email}', '${params.type}',${params.status}) if not exists`;
            return await this._core.DBManager.engine.execute(newCore_user);
        } catch (e) {
            console.log(e);
        }
    }

//update row from core_users query
    async update(params) {
        try {
            const updateCore_user = `UPDATE core_users set 
            password='${params.password}',
            type='${params.type}',
            status=${params.status}
            WHERE username='${params.username}' AND email='${params.email}' IF exists`;
            return await this._core.DBManager.engine.execute(updateCore_user);
        } catch (e) {
            console.log(e);
        }
    }

//remove row from core_users query
    async remove(params) {
        try {
            const removeCore_user = `DELETE FROM core_users WHERE username='${params.username}' AND email='${params.email}' IF EXISTS`;
            return await this._core.DBManager.engine.execute(removeCore_user);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Users;