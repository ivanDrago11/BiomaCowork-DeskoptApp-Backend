const { Schema, model } = require('mongoose');

const AreaSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    amenities: {
        type: Array,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    capacity: {
        type: String,
        required: true   
    },
    image: {
        type: String,
        required: true
    },
    // id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario',
    //     required: true
    // }
    
});

AreaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Area', AreaSchema );


