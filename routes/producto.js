const { Router } = require("express");

const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();
const {
	productoGet,
	productoPost,
} = require("../controllers/productoController");
const { check } = require("express-validator");

router.get("/", productoGet);
router.post(
	"/",
	[check("nombre", "El nombre es vacio").not().isEmpty(),validarCampos],
	productoPost
);

module.exports = router;
