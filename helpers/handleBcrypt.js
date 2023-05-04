const bcrypt = require('bcryptjs');

const encrypt = async (textplain) => {
    const hash = await bcrypt.hash(textplain, 10);
    return hash;
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

module.export = {encrypt, compare};