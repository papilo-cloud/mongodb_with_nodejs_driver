const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri)

const dbname = 'bank'
const collectionName = 'accounts'

const accountsCollection = client.db(dbname).collection(collectionName)

const connectToDatabase = async () => {
    try{
        await client.connect()
        console.log(`connected to the ${dbname} database`)
    } catch(error){
        console.error(error)
    }
}

const documentToFindind = { balance: {$gt: 3000}}

const main = async () => {
    try {
        await connectToDatabase()
        const result = await accountsCollection.find(documentToFindind).toArray()
        result.forEach(doc => console.log(doc))

    }catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('disconnected from MongoDB')
    }
}

main()