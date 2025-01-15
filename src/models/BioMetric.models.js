import mongoose, { Schema } from 'mongoose'

const bioMetricSchema = new mongoose.Schema({
    user:{
            type: Schema.Types.ObjectId,
            ref: "User"
    },
    bioMetricStatus: [
        {
            palm:{
                type: Boolean,
                default: false,
            },
            eye:{
                type: Boolean,
                default: false,
            },
            finger:{
                type: Boolean,
                default: false,
            },
            face:{
                type: Boolean,
                default: false,
            },
            voice:{
                type: Boolean,
                default: false,
            }
            
        }
    ],
    deletedAt: { type: Date, default: null }, // This will mark the document as "deleted" (soft delete)
    },{
    timestamps: true,
})

export const BioMetric = mongoose.model("BioMetric", bioMetricSchema)