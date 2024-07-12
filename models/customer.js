const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const custSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false

    }
})

custSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password);
}


custSchema.methods.generateToken=async function(){
    try{
        return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin
            },
            "world",
            {
                expiresIn:"30d",
            }
        );
    }

    catch(error){
        console.log(error);
    }
}

custSchema.pre('save',async function(next){
    const user=this;
   
        if(!user.isModified('password')){
            return next();
        }
        try{
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
        next();
    }
    catch(error){
        next(error);
    }

})

module.exports=mongoose.model('Customer3',custSchema);