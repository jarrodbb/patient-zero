const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    if (req.path === '/profile') {
      res.redirect('/login');
    } else {
      res.redirect('/');
    }
  } else {
    next();
  }
};

module.exports = withAuth;
