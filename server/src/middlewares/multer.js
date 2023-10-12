const multer = require('multer');
const path = require('path');

const storage = (name) =>
  multer.diskStorage({
    destination: `./uploads/${name}/`,
    filename: (_, file, cb) => {
      cb(
        null,
        `${Date.now()}${Math.ceil(
          Math.random() * 1234567899876549
        )}${path.extname(file.originalname)}`
      );
    },
  });

const upload = (name) =>
  multer({
    storage: storage(name),
    fileFilter: (_, file, cb) => {
      if (
        file.mimetype.startsWith('image/') ||
        file.mimetype.startsWith('video/')
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('only image or video format allowed.'));
      }
    },
  });

module.exports = upload;
