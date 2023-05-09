const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "User must have a name...Please tell us your name..."],
    },
    article: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // select: false,
    },
    images: [String],
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

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

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "users",
    // select: "-__v -passwordChangedAt",
  });

  next();
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
