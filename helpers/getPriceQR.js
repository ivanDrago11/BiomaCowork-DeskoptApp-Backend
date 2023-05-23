const dayjs = require("dayjs");
const Area = require('../models/Area');

 function getPriceAndQR(dateStart, dateEnd, nameArea, pricePerHour){
    // const areas = await Area.find()
    const horas = dayjs(dateEnd).diff(dateStart, 'hour', true);
    console.log('Horas reservadas: '+ horas);
    console.log('Precio por hora: '+ pricePerHour);
    // const area = areas.find(element => element.name == nameArea);
    const price = Math.round(parseFloat(pricePerHour) * horas);
    const codigoQR = dateStart + dateEnd + pricePerHour;
    return {
      price,
      codigoQR
    }
  }

  module.exports = { 
    getPriceAndQR
  }
