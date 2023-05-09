const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "User must have a name...Please tell us your name..."],
    },
    coverImage: {
      type: String,
    },
    images: [String],
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    coordinates: String,
    // locationCoordinates: {
    //   type: {
    //     type: String,
    //     default: "Point",
    //     enum: ["Point"],
    //   },
    //   coordinates: String,
    //   description: String,
    //   flag: {
    //     type: String,
    //     enum: ["none", "red", "yellow", "blue"],
    //     default: "none",
    //   },
    // },
    images: [String],
    checked: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    flag: {
      type: String,
      enum: ["none", "red", "yellow", "blue"],
      default: "none",
    },
    closed: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
    // tickets: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Ticket",
    //     // required: [true, "A Ticket must have a pharmacist"],
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// incidentSchema.pre("save", function (next) {
//   this.locationCoordinates["description"] = this.title;
//   next();
// });

const Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident;
