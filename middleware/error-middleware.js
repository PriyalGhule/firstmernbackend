const errorMiddleware=(err,req,res, next)=>{
    const status=err.status || 500;
    const message=err.message || "backenderror";
    const extraDetails=err.extraDetails || "extradets";

    return res.status(status).json({message,extraDetails});

}

module.exports=errorMiddleware;