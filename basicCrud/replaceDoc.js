const {mongoclient, MongoClient} = require('mongodb');

// MongoDB connection string
const uri = require('../uri')
// Connect to MongoDB
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function replaceDocument() {
    try {
        await client.connect();
        console.log('Connected to MongoDB')

        // Access the database and collection
        const database = client.db('library');
        const collection = database.collection('books');

        // Query for the document to replace
        const query = {title: 'Javascript in Action'}
        const replacementDocument = {
                _id: 47,
                title: 'Atlas in Action',
                isbn: '193546728279',
                pageCount: 3,
                status: 'legacy',
                authors: [ 'Joe' ],
                instock: false
              }
            

        // Replace the document
        const result = await collection.replaceOne(query, replacementDocument);
        console.log('Document replaced', result.modifiedCount);
    } catch(error) {
        console.error(error)
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB')
    }
}
replaceDocument()