const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    //Si no viene el token
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay un token en el header de tu petición.'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        // leer al usuario que corresponda el uid
        const user = await User.findById( uid );

        //Verificar si el uid del usuario no existe
        if ( !user ) {
            return res.status(401).json({
                msg: 'El token no es valido o el usuario que intenta autenticar no existe.'

            });
        }

        req.user = user;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'

        })
    }

}


module.exports = {
    validarJWT
}