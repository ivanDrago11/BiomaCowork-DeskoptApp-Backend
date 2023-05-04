const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({

    area: {
        type: String,
        required: true
    },
    usuario: {
        type: String,  
        required: true      
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    codigoQR: {
        type: String,
        required: true
    },


    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario2',
    //     required: true
    // }

});

ReservaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Reserva', ReservaSchema );

