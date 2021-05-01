const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
  titulo:{
    type:String,
    required:true,
  },
  cantidad:{
    type:Number,
    required:true,
  },
  activo:{
    type:Boolean,
    default:true,
    required: true
  },
})

CategoriaSchema.methods.toJSON = function(){
  const {__v, _id, ...categoria } = this.toObject();
  categoria.uid = _id;
  return categoria;
}
module.exports = model('Categoria', CategoriaSchema);