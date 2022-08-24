const { cloudinary } = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storageNavigation = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "FitWell/Profile",
  },
});

const maxSize = 5 * 1024 * 1024; // 5MB

const filter = function (req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "application/octet-stream"
  ) {
    {{}}
    cb(null, true);
  } else {
    cb(null, false);
    return cb(
      new Error("Only .png, .jpg, and .jpeg formats are allowed.")
    );
  }
};

const upload = multer({
  storage: storageNavigation,
  fileFilter: filter,
  limits: { fileSize: maxSize },
});

module.exports = upload;
