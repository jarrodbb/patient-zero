const router = require('express').Router();
const { Doctor, Patient, MedicalCertificate } = require('../models');

const withAuth = require('../utils/auth');



// Get doctors profile with Auth
router.get('/doctor_profile', withAuth, async (req, res) => {
  try {
    //Find doctor by session ID
    // includes any patient that has requested a specific doctor to apporve the request
    // Need to add - Include patients where doctor preference is not set
    const doctorData = await Doctor.findByPK(req.session.user_id, {
      include: [
        {
          model: Patient,
          attributes: ['name'],
        },
      ],
    });

    const doctor = doctorData.get({ plain: true });

    req.render('doctor', {
      ...doctor,

      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/patients', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findAll({
      where: { requires_certificate: true },
    });

    const patients = patientData.map((patient) => patient.get({ plain: true }));

    res.render('doctor', { patients });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/patient_profile', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findByPK(req.session.user_id, {
      include: [
        {
          model: MedicalCertificate,
        },
      ],
    });
    const patient = patientData.get({ plain: true });

    req.render('patient', {
      ...patient,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
