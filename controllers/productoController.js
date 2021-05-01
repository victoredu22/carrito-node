const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const Producto = require("../models/producto");

const productoGet = async (req = request, res = response) => {
	const producto = await Producto.find().skip(Number(0)).limit(Number(10));

	res.json({
		cantidadTotal: producto.length,
		producto,
	});
};

const productoPost = async (req = request, res = response) => {
	const body = req.body;
	const producto = new Producto(body);
	await producto.save();

	res.json({
		msg: "hola soy el post",
		producto,
	});
};

const productoPut = async (req, res = response) => {
	const uid = req.params.id;
	const camposNuevos = req.body;

	const ingresoProducto = await Producto.findByIdAndUpdate(uid,camposNuevos);

	res.json({
	  msg:'El producto fue guardado exitosamente',
		ingresoProducto:camposNuevos
	});
};
module.exports = {
	productoGet,
	productoPost,
	productoPut,
};
