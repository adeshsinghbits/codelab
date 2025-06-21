import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { generateJWTToken_username } from "../utils/generateJWTToken.js";
import { uploadOnCloudinary } from "../config/connectCloudinary.js";
import { sendMail } from "../utils/SendMail.js";

export const saveUser = asyncHandler(async (req, res) => {
  console.log("******** Inside saveRegRegisteredUser Function *******");

  const { name, username,email, about,  location, skills, linkedinLink, githubLink, portfolioLink, twitterLink, facebookLink, instagramLink, skillsProficientAt, skillsToLearn,  picture } =
    req.body;

  console.log("Body: ", req.body);

  if (!name || !username || !email) {
    throw new ApiError(400, "Please provide all the details");
  }

  if (username.length < 3) {
    throw new ApiError(400, "Username should be atleast 3 characters long");
  }

  if (githubLink === "" && linkedinLink === "" && portfolioLink === "") {
    throw new ApiError(400, "Please provide atleast one link");
  }

  const githubRegex = /^(?:http(?:s)?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+(?:\/)?$/;
  const linkedinRegex = /^(?:http(?:s)?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+(?:\/)?$/;
  if ((linkedinLink && !linkedinLink.match(linkedinRegex)) || (githubLink && !githubLink.match(githubRegex)) ) {
    throw new ApiError(400, "Please provide valid github and linkedin links");
  }

  const user = await User.findOneAndUpdate(
    { username: req.user.username },
    {
      name: name,
      username: username,
      email: email,
      about: about,
      location: location,
      skills: skills,
      linkedinLink: linkedinLink,
      githubLink: githubLink,
      portfolioLink: portfolioLink,
      twitterLink: twitterLink,
      picture: picture,
    }
  );

  if (!user) {
    throw new ApiError(500, "Error in saving user details");
  }

  return res.status(200).json(new ApiResponse(200, user, "User details saved successfully"));
});

export const uploadPic = asyncHandler(async (req, res) => {
  const LocalPath = req.files?.picture[0]?.path;
  console.log("LocalPath: ", LocalPath);

  if (!LocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const picture = await uploadOnCloudinary(LocalPath);
  if (!picture) {
    throw new ApiError(500, "Error uploading picture");
  }

  res.status(200).json(new ApiResponse(200, { url: picture.url }, "Picture uploaded successfully"));
});

export const sendScheduleMeet = asyncHandler(async (req, res) => {
  console.log("******** Inside sendScheduleMeet Function *******");

  const { date, time, username } = req.body;
  if (!date || !time || !username) {
    throw new ApiError(400, "Please provide all the details");
  }

  const user = await User.findOne({ username: username });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const to = user.email;
  const subject = "Request for Scheduling a meeting";
  const message = `${req.user.name} has requested for a meet at ${time} time on ${date} date. Please respond to the request.`;

  await sendMail(to, subject, message);

  return res.status(200).json(new ApiResponse(200, null, "Email sent successfully"));
});
