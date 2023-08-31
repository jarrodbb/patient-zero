const router = require('express').Router();
const { Doctor, Patient } = require('../../models');

// const withAuth = require('../../utils/auth');

// // Get all doctors and patients
// router.get('/', async (req, res) => {
//   try {
//     const doctorData = await Doctor.findAll({
//       attributes: { exclude: ['password'] },
//       include: [{ model: Patient }],
//     });

//     res.status(200).json(doctorData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Create user - Not sure we are going to bother with this
// router.post('/', async (req, res) => {
//   try {
//     const doctorData = await Doctor.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = doctorData.id;
//       req.session.logged_in = true;

//       res.status(200).json(doctorData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



// Doctor login - checks password
router.post('/login', async (req, res) => {
  try {
    const doctorData = await Doctor.findOne({
      where: { email: req.body.email },
    });

    if (!doctorData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await doctorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // console.log(doctorData.id);
    req.session.save(() => {
      req.session.user_id = doctorData.doctor_id;
      console.log(req.session.user_id);
      req.session.is_doctor = true;
      req.session.logged_in = true;
      console.log(req.session.is_doctor)

      res.json({ user: doctorData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post request - approve doctors note

// Get all doctors with their associated patients
router.get('/', (req, res) => {
  Doctor.findAll({
    attributes: ['doctor_id', 'name', 'email'],
    include: [
      {
        model: Patient,
        attributes: [
          'patient_id',
          'name',
          'email',
          'requires_certificate',
          'allergies',
          'diabetes',
          'heart_disease',
          'high_blood_pressure',
          'kidney_or_liver_disease',
          'medication_list',
        ],
      },
    ],
  })
    .then((doctorData) => res.json(doctorData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Doctor.findByPk(req.params.id, {
    attributes: ['doctor_id', 'name', 'email'],
    include: [
      {
        model: Patient,
        attributes: [
          'patient_id',
          'name',
          'email',
          'requires_certificate',
          'allergies',
          'diabetes',
          'heart_disease',
          'high_blood_pressure',
          'kidney_or_liver_disease',
          'medication_list',
        ],
      },
    ],
  })
    .then((doctorData) => {
      if (!doctorData) {
        res.status(404).json({ message: 'Doctor not found' });
        return;
      }
      res.json(doctorData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
