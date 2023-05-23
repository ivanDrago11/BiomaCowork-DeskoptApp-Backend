const dayjs = require("dayjs");

 const validateBooking = (area, dateStart, dateEnd,reservaId = 0, reservas = []) => {
    // console.log(reservas)
    // console.log(dateStart)
    // console.log(dateEnd)
    // console.log(reservas[0].start)
    // console.log(reservas[0].end)
    // console.log(reservas[1].start)
    // console.log(reservas[1].end)
    if (dayjs(dateStart).isBefore(dayjs(dateEnd))) {
        let validStart = true;
        let validEnd = true;
        
        reservas.map((value, index) => {
                
                if (area == value.area) {
                    console.log('area: ' + area);
                    console.log('value.area: ' + value.area);
                    
                
                if (dayjs(dateStart).isAfter(dayjs(value.start))) {
                    if (dayjs(dateStart).isBefore(dayjs(value.end))){
                         console.log('inicio menor a reserva fin ' + index);
                         validStart = false;
                         if (reservaId === value.id) {
                            validStart = true;
                         }
                    }else{
                        console.log('inicio mayor a reserva fin ' + index);
                        // validStart = true;
                    }
                }else if (dayjs(dateStart).isSame(dayjs(value.start))) {
                     console.log('inicio igual a reserva inicio ' + index);
                     validStart = false;
                     if (reservaId === value.id) {
                        validStart = true;
                     }
                }else{
                    console.log('inicio menor a reserva inicio ' + index);
                    //  validStart = true;
                }

                ////////////////////

                if (dayjs(dateEnd).isAfter(dayjs(value.start))) {
                    if (dayjs(dateEnd).isBefore(dayjs(value.end))) {
                        console.log('fin menor a reserva fin ' + index);
                        validEnd = false;
                        if (reservaId === value.id) {
                            validEnd = true;
                         }
                    }else if (dayjs(dateEnd).isSame(dayjs(value.end))){
                        console.log('fin igual a reserva fin ' + index);
                        validEnd = false;
                        if (reservaId === value.id) {
                            validEnd = true;
                         }
                    }else if(dayjs(dateStart).isAfter(dayjs(value.end)) || dayjs(dateStart).isSame(dayjs(value.end))){
                        console.log('fin e inicio mayor a reserva fin ' + index);
                        // validEnd = true;+
                    }else{
                        console.log('fin e inicio no son mayores a reserva fin ')
                        validEnd = false;
                        if (reservaId === value.id) {
                            validEnd = true;
                         }
                    }
                }else{
                    console.log('fin es menor o igual a reserva inicio ' + index);
                    // validEnd = true;
               }

            }
            // else{
            //     validStart = true;
            //     validEnd = true;
            // }
            });


            if (validStart == true && validEnd == true) {
                console.log('Reserva Disponible');
                return {val: true,
                        msg: 'Reserva Disponible'};
            }else{
                console.log('Reserva No Disponible');
                return {val: false,
                        msg: 'Reserva No Disponible'};
            }
    }else{
        console.log('Error en las fechas');
        return {val: false,
                msg: 'Error en las fechas'};
    }
}

module.exports = {
    validateBooking
}