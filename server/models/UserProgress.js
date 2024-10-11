import mongoose, { Schema } from "mongoose";


const UserProgessSchema = new Schema(
        {
            _id: ObjectId,
            userId: ObjectId,  
            problemId: ObjectId,  
            finished: {
                type: Boolean,
                default: false, 
            }
          }
)

const UserProgess = mongoose.models.UserProgess || mongoose.model("UserProgess", UserProgessSchema)
export default UserProgess