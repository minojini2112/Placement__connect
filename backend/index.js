const express = require("express")
const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcrypt")

const app= express()
app.use(express.json());

var prisma = new PrismaClient();

app.post("/signin",async(req,res)=>{
  const {email , password, role}= req.body;
  try{
   const isuserexist = await prisma.user.findUnique({
    where:{
        email: email
    },
   })
   if(isuserexist){
    return res.status(409).json({message:"User already exists"})
   }
   const hashedpassword = await bcrypt.hash(password,10);
   const newuser = await prisma.user.create({
    data:{
       email: email,
       password: hashedpassword,
       role: role
    },
   })
   return res.status(201).json({message:"User created successfully",data:newuser})
  }catch(error){
    return res.status(500).json({message:error})
  }
})

app.listen(3002, () => {
    console.log("Server is running on port 3002");
  });
  