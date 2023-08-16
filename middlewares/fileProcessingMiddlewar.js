const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fileProcessingMiddlewar = async (req, res, next) => {
  await upload.single("toolPicture")(req, res, (error) => {
    if (error) {
      console.error("Error uploading image:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the image" });
    }

     next();
   });
};

module.exports = {
  fileProcessingMiddlewar,
};
