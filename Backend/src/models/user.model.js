import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ",
    },
    about: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    skills: {
      type: Array,
      default: [],
    },
    linkedinLink: {
      type: String,
      default: "",
    },
    githubLink: {
      type: String,
      default: "",
    },
    portfolioLink: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
