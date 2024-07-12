const mongoose=require('mongoose');

const uri="mongodb+srv://smileypie123456:priyalghule@cluster0.9simkbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb=mongoose.connect(uri);

module.exports=connectDb;