const express = require("express")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hackathons',
    resource_type: 'raw',
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:{
    folder:'profile',
    resource_type:'auto',
  },
})

const app = express()
const prisma = new PrismaClient();

const upload = multer({ storage });
const storageUpload = multer({profileStorage});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/signin", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const isuserexist = await prisma.user.findUnique({
      where: {

        email: email
      },
    })
    if (isuserexist) {
      return res.status(409).json({ message: "User already exists" })
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = await prisma.user.create({
      data: {
        email: email,
        password: hashedpassword,
        role: role
      },
    })
    return res.status(201).json({ message: "User created successfully", data: newuser })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!isUserExists) {
      return res
        .status(404)
        .json({ message: "user email not exists.Sign up" });
    }
    const passwordmatch = await bcrypt.compare(password, isUserExists.password);

    if (!passwordmatch) {
      return res.status(401).json({ message: "Invalid user password" });
    } else {
      return res.status(201).json({ message: "login successfull", data: isUserExists });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/profile", storageUpload.single('image'), async (req, res) => {
  const data = req.body;

  if (!data.user_id || !data.name || !data.department || !data.year || !data.section || !data.register_number || !data.roll_no) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const imageUrl = req.file.path;

    const profiledetails = await prisma.profile.create({
      data: {
        user_id: parseInt(data.user_id),
        name: data.name,
        department: data.department,
        year: data.year,
        section: data.section,
        register_number: data.register_number,
        roll_no: data.roll_no,
        staff_incharge: data.staff_incharge,
        class_incharge: data.class_incharge,
        placement_head: data.placement_head,
        batch: data.batch,
        image: imageUrl
      },
    });
    return res.status(201).json({ message: "Profile created successfully", data: profiledetails });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

app.get("/getprofile/:user_id", async (req, res) => {
  const { user_id } = req.params;


  try {
    const profileData = await prisma.profile.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });

    if (!profileData) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ message: "Data retrieved successfully", data: profileData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/participation", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  const data = req.body;
  
  try {
    if (!data.user_id || !data.competition_name || !data.college || !data.date) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const imageUrls = req.files['image']
      ? req.files['image'].map(file => file.path).join(', ')
      : '';

    const pdfUrl = req.files['pdf'] && req.files['pdf'][0] ? req.files['pdf'][0].path : null;

    const profileData = await prisma.profile.findUnique({
      where:{
        user_id: parseInt(data.user_id),
        }
    })

    if (profileData){
      console.log(profileData)

      const participation = await prisma.participation.create({
        data: {
          user_id: parseInt(data.user_id),
          competition_name: data.competition_name,
          college: data.college,
          date: data.date,
          certificates: imageUrls,
          report: pdfUrl,
          year: profileData.year,
        },
      });
      return res.status(201).json({ message: "Participation details successfully stored", data: participation });
    } else{
      return res.status(400).json({message:"Profile data not found"});
    }
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.get("/getparticipation/:user_id",async (req,res)=>{
  const {user_id} = req.params;
  console.log(user_id);

  try{
    const participationdata = await prisma.participation.findMany({
      where:{
        user_id : parseInt(user_id)
      }
    });
    return res.status(200).json({message:"Data retrieved successfully",data:participationdata});
  }catch(error){
    return res.status(500).json({message:error});
  }
  
});


app.listen(3005, () => {
  console.log("Server is running on port 3005");
});

