const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch((e) => console.log(e));
};
