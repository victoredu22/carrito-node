const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
  activo:{
    type:Boolean,
    default:true,
    required: true
  },
  titulo:{
    type:String,
    required:true,
  },
  descripcion:{
    type:String,
    required:true,
  },
  precio:{
    type:Number,
    required:true,
  },
  oferta:{
    type:Boolean,
    default:true
  },
  envio:{
    type:Boolean,
    default:true
  },
  levelStars:{
    type:Number,
    required:true,
  },
  fechaPublicacion:{
    type:Date,
    required:true
  },
  categoria:{
    type:Schema.Types.ObjectId,
    ref:'Categoria',
    required:true
  },
  img: { type: String }

}) 
ProductoSchema.methods.toJSON = function(){
  const {__v, _id, ...producto } = this.toObject();
  producto.uid = _id;
  return producto;
}


module.exports = model('Producto', ProductoSchema);