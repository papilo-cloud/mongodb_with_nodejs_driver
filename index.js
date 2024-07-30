const { MongoClient } = require("mongodb");
const uri = require('./uri')
const client = new MongoClient(uri)
const dbName = 'bank'

const connectToDatabase = async () => {
    try{
        await client.connect()
        console.log(`connected to the ${dbName} database`)
    } catch(error){
        console.error(error)
    }
}
async function main() {
    try {
        await connectToDatabase()
        const databaseList = await client.db().admin().listDatabases()
        databaseList.databases.forEach(db => console.log(`- ${db.name}`))
        
    } catch(error) {
        console.error(error)
    } finally {
        await client.close()
    }
}
main()