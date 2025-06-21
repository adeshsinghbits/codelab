import moongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    tag: {
        type: [String],
    },
    attendees: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},  
{
    timestamps: true
}
);

export const Course = moongoose.model("Course", courseSchema);