const router = require('express').Router();
// const { Doctor, Patient, MedicalCertificate } = require('../../models');

const withAuth = require('../../utils/auth');

// Create medical certificate
router.post('/', withAuth, async (req, res) => {
  try {
    const certificateData = await MedCert.create(red.body);

    req.session.save(() => {
      req.session.user_id = certificateData.id;
      req.session.logged_in = true;

      res.status(200).json(certificateData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
