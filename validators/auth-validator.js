const {z}=require("zod");

const signupSchema=z.object({
    name:
    z.string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name should be atleast 3 characters"})
    .max(255,{message:"Name should not be more than 255 characters"}),

    email:
    z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email should be atleast 3 characters"})
    .max(255,{message:"email should not be more than 255 characters"}),

    phone:
    z.string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone should be atleast 10 characters"})
    .max(10,{message:"phone should not be more than 10 characters"}),

    password:
    z.string({required_error:"password is required"})
    .trim()
    .min(7,{message:"password should be atleast 7 characters"})
    .max(255,{message:"password should not be more than 255 characters"}),
});

module.exports=signupSchema;