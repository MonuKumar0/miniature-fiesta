export default function errorHandler(err, req, res, next) {
  if (!err) {
    return res.sendStatus(500);
  }
  const error = {
    message: err.message || 'Internal Server Error.',
  };
  res.status(err.status || 500).json(error);
}
