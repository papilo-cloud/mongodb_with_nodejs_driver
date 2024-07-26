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

const documentToUpdate = { _id: 7}
const update = {$inc: {balance: 100}}

const main = async () => {
    try {
        await connectToDatabase()
        const result = await accountsCollection.updateOne(documentToUpdate, update)
        result.modifiedCount == 1 ?
        console.log('One document updated'):
        console.log('No document updated')
        
    }catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('disconnected from MongoDB')
    }
}

main()