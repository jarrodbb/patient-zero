const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    let isDoc = req.query.doc;
    if (req.path === '/profile') {
      if (isDoc) {
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
