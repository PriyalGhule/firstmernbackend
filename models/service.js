const mongoose=require('mongoose');

const serviceSchema=mongoose.Schema({
    product:{
        type:String,
        required:true,
    },

    price:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
    }
})


module.exports=mongoose.model("Service",serviceSchema);