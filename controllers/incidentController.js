const Incident = require("../models/incidentModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image,Please upload only an Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadIncidentImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizeIncidentImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();
  console.log(req.body);
  //   if (req.body.locationCoordinates) {
  //     console.log(
  //       req.body,
  //       JSON.stringify(req.body.locationCoordinates),
  //       req.body.locationCoordinates,

  //       "------------------------------------------------------------"
  //     );
  //   }

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `incident-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/incidents/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.getImage = catchAsync(async (req, res) => {
  let fileName = req.params.imageName;
  // console.log(path.join(__dirname, "../public/img/phones"));
  let options = {
    root: path.join(__dirname, "../public/img/incidents"),
    // path: `public/img/phones/${req.params.name}`,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      // next(err)
      // console.log(err);
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.createOneIncident = factory.createOne(Incident);
exports.getOneIncident = factory.getOne(Incident);
exports.getAllIncidents = factory.getAll(Incident);
exports.updateOneIncident = factory.updateOne(Incident);
exports.deleteOneIncident = factory.deleteOne(Incident);
