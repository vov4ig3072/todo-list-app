import { model, Schema, Types} from "mongoose";


const schema = new Schema({
    title: {type: String, required: true},
    complited: {type: Boolean, default: false},
    owner: {type: Types.ObjectId, ref: "User"}
})

export default model("Todo",schema)