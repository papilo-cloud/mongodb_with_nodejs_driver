const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function countingDocuments() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('sample')
        const collection = database.collection('users')

        const query = {}
        const count = await collection.countDocuments(query)
        console.log('Number of documents:', count)
        
    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('Disconnected')
    }
}
countingDocuments()