const { response, request } = require("express");
const Categoria = require("../models/categoria");


const categoriaGet = async(req,res = response) => {
  const categoria = await Categoria.find().skip(Number(0)).limit(Number(10));

	res.json({
		categoriaTotal:categoria.length,
    categoria
	});
};


const categoriaPost = async (req, res = response)=>{
  const body = req.body;

  const categoria = new Categoria(body);
  await categoria.save();

  res.json({
    msg:"hola soy el post",
    categoria
  });
}


const categoriaPut = async (req, res = response)=>{
  const uid = req.params.id;
  const datos = req.body;

  const categoria = await Categoria.findByIdAndUpdate(uid,datos);

  res.json({
    msg:'Se ha actualizado la categoria con exito',
    categoria:datos
  })
} 


module.exports = {
	categoriaGet,
  categoriaPost,
  categoriaPut
};
