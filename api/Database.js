import mongoose from "mongoose";

const Database = async ()=>{
     try {
        await mongoose.connect(process.env.MongoDb_URI)
        .then(()=> console.log("the database connected successfully"))
     } catch (error) {
        console.log("there is and error in connecting the database "+error);
     }

}

export default Database;