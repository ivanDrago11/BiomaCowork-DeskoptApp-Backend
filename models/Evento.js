const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    apk: {
        type: String,
        required: true
    },
    

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Evento', EventoSchema );

