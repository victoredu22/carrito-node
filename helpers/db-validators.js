const Role = require("../models/role");
const Usuario = require("../models/usuario");

const roleValido = async(rol = '' ) =>{
  const existeRol = await Role.findOne({rol});
  if(!existeRol){
    throw new Error(`El rol ${rol} no está registrado en la bd`)
  } 
}

const correoExiste = async(correo = '' ) =>{
  const existeCorreo = await Usuario.findOne({correo});
  if(existeCorreo){
    throw new Error(`El correo ${correo} ya está registrado`)
  } 
}

const existeUsuarioPorId = async(id)=>{
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
    throw new Error(`El id no existe ${id}`);
  }
}
/**
 * Validar coleccione permitidas
 * 
 */
const coleccionesPermitidas = (coleccion='', colecciones = [])=>{
  const incluida = colecciones.includes(coleccion);
  if(!incluida){
    throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
  }

  return true
}

module.exports = {
  roleValido,
  correoExiste,
  existeUsuarioPorId,
  coleccionesPermitidas
}