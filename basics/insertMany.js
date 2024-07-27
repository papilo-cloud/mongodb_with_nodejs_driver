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
                _id: 7,
                account_id: 'MBD578474883',
                account_type: 'savings',
                account_holder: 'Pete Oliver',
                balance: 1491.4,
                transfers_complete: ['TR12345', 'TR29901']
            },
            {
                _id: 8,
                account_id: 'BhT0993398376',
                account_type: 'current',
                account_holder: 'Michael Mane',
                balance: 382.4,
                transfers_complete: []
            },
            {
                _id: 9,
                account_id: 'DWD548858709',
                account_type: 'savings',
                account_holder: 'Drag Wiz',
                balance: 1222.9,
                transfers_complete: ['TR29901']
            },
            {
                _id: 10,
                account_id: 'WED389758094',
                account_type: 'current',
                account_holder: 'Hajara Habibu',
                balance: 920.4,
                transfers_complete: []
            },
            {
                _id: 11,
                account_id: 'RGT88785644332',
                account_type: 'savings',
                account_holder: 'Mike Gosing',
                balance: 1102.1,
                transfers_complete: []
            },
            {
                _id: 12,
                account_id: 'MNh3437738498',
                account_type: 'current',
                account_holder: 'Ola Janet',
                balance: 891.0,
                transfers_complete: ['TR12345']
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