const { MongoClient } = require("mongodb");
const uri = require('./uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function main() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('')
        const collection = database.collection('')
        const result = await collection.aggregate()
        
        console.log(result)
    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
    }
}
main()