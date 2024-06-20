const multer = require("multer");
const path = require("path");

// Define storage for the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // directory to store the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Define file filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file type");
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

// Initialize multer with the defined storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
});

module.exports = upload;
