const path = require('path');
const jimp = require('jimp');
const vibrant = require('node-vibrant');
const fs = require('fs');
const multer = require('multer');


const imageDirectory = path.join(__dirname,'..','..','ImageSource');
const storage =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,imageDirectory);
    },
    filename: (req,file,cb)=>{
     const filePath = path.join(imageDirectory,file.originalname);
     fs.access(filePath,fs.constants.F_OK, (err)=>{
        if(!err){
            const error = new Error('Duplicate file. Please upload a different file.');
            error.code = 'DUPLICATE_FILE';
            return cb(error);
        }
        cb(null,file.originalname);
     });

        
    }
});

const upload = multer({storage});

module.exports.uploadFile = (req,res)=>{

    upload.single('image')(req,res,(err)=>{
        try{
            if(err){
                if(err.code ==='DUPLICATE_FILE'){
                    return res.status(200).json({message:err.message});
                }
                return res.status(500).json({error:'Error to upload an Image'});
            }
            return res.status(200).json({message:'Image Uploaded Successfully'});
        }
        catch(err){
            return res.status(500).json({error:'Internal server error.'});
        }
        
    });
    
}

module.exports.getAllImageData = async(req,res)=>{
    
    var ListObjects = new Array();


   async function readingImagesFromDirectory(){
    try{
        const files = await fs.promises.readdir(imageDirectory);
        const imageFiles = files.filter(file=>{
            const extname = path.extname(file).toLowerCase();
            return ['.jpg','.jpeg','.png','.gif','.bmp'].includes(extname);
        });
        if(imageFiles.length===0){
           return res.status(400).json({error:'No image files found in specified directory'});
        }

        for(const imageFile of imageFiles){
            const imgPath = path.join(imageDirectory,imageFile);
            var dominateColor = await getImageDominantColor(imgPath);
            const ExtractImageName = imageFile.slice(0,imageFile.indexOf('.'));
            dominateColor = { dominantColor : dominateColor, fileName:imageFile,imageName:ExtractImageName};
            const data = await getImageDimension_Extension(imgPath);
            const FinalObj = Object.assign({},data,dominateColor);
            ListObjects.push(FinalObj);
        }
        return res.status(200).json(ListObjects);
    }
    catch(err){
        console.error('Error Reading directory',err);
        return res.status(500).json({error:'Internal server error.'});
    }
   }
    

   async function getImageDimension_Extension(imagePath){
        try{
            const image = await jimp.read(imagePath);

            const img = fs.readFileSync(imagePath);
            const sizeInBytes = Buffer.byteLength(img);

            var sizeString='';
            if(sizeInBytes < 1024){
                sizeString = sizeInBytes + 'bytes';
            }
            else if(sizeInBytes < 1024*1024){
                sizeString = (sizeInBytes/1024).toFixed(2) + 'KB';
            }
            else {
                sizeString = (sizeInBytes/1024 * 12024).toFixed(2) + 'MB';
            }

            const metadata = {
                dimension : image.getWidth() + "(W) x " + image.getHeight()+"(H)",
                extension:image.getExtension(),
                size : sizeString
            };
            return metadata;
        }
        catch(err){
          console.error('Error in processing image',err);
            return null;
        }

    }

    async function getImageDominantColor(imagePath){
        try{
            const palette = await vibrant.from(imagePath).getPalette();
            const dominantColor = palette.Vibrant?.getHex() || palette.Vibrant?.hex || null;
            return dominantColor;

        }
        catch(err){
            console.error('Error in Processing image Vibrant Color - ',err);
            return null;
        }
    }



    readingImagesFromDirectory();
    
}

module.exports.getOnlyImage = (req,res)=>{
   try{
        const imageFileName = req.params.imageName;
        const imagePath = path.join(imageDirectory,imageFileName);
        return res.sendFile(imagePath);
        
   }
   catch(err){
    return res.status(500).json({error:'error in reading the image from directory'});
   }
}


module.exports.deleteFile = async(req,res)=>{

    try{
        const imageFileName = req.params.imageFile;
      const imagePath = path.join(imageDirectory,imageFileName);
      await fs.promises.unlink(imagePath);
      return res.status(200).json({message:'Image file has been deleted successfully.'});

    }
    catch(err){
       return res.status(500).json({error:`No matching image found in the directory`});
    }
    
}


module.exports.deleteAllimageFiles = async(req,res)=>{

    async function deleteImagesFrom_driectory(){
        try{
            const files = await fs.promises.readdir(imageDirectory);
            const imageFiles = files.filter(file=>{
                const extname = path.extname(file).toLowerCase();
                return ['.jpg','.jpeg','.png','.gif','.bmp'].includes(extname);
            });
            if(imageFiles.length===0){
               return res.status(400).json({error:'No image files found in specified directory'});
            }
            await deleteImages(imageFiles);
           return res.status(200).json({message:'All image files has been deleted successfully'});
    
    
        }
        catch(err){
          return res.status(500).json({error:'An error occurred while deleting image files'});
        }
    }


    async function deleteImages(files){
        return Promise.all(files.map((file)=>{
            return new Promise((resolve,reject)=>{
                fs.unlink(path.join(imageDirectory,file),(err)=>{ if(err){reject(err);} else{ resolve();}});
            });
        }));
    }

    deleteImagesFrom_driectory();

}








    
    

    

    

