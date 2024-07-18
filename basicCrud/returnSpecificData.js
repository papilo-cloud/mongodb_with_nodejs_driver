const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function returnSpecificData() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('sample')
        const collection = database.collection('users')

        const query = {}
        const projection = {name: 1, age: 1}

        const cursor = collection.find(query, projection)
        await cursor.forEach(document => {
            console.log(document)
        })
        
    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('Disconnected')
    }
}
returnSpecificData()