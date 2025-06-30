// Updated eventSchema with array-based eventAgenda
import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    meetingLink: { type: String },

    startDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endDate: { type: Date, required: true },
    endTime: { type: String, required: true },

    location: {
      type: String,
      enum: ["online", "in-person", "hybrid"],
      required: true,
    },

    rsvpDeadline: { type: Date },
    price: { type: Number },
    priceCategory: { type: String },
    tags: { type: [String] },
    image: { type: String },

    requirement: { type: String },
    eventAgenda: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      }
    ],

    speaker: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    attendees: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      validate: {
        validator: function (val) {
          return val.length <= this.maxAttendees;
        },
        message: (props) =>
          `Cannot exceed maxAttendees (${props.value.length}/${props.instance.maxAttendees})`,
      },
    },

    maxAttendees: {
      type: Number,
      required: true,
      min: 1,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eventSchema);