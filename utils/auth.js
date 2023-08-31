const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    if (req.path === '/profile') {
      if (req.session.is_doctor) {
        res.redirect('/doctor-login');
      } else {
        res.redirect('/patient-login');
      }
    } else {
      res.redirect('/');
    }
  } else {
    next();
  }
};

module.exports = withAuth;
