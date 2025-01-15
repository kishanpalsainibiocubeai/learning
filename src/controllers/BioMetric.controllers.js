import { BioMetric } from "../models/BioMetric.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { Schema } from 'mongoose'

const enumBioMetrics = Object.freeze({
  eye: "eye",
  palm: "palm",
  finger: "finger",
  face: "face",
  voice: "voice",
});

const addBioMetric = asyncHandler(async (req, res) => {
  const { user, bioMetricStatus } = req.body;

  if (!user) {
    throw new ApiError(400, "user is required!");
  }


  const isRegistered = await BioMetric.findOne({ user: user });
  console.log("isRegistered :", user, isRegistered);

  if (isRegistered) {
    throw new ApiError(400, "user is already Registed!!");
  }

  // Register new biometric data
  const bioMetricRegistredUser = await BioMetric.create({
    user,
    bioMetricStatus,
  });

  const updatedUser = await BioMetric.findById(bioMetricRegistredUser._id);
  console.log(
    "bioMetricStatus :", bioMetricStatus, bioMetricRegistredUser
  );

  if (!updatedUser) {
    throw new ApiError(500, "Something went wrong!!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedUser, "BioMetric Added successfully"));
});

const updateBioMetric = asyncHandler(async (req,res) => {

    const {user, bioMetricStatus} = req.body;

    if(!user){
        throw new ApiError(400, "user is required!")
    }

    const registeredBioMetrics = await BioMetric.findById(user);

    if(!registeredBioMetrics){
        throw new ApiError(400, `please add biometrics from this ${user}!!`)
    }
    
  // console.log("updateBioMetric :", bioMetricStatus);
  console.log("registeredBioMetrics :", registeredBioMetrics);

  for (const key of Object.keys(bioMetricStatus[0])) {
    registeredBioMetrics.bioMetricStatus[0][key] = bioMetricStatus[0][key];
  }
  
  console.log("after update registeredBioMetrics :", registeredBioMetrics);
  // const updatedData =

        await BioMetric.updateOne(
            { _id: user, }, // Match the document and the specific array element
          //   { $set: { "items.$": item } }, // Update the matched element
            { $set:{bioMetricStatus:registeredBioMetrics.bioMetricStatus}}, // Update the matched element
            { upsert: true } // Insert if it doesn't exist
          );

    return res.status(200).json(
        new ApiResponse(200, registeredBioMetrics, "BioMetric Update successfully")
    )

})


const deleteBioMetric = asyncHandler(async (req,res) => {
  const {id} = req.body;

  const result = await BioMetric.updateOne(
    { _id: id, deletedAt: null }, // Only update if not already deleted
    { $set: { deletedAt: new Date() } } // Set the `deletedAt` field to the current date
  );


  if (result.modifiedCount <= 0) {
    throw new ApiError(400, "No record found or already deleted.")
  } 

  console.log("result deleteBioMetric :", result)
  
  return res.status(200).json(
    new ApiResponse(200, result, "Record soft-deleted successfully.")
)

})

const getAllBioMetricUsers = asyncHandler(async (req,res) => {


    const bioMetricData = await BioMetric.find({ deletedAt: null }); // Fetch all users
    
    if(!bioMetricData){
        throw new ApiError(500, "Something went wrong!! Failed to get bioMetricData")
    }

    res.status(200).json(  new ApiResponse(200, bioMetricData, "User fetch successfully")); // Respond with the users
})

export { addBioMetric, updateBioMetric, getAllBioMetricUsers, deleteBioMetric };
