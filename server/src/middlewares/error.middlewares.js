export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error("[Global Error]:", err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
