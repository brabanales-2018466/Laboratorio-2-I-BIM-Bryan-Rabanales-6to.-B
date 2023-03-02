const {request, response} = require('express');

//Verificador si es admin/maestro
const esMaestroRole = (req = request, res = response, next) => {

    //Si no viene el usuario
    if (!req.user) {
        return res.status(500).json({
            msg: 'No podemos validar tu rol sin que inicies sesion antes.'
        })
    }

    //Verificar que el rol sea MAESTRO_ROLE
    const {role, nombre} = req.user
    if(role != 'ROLE_MAESTRO'){
        return res.status(401).json({
            msg: 'Acción permitida solo para rol Maestros.'
        })
    }



    next();
}

const esAlumnoRole = (req = request, res = response) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'No podemos validar tu rol sin que inicies sesion antes.'

        })
    }
}
module.exports = {
    esMaestroRole,
    esAlumnoRole
}