// eslint-disable-next-line
export const ErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(error.statusCode || 500).send(error.message || error.toString());
};
