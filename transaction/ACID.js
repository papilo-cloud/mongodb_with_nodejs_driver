const { MongoClient } = require("mongodb");
const uri = require('../uri')
const client = new MongoClient(uri)

// collections
const accounts = client.db('bank').collection('accounts')
const transfers = client.db('bank').collection('transfers')

// Account information
const account_id_sender = 'CFD578412673'
const account_id_receiver = 'MBD578458784'
let transaction_amount = 100

// Start the session
const session = client.startSession()

// use withTransaction to start a transaction, execute the callback, and commit the transaction
// The callback for withTransaction must be async/await
// Note: Each individual opeations must be awaited and have the session passed in as an argument
const main = async () => {
    try {
        await client.connect()
        const transactionResults = await session.withTransaction( async () => {
            // Step1: update the account sender balance
            const updateSenderResults = await accounts.updateOne(
                {account_id: account_id_sender},
                {$inc: { balance: -transaction_amount}},
                {session}
            )
            console.log(`${updateSenderResults.matchedCount} document(s) mathched the filter,
                updated ${updateSenderResults.modifiedCount} document(s) for the sender account`)
            
                // Step2: Update the account receiver balance
                const updateReceiverResults = await accounts.updateOne(
                    {account_id: account_id_receiver},
                    {$inc: {balance: transaction_amount}},
                    {session}
                )
                console.log(`${updateReceiverResults.matchedCount} document(s) mathched the filter,
                updated ${updateReceiverResults.modifiedCount} document(s) for the sender account`)

                // Step3: Insert the transfer document
                const transfer =  {
                    transfer_id: 'TR21873',
                    amount: transaction_amount,
                    from_account: account_id_sender,
                    to_account: account_id_receiver
                }

                const insertTransferResults = await transfers.insertOne(transfer, {session})
                console.log(`Successfully inserted ${insertTransferResults.insertedId} into the 
                    transfers collection`)
                
                // Step4: Update the transfers_complete field for the sender account
                const updateSenderTransferResults = await accounts.updateOne(
                    {account_id: account_id_sender},
                    {$push: {transfers_complete: transfer.transfer_id}},
                    {session}
                )
                console.log(`${updateSenderTransferResults.matchedCount} document(s) mathched in the transfers
                collection, updated ${updateSenderTransferResults.modifiedCount} document(s) for the sender account`)

                // Step4: Update the transfers_complete field for the sender account
                const updateReceiverTransferResults = await accounts.updateOne(
                    {account_id: account_id_receiver},
                    {$push: {transfers_complete: transfer.transfer_id}},
                    {session}
                )
                console.log(`${updateReceiverTransferResults.matchedCount} document(s) mathched in the transfers
                collection, updated ${updateReceiverTransferResults.modifiedCount} document(s) for the sender account`)
                    
        })

        console.log('Committing transaction...')
 
        // If the callback for withTransaction returns successfully without throwing an error, the transaction
        // will be commited
        if (transactionResults) {
            console.log('The reservation was successfully created.')
        } else{
            console.log('The reservation was intentionally aborted.')
        }
        
    }catch(error) {
        console.error(`The transaction was: ${error}`)
        process.exit(1)
    } finally {
        await session.endSession()
        await client.close()
        console.log('disconnected from MongoDB')
    }
}

main()