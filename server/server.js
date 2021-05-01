const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConection } = require('../database/config');

class Server{
  constructor(){
    this.app = express();
    this.port =  process.env.PORT;


    this.usuariosPath = '/api/usuarios';
    this.productoPath = '/api/producto';
    this.categoriaPath = '/api/categoria';

    this.authPath = '/api/auth';
    this.uploadPath = '/api/upload'

    //conectar a base datos
    this.conectarBD();


    //Middlewwares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarBD(){
    await dbConection();
  }
  middlewares(){
    //cors
    this.app.use(cors());
    
    //parseo y lectura
    this.app.use(express.json());

    //carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  
  routes(){
    this.app.use(this.authPath , require('../routes/auth'));



    this.app.use(this.usuariosPath , require('../routes/usuarios'));
    this.app.use(this.productoPath , require('../routes/producto'));
    this.app.use(this.uploadPath , require('../routes/uploads'));
    this.app.use(this.categoriaPath , require('../routes/categoria'));
    
  }
  

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Servidor corriendo en puerto', this.port);
    }) 
  }
}

module.exports = Server;
