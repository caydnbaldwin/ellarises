function authMiddleware(req, res, next) {
  const publicPaths = ['/'];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (req.session?.isLoggedIn) {
    return next();
  }

  return res.render('index', {error_message: 'Please log in to access this page'});
};

module.exports = {authMiddleware};