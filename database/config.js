const mongoose = require('mongoose');


const dbConection = async() =>{
  try{
    await mongoose.connect(process.env.MONGO_CNN,{
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex:true,
    })

    console.log('bd online!!!');
  }catch(err){
    console.log(err);
    throw new Error('Error a la hora de conectarse a bd');
  }
}

module.exports = {
  dbConection
}