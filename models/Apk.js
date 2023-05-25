const { Schema, model } = require('mongoose');

const ApkSchema = Schema({

    apk: {
        type: String,
        required: true
    },
    

});

ApkSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Apk', ApkSchema );

