const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuarioDelete,
} = require("../controllers/usuariosController");
const {
	roleValido,
	correoExiste,
	existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

router.get("/", usuariosGet);
router.post(
	"/",
	[
		check("nombre", "El nombre es vacio").not().isEmpty(),
		check("correo", "El correo es invalido").custom(correoExiste),
		check("password", "El password debe ser mas de 6 letras").isLength({
			min: 6,
		}),
		//check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("rol").custom(roleValido),
		validarCampos,
	],
	usuariosPost
);
router.put(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeUsuarioPorId),
		check("rol").custom(roleValido),
		validarCampos,
	],
	usuariosPut
);

router.delete("/:id", [
		validarJWT, 
		//esAdminRole
		tieneRole('ADMIN_ROLE','COMPRA_ROLE'),
	], usuarioDelete);

router.get("*", (req, res) => {
	res.send("404 Page not found");
});

module.exports = router;
