//------------------user db cmd------------------------//
//insert cmd
_core.DBManager.Users.create(
    {
        date: new Date().toISOString(),
        username: 'asssgar',
        password: '1234',
        email: 'abc@gmail.com',
        type: ' admin',
        status: true
    }
);
//update cmd
_core.DBManager.Users.update(
    {
        username: 'asssgar',
        password: '15234',
        email: 'abc@gmail.com',
        type: ' user',
        status: false,
    }
);
//remove cmd
_core.DBManager.Users.remove(
    {
        username: 'asssgar',
        email: 'abc@gmail.com',
    }
);
//select cmd
_core.DBManager.Users.select();

//------------------account db cmd------------------------//
//insert cmd
_core.DBManager.Accounts.create(
    {
        date: new Date().toISOString(),
        exchange: 'binance',
        apiKey: 'test',
        secretKey: 'hellow',
        params: 'test~'
    })
//update cmd
_core.DBManager.Accounts.update({
    date: new Date().toISOString(),
    exchange: 'bnance',
    apiKey: 'tet',
    secretKey: 'hellow',
    params: 'test~',
    id: 'fa81309c-f725-47a6-a924-53a9cb035b78',
    ca: '2020-03-15T18:23:43.141Z'
})
//remove cmd
_core.DBManager.Accounts.remove({
    id: 'fa81309c-f725-47a6-a924-53a9cb035b78',
    ca: '2020-03-15T18:23:43.141Z'
})
//select cmd
_core.DBManager.Accounts.select()

//------------------expertList db cmd------------------------//
//insert cmd
_core.DBManager.ExpertList.create(
    {
            date: new Date().toISOString(),
            expName: 'two',
            expType: 'scalper',
            expParams: 'hellow',
            expUser: '7a035edd-9957-44e5-9bef-cffc89339c11',
            expStatus:false
    })
//update cmd
_core.DBManager.ExpertList.update(
    {
            date: new Date().toISOString(),
            expName: 'three',
            expType: 'scaslper',
            expParams: 'hesllow',
            expStatus: true,
            id: 'a94ffde6-809f-4a5b-a928-e51a9f7c0d19',
            ca: '2020-03-15T18:37:03.082Z'
    })
//remove cmd
_core.DBManager.ExpertList.remove(
    {
            id: 'a94ffde6-809f-4a5b-a928-e51a9f7c0d19',
            ca: '2020-03-15T18:37:03.082Z'
    })
//select cmd
_core.DBManager.ExpertList.select()

//------------------tickData db cmd------------------------//
//create cmd
_core.DBManager.TickData.createTable({feed:'binance'})
//insert cmd
_core.DBManager.TickData.create({
    feed: 'binance',
    date:new Date().toISOString(),
    symbol:'BNB/BTC',
    price:100,
    volume:100
})
//update cmd
_core.DBManager.TickData.update({
    feed: 'binance',
    date:new Date().toISOString(),
    symbol:'BNB/BTC',
    price:1000,
    volume:100,
    id:'693f6cbe-315a-44e4-a6c9-75928a5ac75c',
    ca:'2020-03-15T18:55:08.982Z'
})
//remove cmd
_core.DBManager.TickData.remove({
    feed:'binance',
    id:'693f6cbe-315a-44e4-a6c9-75928a5ac75c',
    ca:'2020-03-15T18:55:08.982Z'
})
//select cmd
_core.DBManager.TickData.select({
    feed:'binance'
})

//------------------experts db cmd------------------------//
//create cmd
_core.DBManager.Experts.createTable({
    expertName: 'test',
    tableName: 'sample'
})
//insert cmd
_core.DBManager.Experts.create({
    expertName: 'test',
    tableName: 'sample',
    date:new Date().toISOString()
})
//update cmd
_core.DBManager.Experts.update({
    expertName: 'test',
    tableName: 'sample',
    date: new Date().toISOString(),
    id: 'a1abf72f-a352-4878-81d2-a8c6964fc0fc',
    ca: '2020-03-15T19:05:48.319Z'
})
//remove cmd
_core.DBManager.Experts.remove({
    expertName: 'test',
    tableName: 'sample',
    id: 'a1abf72f-a352-4878-81d2-a8c6964fc0fc',
    ca: '2020-03-15T19:05:48.319Z'
})
//select cmd
_core.DBManager.Experts.select({
    expertName: 'test',
    tableName: 'sample',
})

//------------------candles db cmd------------------------//
//create cmd
_core.DBManager.Candles.createTable({
    feed:'binance',
    symbol:'BNB_BTC'
})
//insert cmd
_core.DBManager.Candles.create({
    feed: 'binance',
    symbol: 'BNB_BTC',
    date: new Date().toISOString(),
    tf: 1,
    o: 100,
    h: 200,
    l: 150,
    c: 300,
    v: 400,
    d: new Date().toISOString()
})
//update cmd
_core.DBManager.Candles.update({
    feed: 'binance',
    symbol: 'BNB_BTC',
    date: new Date().toISOString(),
    tf: 1,
    o: 100,
    h: 200,
    l: 150,
    c: 300,
    v: 500,
    d: new Date().toISOString(),
    id:'a73d2e8e-1702-4c5f-9243-5c73683a4f0b',
    ca:'2020-03-15T19:19:10.429Z'
})
//remove cmd
_core.DBManager.Candles.remove({
    feed: 'binance',
    symbol: 'BNB_BTC',
    id:'a73d2e8e-1702-4c5f-9243-5c73683a4f0b',
    ca:'2020-03-15T19:19:10.429Z'
})
//select cmd
_core.DBManager.Experts.select({
    expertName: 'test',
    tableName: 'sample',
})