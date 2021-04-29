const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
  nombre:{
    type:String,
    required:[true,'El nombre es obligatorio']
  },
  precio:{
    type:String,
    required:[true,'El nombre es obligatorio']
  }
}) 

module.exports = model('Producto', ProductoSchema);