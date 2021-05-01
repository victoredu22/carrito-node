const { Router } = require("express");
const { categoriaGet,categoriaPost, categoriaPut } = require("../controllers/categoriaController");
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares");

router.get('/',categoriaGet);


router.post('/',[
  validarJWT,
  check("titulo", "El campo titulo esta vacio").not().isEmpty(),
  check("cantidad", "El campo cantidad esta vacio").not().isEmpty(),
  validarCampos
],categoriaPost);

router.put("/:id",validarJWT,categoriaPut);
module.exports = router;