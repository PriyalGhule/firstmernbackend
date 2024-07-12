const {z}=require("zod");

const loginSchema=z.object({
    email:
    z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email should be atleast 3 characters"})
    .max(255,{message:"email should not be more than 255 characters"}),


    password:
    z.string({required_error:"password is required"})
    .trim()
    .min(7,{message:"password should be atleast 7 characters"})
    .max(255,{message:"password should not be more than 255 characters"}),


})


module.exports=loginSchema;