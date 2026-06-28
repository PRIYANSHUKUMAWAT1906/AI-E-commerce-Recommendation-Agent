const adminMiddleware=(req,res,next)=>{
    console.log("Admin middleware reached");
    console.log(req.user);
    if(req.user.role!=="admin"){
        return res.status(403).json({
            message:"Access denied"
        });}
        next();
    
}
module.exports = {
    adminMiddleware
};