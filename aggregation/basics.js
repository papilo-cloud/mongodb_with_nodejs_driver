const { MongoClient } = require("mongodb")
const uri = require('../uri')

const client =  new MongoClient(uri)

const dbname = 'bank'
const collectionName = 'accounts'
const accountsCollection = client.db(dbname).collection(collectionName)

const pipeline = [
    { $match: {
        account_type: 'savings',
        balance: {$gt: 3000}
    }},
    {
        $project: {
            _id: 0,
            account_holder: {$toUpper: '$account_holder'},
            account_type: {$toUpper: '$account_type'},
            balance: 1
        }
    }
]

async function main () {
    try {
        await client.connect()
        console.log(`Connected to the ${dbname} database`)

        const result = await accountsCollection.aggregate(pipeline).toArray()

        console.log(result)

    } catch(error){
        console.error(error)
    } finally{
        await client.close()
        console.log("Disconnected")
    }
}
main()