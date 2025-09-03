const logRequest = (req, res, next) => {
    console.log('log reques to PATH:', req.path);
    next();
}

module.exports = logRequest;
