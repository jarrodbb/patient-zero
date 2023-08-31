const router = require('express').Router();
const { Doctor, Patient, MedicalCertificate } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage', {
    //not sure if req.session needs to be here
    // Th
    logged_in: req.session.logged_in,
  });
});

router.get('/doctor-login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('doctorLogin');
});

router.get('/patient-login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('patientLogin');
});

router.get('/profile', withAuth, async (req, res) => {
  console.log(req.session.is_doctor);
  console.log(req.session.user_id);

  if (!req.session.is_doctor) {
    try {
      const patientData = await Patient.findByPk(req.session.user_id, {
        include: [{ model: MedicalCertificate }],
      });

      const patient = patientData.get({ plain: true });

      res.render('patientProfile', {
        ...patient,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
    return;
  }

  try {
    const doctorData = await Doctor.findByPk(req.session.user_id, {
      include: [
        {
          model: Patient,
          attributes: ['patient_id', 'name'],
        },
      ],
    });

    const doctor = doctorData.get({ plain: true });

    res.render('doctor', {
      ...doctor,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/patients', withAuth, async (req, res) => {
  try {
    patientData = await Patient.findAll({
      where: { requires_certificate: true },
    });

    const patients = patientData.map((patient) => patient.get({ plain: true }));

    res.render('doctor', { patients });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/patient-profile', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.session.user_id, {
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
