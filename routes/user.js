const express = require("express")
const router = express.Router();

const {login,signup} = require("../controllers/auth");
const {auth,isStudent,isAdmin} = require("../middlewares/auth")

router.post("/login",login);
router.post("/signup",signup);


router.get("/test",auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the Protected Route for Testing"

    })

})
// protected routes 

router.get("/student",auth,isStudent,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the Protected Route for Student!"

    })
}),

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the Protected Route for Admin!"

    })
})

module.exports = router;