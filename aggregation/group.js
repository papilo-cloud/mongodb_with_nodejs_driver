const { MongoClient } = require("mongodb");
const uri = require('../uri')

const client = new MongoClient(uri)

const dbname = 'bank'
const collectionName = 'accounts'
const accountsCollection = client.db(dbname).collection(collectionName)

const pipeline = [
    {
        $match: {balance: {$lt: 1500}}
    },
    {
        $group: {
            _id: '$account_type',
            total_balance: {$sum: '$balance'},
            avg_balance: {$avg: '$balance'}
        }
    }
]

async function main() {
    try {
        await client.connect()
        console.log(`Connected to the ${dbname} database`)

        const result = await accountsCollection.aggregate(pipeline).toArray()
        console.log(result)
    } catch(error){
        console.error(error)
    } finally {
        await client.close()
        console.log(`Disconnected fron ${dbname} database`)
    }
}
main()