const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function insertMany() {
    try {
        await client.connect()
        console.log('Connected')

        const database = client.db('bank')
        const collection = database.collection('accounts')

        const datas = [
            {
                _id: 1,
                account_id: 'MBD578458784',
                account_type: 'savings',
                account_holder: 'Naja Petersen',
                balance: 2891.4,
                transfers_complete: ['TR12345', 'TR28376', 'TR29901']
            },
            {
                _id: 2,
                account_id: 'BGT900458866',
                account_type: 'current',
                account_holder: 'Sam Joe',
                balance: 3782.4,
                transfers_complete: ['TR12345', 'TR28376', 'TR29901']
            },
            {
                _id: 3,
                account_id: 'DWD548858709',
                account_type: 'savings',
                account_holder: 'Dan Wiskey',
                balance: 1222.9,
                transfers_complete: ['TR12345', 'TR28376', 'TR29901']
            },
            {
                _id: 4,
                account_id: 'WED389758094',
                account_type: 'savings',
                account_holder: 'Hajara Habibu',
                balance: 9220.4,
                transfers_complete: ['TR12345', 'TR28376', 'TR29901']
            },
            {
                _id: 5,
                account_id: 'REF488940784',
                account_type: 'savings',
                account_holder: 'Sara Isak',
                balance: 9893.1,
                transfers_complete: ['TR12345', 'TR28376', 'TR29901']
            },
            {
                _id: 6,
                account_id: 'CFD578412673',
                account_type: 'current',
                account_holder: 'Abu John',
                balance: 12021.0,
                transfers_complete: ['TR12345', 'TR28376', 'TR29901']
            },
        ]

        const result = await collection.insertMany(datas)
        console.log('Inserted documents', result)

    } catch (error) {
        console.error(error)
    } finally{
        await client.close()
        console.log('Closed connection')
    }
}

insertMany()