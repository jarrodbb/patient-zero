const withAuth = (req, res, next) => {
  if (!req.session.logged_in && req.path !== '/') {
    if (req.path === '/patient-profile') {
      res.redirect('/patient-login');
    } else if (req.path === '/doctor-profile') {
      res.redirect('/doctor-login');
    } else {
      res.redirect('/');
    }
  } else {
    next();
  }
};

module.exports = withAuth;
