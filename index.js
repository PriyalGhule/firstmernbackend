const express=require('express')
const app=express();
const connectDb=require('./database');
const Customer=require('./models/customer');
const bcrypt=require('bcryptjs');
const signupSchema=require('./validators/auth-validator');
const validate=require('./middleware/validate');
const errorMiddleware = require('./middleware/error-middleware');
const loginSchema = require('./validators/login-validator');
const contactUs=require('./models/contact');
const contactSchema = require('./validators/contact-validator');
const cors=require("cors");
const authMiddleware=require("./middleware/auth-middleware");
const Service=require('./models/service');
const adminRoute=require('./routes/admin-router');
const PORT=5000

app.use(express.json());


const corsOptions={
    origin:"http://localhost:5173https://astonishing-heliotrope-dd80b0.netlify.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Authentication']
}

app.use(cors(corsOptions));

app.use('/admin',adminRoute)
app.get('/',(req,res)=>{
    res.status(200).send("Heloooo world");
})

app.post( '/register', validate(signupSchema),async (req,res)=>{
    try{
       const {name,email,phone,password}=req.body;
        const userExist=await Customer.findOne({email});
        if(userExist){
            return res.status(200).json("Email already exists!");
        }
        const customer=new Customer(req.body);
        await customer.save();


        res.status(201).json({
            msg:"user registered successfully",
            token:await customer.generateToken(),
            userId:customer._id.toString(),
        })
        
    }
    catch(error){
        res.status(500).json("Internal server error"+error);
    }
})


app.post('/login', validate(loginSchema), async(req, res)=>{

    try{
    const {email, password}=req.body;
    const userExist=await Customer.findOne({email});
    if(!userExist){
        return res.status(200).json("Invalid credentials");

    }

    const user=await userExist.comparePassword(password);
    if(user){
        res.status(201).json({
            msg:"Login successful",
            token:await userExist.generateToken(),
            userId:userExist._id.toString(),
        })
    }else{
        res.status(401).json("Invalid email or password");
    }
}catch(error){
    res.status(500).json("Internal server error"+error);
}
})


app.post('/contactus', validate(contactSchema), async(req,res)=>{
    try{
        const {name,email,message}=req.body;
        const contact= new contactUs(req.body);
        contact.save();

        res.status(201).json({
            msg:"contact saved successfully",
            
        })
    }
    catch(error){
        res.status(500).json("Internal server error");
    }
})


app.get('/services',async(req,res)=>{
    try{
        const service=await Service.find({});
        res.status(200).json({msg:service});
    }
    catch(error){
        res.status(500).json("Internal server error",error);
    }
})

app.get('/customers', async (req,res)=>{
    try{
    const customers=await Customer.find({});
    res.status(200).json({message:customers});
    }
    catch(error){
        res.status(500).json("Internal server error"+error);
    }

})


app.get("/user", authMiddleware, async(req,res)=>{
    try{
        const userData=req.user;
        console.log(userData);
        res.status(200).json({msg:userData});

        


    }

    catch(error){
        console.log("error from user route ",error);
    }
})


app.use(errorMiddleware);


connectDb.then(()=>{
    try{
    app.listen(PORT,()=>{
    console.log("app is running");
})
console.log("Database connected successfully");
}

catch(error){
    console.log("database not connected something went wrong"+error);
}})
