class ErroHandeler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleweare = (err, req, res, next) => {
  err.message = err.message || "Internal server Error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErroHandeler;
