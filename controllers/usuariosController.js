const {response, request} = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario')

const usuariosGet =  async (req = request, res = response) =>{
  /* const {q,nombre="victor", apiKey,limit} = req.query; */
  const {limite = 1, desde = 0} = req.query;

  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));

  res.json({
    msg:'get API - controlador',
    usuarios
  })
}

const usuariosPost =  async (req, res = response) =>{
  const {nombre,correo,password,rol} = req.body;
  const usuario = new Usuario({nombre,correo,password,rol});


  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en bd
  await usuario.save();
  res.json({
    msg:'este es el post',
    usuario
  }) 
}

const usuariosPut =  async (req, res = response) =>{
  const _id = req.params.id;
  const {password,google,correo, ...resto} = req.body;

   if(password){
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(_id,resto);
  
   res.json({
      msg:'El usuario fue guardado exitosamente',
      usuario:resto
  });
}


const usuarioDelete = (req, res = response)=>{
  const uid = req.uid;
  const usuarioAutenticado = req.usuario;


  res.json({
    msg:"hola soy delete",
    uid,
    usuarioAutenticado
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuarioDelete
}