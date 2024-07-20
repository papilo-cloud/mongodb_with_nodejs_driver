const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function aggregateSalesByCAtegory() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const database = client.db('todo')
        const collection = database.collection('students_scores')

        // define the aggregation pipeline
        const pipeline = [
            {
                $group: {
                    _id: '$class_id',
                    totalScores: { $avg: '$scores.score'}
                }
            }
        ];

        // Execute the aggregation pipeline
        const result = await collection.aggregate(pipeline).toArray();
        console.log('Aggregation result:', result)

    } catch (error){
        console.error(error)
    } finally{
        await client.close()
        console.log('Connection ends')
    }
}

aggregateSalesByCAtegory()