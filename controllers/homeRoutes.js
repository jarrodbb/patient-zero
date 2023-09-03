const router = require('express').Router();

//Import Models
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
          model: MedicalCertificate,
          attributes: ['certificate_id', 'reason'],
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

// Router to render doctor as well as passing patients array as data to that view (doctor seeing patient)
// withAuth middleware used to check if user is logged in (in this case doctors)
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

// Router to render updated patients
// spreads ... the properties of the patient object into the rednering context
// includes a logged in property to render whether user is logged in or not
router.get('/updatePatient', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.session.user_id, {});

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

//Router to render patient based on id and medCert
router.get('/:id', withAuth, async (req, res) => {
  try {
    const medCertData = await MedicalCertificate.findByPk(req.params.id, {
      include: [{ model: Patient }],
    });

    const certs = medCertData.get({ plain: true });

    console.log(certs);

    res.render('patientAndDoctorMedCerts', {
      ...certs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//Router to render medical certificate with patient by id
router.get('/patient-certificate', withAuth, async (req, res) => {
  try {
    const medCerts = await MedicalCertificate.findAll({
      where: { patient_id: req.session.user_id },
      include: [{ model: Patient }],
    });

    const medicalCertificates = medCerts.map((certificate) =>
      certificate.get({ plain: true })
    );

    console.log(medicalCertificates);

    res.render('certificate', {
      ...medicalCertificates,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json(err);
  }
});

module.exports = router;
