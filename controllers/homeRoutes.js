const router = require('express').Router();
const { Doctor, Patient, MedicalCertificate } = require('../models');
const withAuth = require('../utils/auth');

//Router to render the homepage
router.get('/', (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

// Router to render the login page for Doctors.
// Session is checked if the user is logged in
// If logged in, the user will be sent to their respective profile page
router.get('/doctor-login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('doctorLogin');
});

// Router to render the login page for Patients.
// Session is checked if the user is logged in
// If logged in, the user will be sent to their respective profile page
router.get('/patient-login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('patientLogin');
});

// Router to render the profile page
// withAuth middleware used to check if user is logged in
// Session is checked if the user is a Doctor
// If a Doctor, the Doctor Model is checked and a Doctor's profile is rendered. session.user_id used to find by primary key
// If not a Doctor, the Patient Model is chceked and a Patient's profile is rendered.  session.user_id used to find by primary key
router.get('/profile', withAuth, async (req, res) => {
  console.log(req.session.is_doctor);
  console.log(req.session.user_id);

  if (!req.session.is_doctor) {
    try {
      const patientData = await Patient.findByPk(req.session.user_id, {
        include: [{ model: MedicalCertificate }],
      });

      const patient = patientData.get({ plain: true });
      console.log(patient);

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
    console.log(doctor);

    res.render('doctor', {
      ...doctor,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Router to
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

router.get('/updatePatient', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.session.user_id, {
      // include: [{ model: Doctor, attributes: ['name'] }],
    });

    const patient = patientData.get({ plain: true });

    console.log(patient);

    res.render('updatePatient', {
      ...patient,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.params.id, {
      include: [{ model: MedicalCertificate }],
    });

    const patient = patientData.get({ plain: true });

    console.log(patient);

    res.render('patientAndDoctorMedCerts', {
      ...patient,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/patient-certificate', withAuth, async (req, res) => {
  try {
    const medCerts = await MedicalCertificate.findAll({
      where: { patient_id: req.session.user_id },
      include: [{ model: Patient }],
    });

    const medicalCerificates = medCerts.map((certificate) =>
      certificate.get({ plain: true })
    );

    console.log(medicalCerificates);

    res.render('certificate', {
      ...medicalCerificates,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
});

// router.get('/patient-certificate', withAuth, async (req, res) => {
//   try {
//     const patientData = await Patient.findByPk(req.session.user_id, {
//       include: [{ model: MedicalCertificate }],
//     });

//     const patient = patientData.get({ plain: true });

//     console.log(patient);

//     res.render('certificate', {
//       ...patient,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     console.error(err);

//     res.status(500).json(err);
//   }
// });

// router.get('/patient-certificate', withAuth, async (req, res) => {
//   try {
//     const patientData = await Patient.findByPk(req.session.user_id, {
//       include: [{ model: MedicalCertificate }],
//     });

//     const patient = patientData.get({ plain: true });

//     console.log(patient);

//     res.render('certificate', {
//       ...patient,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
