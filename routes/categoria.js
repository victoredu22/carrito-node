const { Router } = require("express");
const { categoriaGet,categoriaPost, categoriaPut } = require("../controllers/categoriaController");
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();
const { check } = require("express-validator");

router.get('/',categoriaGet);
router.post('/',[
  check("titulo", "El campo titulo esta vacio").not().isEmpty(),
  check("cantidad", "El campo cantidad esta vacio").not().isEmpty(),
  validarCampos
],categoriaPost);

router.put("/:id",categoriaPut);
module.exports = router;