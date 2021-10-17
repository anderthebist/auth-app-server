const fs = require("fs");
const uuid = require("uuid");
const path = require("path")

class FileService{
    saveFile(file){
        try{
            const fileName = uuid.v4()+'.png';
            const filePath = path.resolve('images',fileName);
            file.mv(filePath);
            return fileName;
        }catch(e){
            throw new Error(e);
        }
    }

    deleteFile(fileName){
        try{
            if(fileName){
                const filePath = path.resolve('images',fileName);
                fs.unlinkSync(filePath);
            }
        }catch(e){
            throw new Error(e);
        }
    }
}

module.exports = new FileService();