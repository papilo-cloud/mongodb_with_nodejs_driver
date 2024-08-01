const mongoose = require('mongoose')
const uri = require('../uri')
const { Schema, model, SchemaTypes ,connect } = mongoose

const breakfastSchema = new Schema({
    eggs: {
        type: Number,
        min: [5, 'Too few eggs, got {VALUE}'],
        max: 12
    },
    bacon: {
        type: Number,
        required: [true, 'Why no bacon?'],
    },
    drink: {
        type: String,
        enum: {
            values: ['Coffee', 'Tea'],
            message: '{VALUE} is not supported'
        },
        required: function() {
            return this.bacon > 3
        }
    }
})

const Breakfast = model('Breakfast', breakfastSchema)

const badBreakfast = new Breakfast({
    eggs: 2,
    bacon: 0,
    drink: 'Milk'
})
async function main() {
    await connect(uri)
    console.log('Connected to the database')
    await badBreakfast.save()
    const article = await Breakfast.find({})

    const err = badBreakfast.validateSync()
    // assert.eq/
    // console.log(article)
}
main().catch(err => console.error(err))