module.exports = (err, req, res, next) => {
    // Default error properties
    const statusCode = err.statusCode || 500; // Default to 500 for server errors
    const message = err.message || 'Internal Server Error';
  
    // In development, include stack trace for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error(err.stack); // Log detailed error in console
      return res.status(statusCode).json({
        success: false,
        message,
        stack: err.stack, // Stack trace only for dev purposes
      });
    }
  
    // In production, omit stack trace to avoid leaking sensitive details
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  