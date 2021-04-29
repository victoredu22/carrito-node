const {response, request} = require('express')

const Producto = require('../models/producto')

const productoGet =(req = request, res = response)=>{
  res.json({
    msg:'hola soy el get'
  })
}

const productoPost = (req = request, res = response)=>{
  

  const body = req.body;
  const producto = new Producto(body);
  producto.save();

  res.json({
    msg:'hola soy el post',
    producto
  })
}
module.exports = {
  productoGet,
  productoPost
}