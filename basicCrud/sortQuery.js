const { MongoClient } = require("mongodb");
const uri = require('../uri')

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function sortQueryResults() {
    try {
        await client.connect()
        console.log('Connected')

        const database = client.db('sample')
        const collection = database.collection('users')

        const query = {}
        const limit = 2
        const sortOptions = {age: 1}

        const cursor = collection.find(query).limit(limit).sort(sortOptions)

        await cursor.forEach(document => {
            console.log('Sorted document:', document)
        })

    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('Disconnected')
    }
}

sortQueryResults()