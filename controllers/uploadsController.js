const path = require('path');
const fs = require('fs');

const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
	try {
		//imagenes
		const pathCompleto = await subirArchivo(
			req.files,
			["txt", "md"],
			"textos"
		);
		res.json({
			msg: pathCompleto,
		});
	} catch (msg) {
		res.status(400).json({ msg });
	}
};

const actualizarImagen = async (req, res = response) => {


	const { id:uid, coleccion } = req.params;

	let modelo;

	switch (coleccion) {
		case "usuarios":
			modelo = await Usuario.findById(uid);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`,
				});
			}

			break;

		case "productos":
			modelo = await Producto.findById(uid);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`,
				});
			}

			break;

		default:
			return res.status(500).json({ msg: "Se me olvidó validar esto" });
	}

	//Limpiar imagenes previas
	if(modelo.img){
		//Hay que borrar imagen
		const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img );
		if(fs.existsSync(pathImagen)){
			fs.unlinkSync(pathImagen);
		}
	}



	const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();


	res.json(modelo);
};

const mostrarImagen = async(req, res = response)=>{
	const { id, coleccion } = req.params;

	let modelo;

	switch (coleccion) {
		case "usuarios":
			modelo = await Usuario.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`,
				});
			}

			break;

		case "productos":
			modelo = await Producto.findById(id);
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`,
				});
			}

			break;

		default:
			return res.status(500).json({ msg: "Se me olvidó validar esto" });
	}

	//Limpiar imagenes previas
	if(modelo.img){
		//muestra la imagen
		const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img );
		if(fs.existsSync(pathImagen)){
			return res.sendFile(pathImagen)
		}
	}
	const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg');
	return res.sendFile(pathNoImagen)

}


module.exports = {
	cargarArchivo,
	actualizarImagen,
	mostrarImagen
};
