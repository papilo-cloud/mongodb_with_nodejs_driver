const {MongoClient} = require('mongodb')

const uri = require('../uri')

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function main() {
    try{
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('sample')
        const collection = database.collection('users')
        const results = await collection.insertMany([
            {
                _id: 12,
                name: 'John',
                age: 30,
                occupation: 'Teacher'
            },
            {
                _id: 22,
                name: 'Mike',
                age: 40,
                occupation: 'Coder'
            },
            {
                _id: 32,
                name: 'John',
                age: 26,
                occupation: 'Banker'
            }
        ])
        console.log('results', results)
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
        console.log('disconnected from MongoDB')
    }
}

main()