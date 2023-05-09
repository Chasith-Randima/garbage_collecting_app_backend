const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const garbageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Garbage spot must have a name...Please tell us the name...",
      ],
    },
    location: {
      type: String,
      required: [
        true,
        "Garbage spot must have a Location ...Please tell us the location...",
      ],
    },
    coordinates: String,
    images: [String],

    // locationCoordinates: {
    //   type: {
    //     type: String,
    //     default: "Point",
    //     enum: ["Point"],
    //   },
    //   coordinates: [Number],
    //   description: String,
    // },

    // hospitals: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Hospital",
    //     // required: [true, "Appointment must belong to a hospital"],
    //   },
    // ],
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

// garbageSchema.pre("save", function (next) {
//   this.locationCoordinates["description"] = this.name;
//   next();
// });

const Garbage = mongoose.model("Garbage", garbageSchema);
module.exports = Garbage;
