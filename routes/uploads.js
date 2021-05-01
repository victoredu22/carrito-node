const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
	cargarArchivo,
	actualizarImagen,
  mostrarImagen
} = require("../controllers/uploadsController");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarArchivoSubir, validarJWT } = require("../middlewares");

router.post("/", validarArchivoSubir, cargarArchivo);
router.put(
	"/:coleccion/:id",
	[
		validarJWT,
		validarArchivoSubir,
		check("id", "El id debe ser de mongo").isMongoId(),
		check("coleccion").custom((c) =>
			coleccionesPermitidas(c, ["usuarios", "productos"])
		),
		validarCampos,
	],
	actualizarImagen
);
router.get("/:coleccion/:id", [
	check("id", "El id debe ser de mongo").isMongoId(),
	check("coleccion").custom((c) =>
		coleccionesPermitidas(c, ["usuarios", "productos"])
	),
],mostrarImagen);


module.exports = router;
