module.exports = {
  notFound: (req, res, next) => {
    const error = new Error(`not found - ${req.orignalUrl}`);
    res.status(404);
    next(error);
  },
  errorHandler: (error, _req, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if (error.name === 'CastError')
      res.status(404).send({ message: 'not found.' });
    res.status(statusCode).send({ message: error.message });
  },
};
