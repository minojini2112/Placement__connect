const express = require("express")
const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcrypt")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'ds65kgmhq',
    api_key: '614127347772552',
    api_secret: 'xAG6lDg6nUKIhJAS9BXuKqPq2tA',
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'hackathons', 
      resource_type: 'auto', 
    },
  });

const app= express()
var prisma = new PrismaClient();
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/login",async(req,res)=>{
  const {email,password}= req.body;
  try{
    const isUserExists = await prisma.user.findUnique({
      where:{ email },
    });

    if(!isUserExists){
      return res
      .status(404)
      .json({ message: "user email not exists.Sign up" });
    }
    const passwordmatch = await bcrypt.compare(password, isUserExists.password);

    if (!passwordmatch) {
      return res.status(401).json({ message: "Invalid user password" });
    }else{
       return res.status(201).json({message:"login successfull",data: isUserExists});
    }
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/getprofile", async (req, res) => {
  const data = req.body;

  if (!data.name || !data.department || !data.year || !data.class || !data.register_number || !data.roll_no) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const profiledetails = await prisma.profile.create({
      data: {
        name: data.name,
        department: data.department,
        year: data.year,
        class: data.class,
        register_number: data.register_number,
        roll_no: data.roll_no,
        staff_incharge: data.staff_incharge,
        class_incharge: data.class_incharge,
        placement_head: data.placement_head
      },
    });
    return res.status(201).json({ message: "Profile created successfully", data: profiledetails });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

app.post("/participation", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'pdf', maxCount: 1 }]), async (req,res)=>{
    const data =  req.body;

    try{
        if (!data.user_id || !data.competition_name || !data.college || !data.date){
            return res.status(400).json({message:"All Fields are required"});
        }
        
        const imageUrls = req.files['image'] 
          ? req.files['image'].map(file => file.path).join(', ') 
          : '';
        const pdfUrl = req.files['pdf'] ? req.files['pdf'][0].path : null; 
        const formattedDate = new Date(data.date).toISOString(); 
        
        const participation = await prisma.participation.create({
            data:{
                user_id : data.user_id,
                competition_name: data.competition_name,
                college:data.college,
                date : formattedDate,
                certificates : imageUrls,
                report : pdfUrl
            },
        });
        return res.status(201).json({message:"Participation details successfully stored", data:participation});
    } catch(error){
        return res.status(500).json({message:error})
    }
});

app.listen(3005, () => {
    console.log("Server is running on port 3002");
  });
  