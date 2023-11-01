const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect( 'mongodb+srv://ivansaidflores:vallarta12345@biomadb.jnojbd3.mongodb.net/?retryWrites=true&w=majority' , {
            // await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }


}


module.exports = {
    dbConnection
}


// // const mongoose = require('mongoose');
// require('dotenv').config()
// const mysql = require('mysql2')

// const dbConnection = async() => {
//     try {
        
//         // await mongoose.connect( process.env.DB_CNN , {
//         //     useNewUrlParser: true, 
//         //     useUnifiedTopology: true,
//         //     useCreateIndex: true
//         // });

//         // console.log('DB Online');
//         await mysql.createConnection(process.env.DATABASE_URL)
//         console.log('Connected to PlanetScale!')

//     } catch (error) {
//         console.log(error);
//         throw new Error('Error a la hora de inicializar BD');
//     }


// }


// module.exports = {
//     dbConnection
// }