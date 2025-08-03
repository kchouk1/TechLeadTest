class ErrorHandler {
  static handle(error, req, res, next) {
    console.error(`Error: ${error.message}`, {
      stack: error.stack,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }

    if (error.message.includes("Invalid") || error.message.includes("required")) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }

  static asyncWrapper(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

module.exports = ErrorHandler;
