// Creatin a new database and collection with the $out aggregation stage
const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function outStage() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('sample_airbnb')
        const collection = database.collection('listingsAndReviews')

        // define the aggregation pipeline
        const pipeline = [
            {
                $match: {
                    property_type: 'House'
                }
            },
            {
                $project: {
                    bed_type: 1,
                    accommodates: 1,
                    notes: 1,
                    price: 1,
                    beds: 1,
                    address: 1
                }
            },
            {
                $limit: 10
            },
            {
                $out: {
                    db: 'my_database',
                    coll: 'agent'
                }
            }
        ];

        // Execute the aggregation pipeline
        const result = await collection.aggregate(pipeline)
        console.log('New DB ceated successfully')
    } catch (error){
        console.error(error)
    } finally{
        await client.close()
        console.log('Connection ends')
    }
}

outStage()