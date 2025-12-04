function authMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  const publicPaths = ['/', '/persons/signup', '/persons/login', '/donations/donate', '/eggs/teapot'];
  if (publicPaths.includes(req.path)) {
    return next();
  } else if (req.session?.isLoggedIn) {
    return next();
  }
  return res.render('index', {error_message: 'Please log in to access this page'});
};

module.exports = {authMiddleware};