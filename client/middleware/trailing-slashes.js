// ./middleware/trailing-slashes.js

const removeTrailingSlashes = (req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
};

exports.removeTrailingSlashes = removeTrailingSlashes;
