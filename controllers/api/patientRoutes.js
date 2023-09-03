const router = require('express').Router();

//Import Models
const { Patient, Doctor } = require('../../models');
const withAuth = require('../../utils/auth');

// POST request for user registration
router.post('/', async (req, res) => {
  try {
    const patientData = await Patient.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = patientData.patient_id;
      req.session.logged_in = true;
      req.session.is_doctor = false;
      res.json(patientData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET request to Retrieve all patient records from the DB
router.get('/', async (req, res) => {
  try {
    const patientData = await Patient.findAll();

    res.status(200).json(patientData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get request for patients by ID with assigned doctor
router.get('/:id', async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.params.id, {
      include: [{ model: Doctor, attributes: ['name'] }],
    });
    if (!patientData) {
      res.status(404).json({ message: 'No patient found with this id!' });
      return;
    }

    res.status(200).json(patientData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Post request for patient login
router.post('/login', async (req, res) => {
  try {
    const patientData = await Patient.findOne({
      where: { email: req.body.email },
    });

    if (!patientData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await patientData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = patientData.patient_id;
      req.session.is_doctor = false;
      console.log(req.session.is_doctor);

      console.log(req.session.user_id);
      req.session.logged_in = true;

      res.json({ user: patientData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Put request to update patient info based on ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateStatus = await Patient.update(
      {
        date_of_birth: req.body.date_of_birth,
        requires_certificate: req.body.requires_certificate,
        allergies: req.body.allergies,
        diabetes: req.body.diabetes,
        heart_disease: req.body.heart_disease,
        high_blood_pressure: req.body.high_blood_pressure,
        kidney_or_liver_disease: req.body.kidney_or_liver_disease,
        medication_list: req.body.medication_list,
      },
      {
        where: {
          patient_id: req.params.id,
        },
      }
    );

    if (!updateStatus[0]) {
      res.status(404).json({ message: 'No Patient with this id' });
    }

    req.session.save(() => {
      req.session.user_id = updateStatus.id;
      req.session.logged_in = true;

      res.json({ message: 'updated!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Router to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Router to update by req.session.user_id
router.put('/', withAuth, async (req, res) => {
  console.log(req.session.user_id);
  try {
    const patientData = await Patient.update(
      {
        allergies: req.body.allergies,
        diabetes: req.body.diabetes,
        heart_disease: req.body.heart_disease,
        high_blood_pressure: req.body.high_blood_pressure,
        kidney_or_liver_disease: req.body.kidney_or_liver_disease,
        medication_list: req.body.medication_list,
      },
      {
        where: {
          patient_id: req.session.user_id,
        },
      }
    );
    if (!patientData[0]) {
      res.status(404).json({ message: 'No Patient with this id' });
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.json({ message: 'updated!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
