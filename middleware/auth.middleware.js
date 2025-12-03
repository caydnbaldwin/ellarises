function authMiddleware(req, res, next) {
  const publicPaths = ['/', '/persons/signup', '/persons/login', '/donations/donate'];
  console.log(`${req.method} ${req.url}`);
  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (req.session?.isLoggedIn) {
    return next();
  }
  return res.render('index', {error_message: 'Please log in to access this page'});
};

module.exports = {authMiddleware};