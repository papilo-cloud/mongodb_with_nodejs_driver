const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function main() {
    try {
        await client.connect()
        console.log('Connecting to MongoDB')

        const database = client.db('sample')
        const collection = database.collection('users')
        const result = await collection.insertOne({
            name: 'Abdul',
            age: 25,
            address: {
                street: '123 Main St.',
                city: 'K/West',
                country: 'Nigeria'
            },
            hobbies: ['reading', 'coding', 'football']
        })
        console.log(result)

    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('Closed connection')
    }
}
main()