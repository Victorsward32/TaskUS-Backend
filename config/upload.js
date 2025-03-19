import multer from "multer";

//Define storage fr upload files
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
})

// Define storage for Activity
const activityStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "activityUploads/"); // Store files in uploads folder
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+ file.originalname);
    }
});




// Filter file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

export const  upload = multer({ storage, fileFilter });
export const activityUploads = multer({ 
    storage: activityStorage,  // should be "storage: activityStorage"
    fileFilter 
});