const { Router } = require("express");
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();


const {
	productoGet,
	productoPost,
	productoPut
} = require("../controllers/productoController");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares");

router.get("/", productoGet);
router.post(
	"/",
	[
		validarJWT,
		check("titulo", "El campo titulo esta vacio").not().isEmpty(),
		check("descripcion", "El campo descripcion esta vacio").not().isEmpty(),
		check("precio", "El campo precio esta vacio").not().isEmpty(),
		check("levelStars", "El campo level stars esta vacio").not().isEmpty(),
		check("categoria", "El campo categoria esta vacio").not().isEmpty(),
		check("fechaPublicacion", "El campo fecha de publicacion esta vacio").not().isEmpty(),
		validarCampos],
		productoPost
);
router.put(
	"/:id",[
		validarJWT,
		check("titulo", "El campo titulo esta vacio").not().isEmpty(),
		check("descripcion", "El campo descripcion esta vacio").not().isEmpty(),
		check("precio", "El campo precio esta vacio").not().isEmpty(),
		check("levelStars", "El campo level stars esta vacio").not().isEmpty(),
		check("fechaPublicacion", "El campo fecha de publicacion esta vacio").not().isEmpty(),
	
		validarCampos],
	productoPut
);

module.exports = router;
