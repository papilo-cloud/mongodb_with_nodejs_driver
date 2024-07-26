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

const documentToUpdate = { account_type: 'current' }
const update = {$push: {transfers_complete: 'TR20020'}}

const main = async () => {
    try {
        await connectToDatabase()
        const result = await accountsCollection.updateMany(documentToUpdate, update)
        result.modifiedCount > 0 ?
        console.log(`Updated ${result.modifiedCount} documents`):
        console.log('No documents updated')
        
    }catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('disconnected from MongoDB')
    }
}

main()