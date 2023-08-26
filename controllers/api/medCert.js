const router = require('express').Router();
const { Doctor, Patient, MedicalCertificate } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const medCertData = await MedicalCertificate.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Patient }, { model: Doctor }],
    });

    res.status(200).json(medCertData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create medical certificate
router.post('/', withAuth, async (req, res) => {
  try {
    const certificateData = await MedicalCertificate.create(req.body);

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
