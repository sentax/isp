const cassandra = require('cassandra-driver');

//import db classes
const Accounts = require('./core_accounts');
const Candles = require('./core_candles');
const ExpertList = require('./core_expertList');
const Experts = require('./core_experts');
const TickData = require('./core_tickData');
const Users = require('./core_users');

class DBManager {
    constructor(_core) {
        this._core = _core;
        //initialize cassandra config
        this.engine = new cassandra.Client({
            contactPoints: [`${this._core.ConfigManager.configs.cassandra.host}:${this._core.ConfigManager.configs.cassandra.port}`],
            localDataCenter: 'datacenter1',
            keyspace: this._core.ConfigManager.configs.cassandra.keyspace
        });
        this.engine.connect(
            (e, m) => {
                if (e)
                    console.log(e)
                else {
                    this.Accounts = new Accounts(_core);
                    this.Candles = new Candles(_core);
                    this.ExpertList = new ExpertList(_core);
                    this.Experts = new Experts(_core);
                    this.TickData = new TickData(_core);
                    this.Users = new Users(_core);
                }
            }
        )
    }
}

module.exports = DBManager;