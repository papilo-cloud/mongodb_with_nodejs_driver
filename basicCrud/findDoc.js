const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function main() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('sample')
        const collection = database.collection('users')

        const query = {age: {$gte: 30}}

        const cursor = collection.find(query)

        await cursor.forEach(document => {
            console.log('Found document', document)
        })

    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
    }
}
main()