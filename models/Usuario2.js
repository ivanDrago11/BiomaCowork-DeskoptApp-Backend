const { Schema, model } = require('mongoose');

const UsuarioSchema2 = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    // id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario',
    //     required: true
    // }
    
});

UsuarioSchema2.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Usuario2', UsuarioSchema2 );


