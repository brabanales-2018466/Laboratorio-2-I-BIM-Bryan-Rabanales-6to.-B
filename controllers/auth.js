const {request, response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req = request, res = response) => {
    const {email, password} = req.body;

    try {

        //Verficiar si el email existe
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'El correo no es correcto. - (El correo no existe)'
            })
        }
        if (!user){
            return res.status(202).json({
                msg: 'No se ha encontrado el usuario.'
            })
        }
        //const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: 'La password no es valida.'

            })
        }

        //Gernerar WJT
        const token = await generarJWT(user.id);
    
        res.json({
            msg: 'Sesión iniciada con exito',
            email,
            password,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador del sistema.'
        })
    }

}

module.exports= {
    login
}